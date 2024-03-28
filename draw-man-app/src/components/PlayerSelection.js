import React from 'react';
import { Link } from 'react-router-dom';

function PlayerSelection() {
  return (
    <div>
      <h1>Select Your Player</h1>
      <ul>
        <li><Link to="/drawboard?player=1">Player 1</Link></li>
        <li><Link to="/drawboard?player=2">Player 2</Link></li>
        <li><Link to="/drawboard?player=3">Player 3</Link></li>
      </ul>
    </div>
  );
}

export default PlayerSelection;
