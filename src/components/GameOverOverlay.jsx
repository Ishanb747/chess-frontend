import React from 'react';
import PropTypes from 'prop-types';

const GameOverOverlay = ({ result, chess, onNewGame }) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full mx-4 text-center transform transition-all">
        <div className="space-y-6">
          <h2 className="text-3xl font-bold text-gray-900">
            Game Over!
          </h2>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-4xl font-bold mb-2 text-gray-800">
              {result === 'checkmate' ? (
                <span>
                  {chess.turn() === 'w' ? 'Black' : 'White'} won
                </span>
              ) : (
                <span className="capitalize">
                  {result}
                </span>
              )}
            </p>
            <p className="text-gray-600">
              {result === 'checkmate' && "by checkmate"}
              {result === 'stalemate' && "The game is a draw by stalemate"}
              {result === 'threefold repetition' && "The game is a draw by repetition"}
              {result === 'draw' && "The game is a draw"}
            </p>
          </div>

          <button
            onClick={onNewGame}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors w-full"
          >
            New Game
          </button>
          
          <a 
            href="/" 
            className="text-gray-600 hover:text-gray-800 transition-colors inline-block"
          >
            Main page
          </a>
        </div>
      </div>
    </div>
  );
};

GameOverOverlay.propTypes = {
  result: PropTypes.string.isRequired,
  chess: PropTypes.object.isRequired,
  onNewGame: PropTypes.func.isRequired,
};

export default GameOverOverlay;