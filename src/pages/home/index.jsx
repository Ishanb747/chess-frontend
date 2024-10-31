import React, { useState, useEffect } from 'react';
import { Copy } from "lucide-react";
import { useLocation, useNavigate } from 'react-router-dom';
import qs from 'query-string';

const ChessHome = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { id: inviteID } = qs.parse(location.search);
  
    const [side, setSide] = useState("white");
    const [name, setName] = useState("");
    const [gameID, setGameID] = useState("");
    const [showCopied, setShowCopied] = useState(false);

    useEffect(() => {
        setGameID(inviteID || Math.random().toString().replace('0.', ''));
    }, [inviteID]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate(`/game?id=${gameID}&name=${name}&side=${side}`); // Corrected here
    };

    const copyGameLink = async () => {
        const gameLink = `https://chess-game.com?id=${gameID}`; // Corrected here
        await navigator.clipboard.writeText(gameLink);
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-orange-300 flex items-center justify-center">
            <div className="w-96 bg-white/80 backdrop-blur-sm rounded-lg p-6">
                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 bg-slate-700 rounded-full flex items-center justify-center">
                        <div className="text-white text-2xl flex gap-1">
                            ♔♞♝
                        </div>
                    </div>

                    <h2 className="text-xl font-semibold text-slate-700">
                        Play Chess with your friends online
                    </h2>

                    <form onSubmit={handleSubmit} className="w-full space-y-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-medium">Display Name</label>
                            <input
                                id="name"
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your display name"
                                className="w-full px-3 py-2 border rounded-md"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Game ID</label>
                            <div className="flex gap-2">
                                <input
                                    value={gameID}
                                    readOnly
                                    className="w-full px-3 py-2 border rounded-md bg-gray-50"
                                />
                                <button
                                    type="button"
                                    onClick={copyGameLink}
                                    className="p-2 border rounded-md hover:bg-gray-50"
                                >
                                    <Copy className="h-4 w-4" />
                                </button>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            className="w-full py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-md"
                        >
                            Create Game
                        </button>
                    </form>

                    {showCopied && (
                        <div className="fixed bottom-4 right-4 p-4 bg-green-100 rounded-md shadow-lg">
                            Game link copied to clipboard!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChessHome;
