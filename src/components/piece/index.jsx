import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import whitePawnSvg from '../../assets/pieces/wP.svg';
import blackPawnSvg from '../../assets/pieces/bP.svg';
import whiteBishopSvg from '../../assets/pieces/wB.svg';
import blackBishopSvg from '../../assets/pieces/bB.svg';
import whiteKnightSvg from '../../assets/pieces/wN.svg';
import blackKnightSvg from '../../assets/pieces/bN.svg';
import whiteRookSvg from '../../assets/pieces/wR.svg';
import blackRookSvg from '../../assets/pieces/bR.svg';
import whiteQueenSvg from '../../assets/pieces/wQ.svg';
import blackQueenSvg from '../../assets/pieces/bQ.svg';
import whiteKingSvg from '../../assets/pieces/wK.svg';
import blackKingSvg from '../../assets/pieces/bK.svg';

const Piece = ({ name, pos, setFromPos }) => {
  const element = useRef(null);
  const [isScaled, setIsScaled] = useState(false); // State to manage click effect

  const color = name === name.toUpperCase() ? 'w' : 'b';
  const imageName = color + name.toUpperCase();
  let image;

  switch (imageName) {
    case 'wP':
      image = whitePawnSvg;
      break;
    case 'bP':
      image = blackPawnSvg;
      break;
    case 'wB':
      image = whiteBishopSvg;
      break;
    case 'bB':
      image = blackBishopSvg;
      break;
    case 'wN':
      image = whiteKnightSvg;
      break;
    case 'bN':
      image = blackKnightSvg;
      break;
    case 'wR':
      image = whiteRookSvg;
      break;
    case 'bR':
      image = blackRookSvg;
      break;
    case 'wQ':
      image = whiteQueenSvg;
      break;
    case 'bQ':
      image = blackQueenSvg;
      break;
    case 'wK':
      image = whiteKingSvg;
      break;
    case 'bK':
      image = blackKingSvg;
      break;
    default:
      image = null;
  }

  const handleDragStart = () => {
    setFromPos(pos);
    setTimeout(() => {
      if (element.current) {
        element.current.style.display = 'none';
      }
    }, 0);
  };

  const handleDragEnd = () => {
    if (element.current) {
      element.current.style.display = 'block';
    }
  };

  const handleClick = () => {
    setIsScaled(true);
    setTimeout(() => {
      setIsScaled(false);
    }, 200); // Duration of the scale effect
  };

  return (
    <img
      className={`piece transition-transform duration-200 ease-in-out transform ${isScaled ? 'scale-125' : 'hover:scale-110'}`} // Apply scaling classes
      src={image}
      alt=""
      draggable={true}
      ref={element}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onClick={handleClick} // Handle click to scale
    />
  );
};

Piece.propTypes = {
  name: PropTypes.string.isRequired,
  pos: PropTypes.string.isRequired,
  setFromPos: PropTypes.func.isRequired,
};

export default Piece;
