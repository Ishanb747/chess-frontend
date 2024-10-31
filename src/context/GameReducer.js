// GameReducer.js
import { types } from './actions';

const getPositions = (moves) => {
    // Extract the 'to' position from each move object
    return moves.map((move) => move.to);
};

const GameReducer = (state, action) => {
    switch (action.type) {
        case types.SET_POSSIBLE_MOVES:
            return {
                ...state,
                possibleMoves: getPositions(action.moves),
            };
        case types.CLEAR_POSSIBLE_MOVES:
            return {
                ...state,
                possibleMoves: [],
            };
        case types.SET_TURN:
            return {
                ...state,
                turn: action.player,
                check: action.check
            }
        case types.GAME_OVER:
            return {
                ...state,
                gameOver: true,
                status: action.status,
                turn: action.player,
            };
        
        default:
            return state;
    }
};

export default GameReducer;
