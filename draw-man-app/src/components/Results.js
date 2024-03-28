import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

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

  const renderDrawings = () => {
    players.forEach(player => {
      const drawingData = JSON.parse(localStorage.getItem(`drawingDataPlayer${player}`)) || {};

      const playerName = playerNames.current[player - 1]; // Adjusted index to match array indexing

      const playerNameElement = document.getElementById(`player${player}Name`);
      if (playerNameElement) {
        playerNameElement.textContent = playerName;
      }

      const headCanvas = document.getElementById(`headCanvasPlayer${player}`);
      const bodyCanvas = document.getElementById(`bodyCanvasPlayer${player}`);
      const legsCanvas = document.getElementById(`legsCanvasPlayer${player}`);

      if (headCanvas && bodyCanvas && legsCanvas) {
        loadCanvasImage(headCanvas, drawingData.head);
        loadCanvasImage(bodyCanvas, drawingData.body);
        loadCanvasImage(legsCanvas, drawingData.legs);
      }
    });
  };

  const loadCanvasImage = (canvas, imageData) => {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imageData;
  };

  return (
    <div className="container">
      {players && players.map(player => (
        <div key={player} className="player-container">
          <h2 id={`player${player}Name`}></h2>
          <div className="canvas-container">
            <canvas id={`headCanvasPlayer${player}`} width="200" height="200"></canvas>
          </div>
          <div className="canvas-container">
            <canvas id={`bodyCanvasPlayer${player}`} width="200" height="200"></canvas>
          </div>
          <div className="canvas-container">
            <canvas id={`legsCanvasPlayer${player}`} width="200" height="200"></canvas>
          </div>
        </div>
      ))}
    </div>
  );
}

Results.propTypes = {
  players: PropTypes.array.isRequired,
};

export default Results;
