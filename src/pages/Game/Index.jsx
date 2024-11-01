import React, { useState, useRef, useEffect, useContext } from 'react';
import { Chess } from 'chess.js';
import { createBoard } from '../../functions/create-board';
import Board from '../../components/board/Index';
import { GameContext } from '../../context/GameContext';
import { types } from '../../context/actions';
import { getGameOverState } from '../../functions/game-over';
import GameOverOverlay from '../../components/GameOverOverlay';
import { io } from 'socket.io-client';
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

const FEN = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1';

const Game = () => {
  const [fen, setFen] = useState(FEN);
  const chess = useRef(new Chess(fen));
  const [board, setBoard] = useState(createBoard(fen));
  const [fromPos, setFromPos] = useState(null);
  const { dispatch } = useContext(GameContext);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState('');
  const socketRef = useRef();
  const location = useLocation();
  const history = useNavigate();
  const playerName = useRef();
  const gameID = useRef();
  const [isDragging, setIsDragging] = useState(false);
  const [isBlackPlayer, setIsBlackPlayer] = useState(false); // Track if the player is black
  const [isWhitePlayer, setIsWhitePlayer] = useState(true); // Track if the player is white

  const onDragStart = () => setIsDragging(true);
  const onDragEnd = () => setIsDragging(false);

  const handlePieceClick = (from) => {
    const piece = chess.current.get(from);
    if (piece && piece.color === chess.current.turn()) {
      setFromPos(from);
      showPossibleMoves(from);
    }
  };

  useEffect(() => {
    const { id, name } = qs.parse(location.search);
    playerName.current = name;
    gameID.current = id;
  }, [location.search]);

  useEffect(() => {
    socketRef.current = io('https://chess-backend-6uu6.onrender.com');

    socketRef.current.emit('join', { name: playerName.current, gameID: gameID.current }, ({ error, color }) => {
      if (error) {
        history.push('/');
      }
      setIsBlackPlayer(color === 'b'); // Set black player status
      setIsWhitePlayer(color === 'w'); // Set white player status
    });

    socketRef.current.on('welcome', ({ message, opponent }) => {
      console.log({ message, opponent });
    });

    socketRef.current.on('opponentJoin', ({ message, opponent }) => {
      console.log({ message, opponent });
    });

    socketRef.current.on('opponentMove', ({ from, to }) => {
      chess.current.move({ from, to });
      setFen(chess.current.fen());
    });

    socketRef.current.on('message', ({ message }) => {
      console.log({ message });
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, [history]);

  useEffect(() => setBoard(createBoard(fen)), [fen]);

  useEffect(() => {
    dispatch({
      type: types.SET_TURN,
      player: chess.current.turn(),
      check: chess.current.isCheck(),
    });

    const [isOver, result] = getGameOverState(chess.current);
    if (isOver) {
      setGameOver(true);
      setGameResult(result);
    }
  }, [fen, dispatch]);

  const showPossibleMoves = (from) => {
    const moves = chess.current.moves({ square: from, verbose: true });
    dispatch({ type: types.SET_POSSIBLE_MOVES, moves });
  };

  const isPromotion = (from, to) => {
    const moves = chess.current.moves({ square: from, verbose: true });
    const move = moves.find((m) => m.from === from && m.to === to);
    return move && move.flags.includes('p');
  };

  const makeMove = (to) => {
    if (fromPos) {
      const currentTurn = chess.current.turn(); // Get the current turn ('w' or 'b')
      const piece = chess.current.get(fromPos); // Get the piece at the starting position

      // Check if the piece belongs to the player making the move
      if (piece && piece.color === currentTurn && (isWhitePlayer && currentTurn === 'w' || !isWhitePlayer && currentTurn === 'b')) {
        try {
          let move;
          if (isPromotion(fromPos, to)) {
            move = chess.current.move({
              from: fromPos,
              to,
              promotion: 'q',
            });
          } else {
            move = chess.current.move({ from: fromPos, to });
          }

          if (move) {
            const newFEN = chess.current.fen();
            setFen(newFEN);
            socketRef.current.emit('move', { gameID: gameID.current, from: fromPos, to });
            setFromPos(null);
            dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
          }
        } catch (error) {
          console.error('Invalid move:', error);
          setFromPos(null);
          dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
        }
      } else {
        console.warn(`It's ${currentTurn === 'w' ? 'black' : 'white'} turn!`);
        setFromPos(null);
        dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
      }
    }
  };

  const handleNewGame = () => {
    chess.current.reset();
    setFen(FEN);
    setGameOver(false);
    setGameResult('');
    setFromPos(null);
    dispatch({ type: types.CLEAR_POSSIBLE_MOVES });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 flex items-center justify-center">
      <div className="game w-full flex flex-col items-center">
        <Board 
          cells={board} 
          makeMove={makeMove} 
          setFromPos={handlePieceClick} 
          isDragging={isDragging}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          isBlackPlayer={isBlackPlayer} // Pass black player status
        />
        {gameOver && (
          <GameOverOverlay
            result={gameResult}
            chess={chess.current}
            onNewGame={handleNewGame}
          />
        )}
      </div>
    </div>
  );
};

export default Game;
