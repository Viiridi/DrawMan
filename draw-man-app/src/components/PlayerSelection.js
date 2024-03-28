import React from 'react';
import { Link } from 'react-router-dom';
import player1Image from '../images/player1.png'; // Import player 1 image
import player2Image from '../images/player2.png'; // Import player 2 image
import player3Image from '../images/player3.png'; // Import player 3 image
import player1HoverImage from '../images/player1_hover.png'; // Import player 1 hover image
import player2HoverImage from '../images/player2_hover.png'; // Import player 2 hover image
import player3HoverImage from '../images/player3_hover.png'; // Import player 3 hover image
import './PlayerSelection.css'; // Import the CSS file

function PlayerSelection() {
  return (
    <div className="player-selection-container">
      <h1 className="select-player-heading">Select Your Player</h1>
      <div className="player-buttons-container">
        <Link to="/drawboard?player=1" style={{ textDecoration: 'none' }}>
          <button 
            className="player-button"
            style={{ backgroundImage: `url(${player1Image})` }}
            onMouseEnter={(e) => { e.target.style.backgroundImage = `url(${player1HoverImage})` }}
            onMouseLeave={(e) => { e.target.style.backgroundImage = `url(${player1Image})` }}
          ></button>
        </Link>
        <Link to="/drawboard?player=2" style={{ textDecoration: 'none' }}>
          <button 
            className="player-button"
            style={{ backgroundImage: `url(${player2Image})` }}
            onMouseEnter={(e) => { e.target.style.backgroundImage = `url(${player2HoverImage})` }}
            onMouseLeave={(e) => { e.target.style.backgroundImage = `url(${player2Image})` }}
          ></button>
        </Link>
        <Link to="/drawboard?player=3" style={{ textDecoration: 'none' }}>
          <button 
            className="player-button"
            style={{ backgroundImage: `url(${player3Image})` }}
            onMouseEnter={(e) => { e.target.style.backgroundImage = `url(${player3HoverImage})` }}
            onMouseLeave={(e) => { e.target.style.backgroundImage = `url(${player3Image})` }}
          ></button>
        </Link>
      </div>
    </div>
  );
}

export default PlayerSelection;
