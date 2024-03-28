import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PlayerSelection from './components/PlayerSelection';
import DrawBoard from './components/Drawboard';
import Results from './components/Results';

function App() {
  // Initialize players with IDs of three players
  const initialPlayers = [1, 2, 3];
  const [players, setPlayers] = useState(initialPlayers);

  console.log('Players:', players); // Logging to check the players state

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PlayerSelection />} />
        <Route path="/playerselection" element={<PlayerSelection />} />
        <Route path="/drawboard" element={<DrawBoard setPlayers={setPlayers} />} />
        {/* Pass the players array as a prop to the Results component */}
        <Route path="/results" element={<Results players={players} />} />
      </Routes>
    </Router>
  );
}

export default App;
