import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import Background from './Background'; // Import the Background component
import './results.css'; // Import the CSS file

function Results({ players }) {
    const playerNames = useRef([]);

    useEffect(() => {
        if (!players) return;

        playerNames.current = players.map(player => {
            const drawingData = JSON.parse(localStorage.getItem(`drawingDataPlayer${player}`)) || {};
            return drawingData.name || `Player ${player}`;
        });

        renderDrawings();
    }, [players]);

    useEffect(() => {
        renderDrawings();
    }, []);

    const renderDrawings = () => {
        if (!players) return;

        players.forEach(player => {
            const drawingData = JSON.parse(localStorage.getItem(`drawingDataPlayer${player}`)) || {};

            // Get the index of the next player to mix up the canvases
            const nextPlayer = (player % players.length) + 1;

            const headCanvas = document.getElementById(`headCanvasPlayer${player}`);
            const bodyCanvas = document.getElementById(`bodyCanvasPlayer${nextPlayer}`);
            const legsCanvas = document.getElementById(`legsCanvasPlayer${(nextPlayer % players.length) + 1}`);

            if (headCanvas && bodyCanvas && legsCanvas) {
                loadCanvasImage(headCanvas, drawingData.head);
                loadCanvasImage(bodyCanvas, drawingData.body);
                loadCanvasImage(legsCanvas, drawingData.legs);

                // Display the player name for the current canvas arrangement
                const playerName = playerNames.current[nextPlayer - 1]; // Adjusted index to match array indexing
                const playerNameElement = document.getElementById(`player${player}Name`);
                if (playerNameElement) {
                    playerNameElement.textContent = playerName;
                }
            }
        });
    };

    const loadCanvasImage = (canvas, imageData) => {
        const ctx = canvas.getContext('2d');
        const img = new Image();
        img.onload = function () {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = imageData;
    };

    const handleGoBack = () => {
        // Navigate back to player selection page
        window.location.href = '/playerselection';
    };

    const handleStartOver = () => {
        // Clear the localStorage items for all players
        for (let i = 1; i <= 3; i++) {
            localStorage.removeItem(`drawingDataPlayer${i}`);
        }

        // Redirect to player selection page
        window.location.href = '/playerselection';
    };

    const handleSaveDrawing = (player) => {
      // Combine all the canvases for the player into one image
      const headCanvas = document.getElementById(`headCanvasPlayer${player}`);
      const bodyCanvas = document.getElementById(`bodyCanvasPlayer${player}`);
      const legsCanvas = document.getElementById(`legsCanvasPlayer${player}`);
  
      const combinedCanvas = document.createElement('canvas');
      combinedCanvas.width = headCanvas.width;
      combinedCanvas.height = headCanvas.height * 3;
  
      const ctx = combinedCanvas.getContext('2d');
      ctx.drawImage(headCanvas, 0, 0);
      ctx.drawImage(bodyCanvas, 0, headCanvas.height);
      ctx.drawImage(legsCanvas, 0, headCanvas.height * 2);
  
      // Retrieve the character's name from localStorage
      const nextPlayer = (player % players.length) + 1;
      const drawingData = JSON.parse(localStorage.getItem(`drawingDataPlayer${nextPlayer}`)) || {};
      const playerName = drawingData.name || `Player ${nextPlayer}`;
  
      // Save the image with the character's name
      const link = document.createElement('a');
      link.href = combinedCanvas.toDataURL('image/png');
      link.download = `${playerName}.png`;
      link.click();
  };
  
    return (
        <div>
            <div className="background-container">
                <Background />
            </div>
            <div className="container results-container">
                {players && players.map((player, index) => (
                    <div key={player} className={`player-container player-${index + 1}`}>
                        <h2 id={`player${player}Name`}></h2>
                        <div className="canvas-container">
                            <canvas id={`headCanvasPlayer${player}`} width="400" height="250"></canvas>
                        </div>
                        <div className="canvas-container">
                            <canvas id={`bodyCanvasPlayer${player}`} width="400" height="250"></canvas>
                        </div>
                        <div className="canvas-container">
                            <canvas id={`legsCanvasPlayer${player}`} width="400" height="250"></canvas>
                        </div>
                        <div className="button-container">
                            <button onClick={() => handleSaveDrawing(player)}>Save Drawing</button>
                        </div>
                    </div>
                ))}
                {/* Buttons for going back and starting over */}
                <div className="button-container">
                    <button onClick={handleGoBack}>Go Back to Player Selection</button>
                    <button onClick={handleStartOver}>Start Over</button>
                </div>
            </div>
        </div>
    );
}

Results.propTypes = {
    players: PropTypes.array.isRequired,
};

export default Results;
