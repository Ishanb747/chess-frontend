import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Cell, isLightSquare } from '../../functions/light-square';
import { GameContext } from '../../context/GameContext.jsx';
import Piece from '../piece/index';

const CellComponent = ({ cell, index, makeMove, setFromPos }) => {
  const light = isLightSquare(cell.pos, index);
  const { possibleMoves, turn, check } = useContext(GameContext);
  const isPossibleMove = possibleMoves.includes(cell.pos);

  const color = cell.piece && cell.piece.toUpperCase() === cell.piece ? 'w' : 'b';
  const isKingInCheck = () => {
    const isKing = cell.piece && cell.piece.toUpperCase() === 'K';
    const pieceColor = cell.piece && cell.piece.toUpperCase() === cell.piece ? 'w' : 'b';
    return isKing && pieceColor === turn && check;
  };

  const handleDrop = (e) => {
    e.preventDefault();
    makeMove(cell.pos);
  };

  const handleDragStart = () => {
    setFromPos(cell.pos);
  };

  return (
    <div
      className={`flex 
        justify-center 
        items-center 
        text-center 
        p-1 
        w-[calc(85vh/8)] 
        h-[calc(80vh/8)]
        relative
        ${light ? 'bg-[#ebe4db]' : 'bg-[#b6b3b3]'}
      `}
      onDrop={handleDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      {isPossibleMove && (
        <div className="w-5 h-5 bg-purple-500 rounded-full opacity-80 absolute" />
      )}
      {isKingInCheck() && (
        <div className="absolute inset-0 bg-red-200 animate-[pulse_2s_ease-in-out_infinite]" />
      )}
      <div className="relative z-10">
        <Piece pos={cell.pos} name={cell.piece} setFromPos={setFromPos} />
      </div>
    </div>
  );
};

CellComponent.propTypes = {
  cell: PropTypes.instanceOf(Cell).isRequired,
  index: PropTypes.number.isRequired,
  makeMove: PropTypes.func.isRequired,
  setFromPos: PropTypes.func.isRequired,
};

export default CellComponent;
