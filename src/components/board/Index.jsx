import React from 'react';
import CellComponent from '../cell/Index';
import PropTypes from 'prop-types';

const Board = ({ cells, makeMove, setFromPos, isDragging, onDragStart, onDragEnd, isBlackPlayer }) => {
  return (
    <div className={`grid grid-cols-8 bg-[burlywood] p-4 w-[85vh] h-[85vh] mx-auto mt-8 rounded-lg shadow-md shadow-gray-200 ${
      isBlackPlayer ? 'transform rotate-180' : ''
    }`}>
      {cells.map((cell, index) => (
        <CellComponent
          cell={cell}
          index={index}
          key={cell.pos}
          makeMove={makeMove}
          setFromPos={setFromPos}
          isDragging={isDragging}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
        />
      ))}
    </div>
  );
};

Board.propTypes = {
  cells: PropTypes.array.isRequired,
  makeMove: PropTypes.func.isRequired,
  setFromPos: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragEnd: PropTypes.func.isRequired,
  isBlackPlayer: PropTypes.bool.isRequired, // Changed from playerColor
};

export default Board;
