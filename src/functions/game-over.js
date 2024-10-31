/**
 *
 * @param {*} chess An instance of the current Chess object
 * @returns {[boolean, string]}
 */
// game-over.js
export const getGameOverState = (chess) => {
    if (!chess.isGameOver()) {
        return [false, ''];
    }
    if (chess.isCheckmate()) {
        return [true, 'checkmate'];
    }
    if (chess.isStalemate()) {
        return [true, 'stalemate'];
    }
    if (chess.isThreefoldRepetition()) {
        return [true, 'threefold repetition'];
    }
    if (chess.isDraw()) {
        return [true, 'draw'];
    }
    return [false, ''];
};

export * from './game-over';