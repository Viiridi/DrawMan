import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function DrawBoard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [drawingData, setDrawingData] = useState({ head: '', body: '', legs: '', name: '' });
  const [isDrawing, setIsDrawing] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [player, setPlayer] = useState(null);

  const canvasRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const playerParam = searchParams.get('player');
    setPlayer(playerParam);
  }, [location]);

  const canvasWidth = 600; // Define canvas width
  const canvasHeight = 400; // Define canvas height

  const steps = ['head', 'body', 'legs', 'name'];

  const nextStep = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL('image/png');
    const bodyPart = steps[currentStep];

    setDrawingData(prevData => ({
      ...prevData,
      [bodyPart]: dataURL
    }));

    setCurrentStep(prevStep => prevStep + 1);
    clearCanvas();
  };

  const startDrawing = e => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  };

  const draw = e => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  const handleNameInputChange = e => {
    setCharacterName(e.target.value);
  };

  const handleSendButtonClick = () => {
    // Update the drawing data with the entered name
    const updatedDrawingData = {
      ...drawingData,
      name: characterName
    };

    // Log the updated drawing data
    console.log('Updated Drawing Data:', updatedDrawingData);

    // Save drawing data to local storage
    localStorage.setItem(`drawingDataPlayer${player}`, JSON.stringify(updatedDrawingData));

    // Redirect to results page
    window.location.href = '/results';
  };

  return (
    <div>
      {currentStep < 3 ? (
        <>
          <h2>Draw the {steps[currentStep]}</h2>
          <canvas
            ref={canvasRef}
            width={canvasWidth} // Set canvas width
            height={canvasHeight} // Set canvas height
            style={{ display: 'block', border: '1px solid #000' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
          ></canvas>
          <button onClick={nextStep}>Next</button>
        </>
      ) : (
        <div>
          <h2>Enter character's name:</h2>
          <input type="text" value={characterName} onChange={handleNameInputChange} />
          <button onClick={handleSendButtonClick}>Send</button>
        </div>
      )}
    </div>
  );
}

export default DrawBoard;
