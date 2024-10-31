const GameProvider = ({ children }) => {
    const [state, dispatch] = useReducer(GameReducer, initialState);
    return (
        <GameContext.Provider value={{ ...state, dispatch }}>
            {children}
        </GameContext.Provider>
    );
};
export default GameProvider;
