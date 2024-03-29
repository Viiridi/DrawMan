import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Background from './Background'; // Import the Background component
import './Drawboard.css'; // Import the CSS file
import headGuide from '../images/head_guide.png'; // Import the head guide image
import bodyGuide from '../images/body_guide.png'; // Import the body guide image
import legsGuide from '../images/leg_guide.png'; // Import the legs guide image

function DrawBoard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [drawingData, setDrawingData] = useState({ head: '', body: '', legs: '', name: '' });
  const [isDrawing, setIsDrawing] = useState(false);
  const [characterName, setCharacterName] = useState('');
  const [player, setPlayer] = useState(null);
  const [currentColor, setCurrentColor] = useState('#000'); // Default color is black
  const [brushSize, setBrushSize] = useState(5); // Default brush size
  const canvasRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const playerParam = searchParams.get('player');
    setPlayer(playerParam);

    // Fill canvas with white when component mounts
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#ffffff'; // Set fill color to white
      ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw white rectangle covering the canvas
    }
  }, [location]);

  const steps = ['head', 'body', 'legs', 'name'];
  const instructions = ['Draw the head', 'Draw the body', 'Draw the legs', 'Enter character\'s name'];
  const guideImages = [headGuide, bodyGuide, legsGuide];

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
    e.preventDefault(); // Prevent default browser behavior
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const rect = canvas.getBoundingClientRect(); // Get the canvas boundaries
    const offsetX = e.clientX - rect.left; // Adjust X coordinate relative to canvas
    const offsetY = e.clientY - rect.top; // Adjust Y coordinate relative to canvas
  
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  };
  
  const draw = e => {
    e.preventDefault(); // Prevent default browser behavior
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
  
    const rect = canvas.getBoundingClientRect(); // Get the canvas boundaries
    const offsetX = e.clientX - rect.left; // Adjust X coordinate relative to canvas
    const offsetY = e.clientY - rect.top; // Adjust Y coordinate relative to canvas
  
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = currentColor;
    ctx.lineWidth = brushSize;
    ctx.lineTo(offsetX, offsetY); // Use adjusted coordinates
    ctx.stroke();
    ctx.beginPath(); // Start a new path for each segment of the line
    ctx.moveTo(offsetX, offsetY); // Move to the new starting point
  };
  


  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#ffffff'; // Set fill color to white
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Draw white rectangle covering the canvas
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

  const handleColorChange = (color) => {
    setCurrentColor(color);
  };

  const handleBrushSizeChange = (size) => {
    setBrushSize(size);
  };

  return (
    <div className="container">
      <div className="background-container">
        <Background />
      </div>
      <div className="content">
        {currentStep < 3 ? (
          <div>
            <h2>{instructions[currentStep]}</h2>
            <div style={{ display: 'flex', position: 'relative' }}>
            <canvas
            ref={canvasRef}
            width="600"
            height="400"
            style={{ border: '1px solid #000', marginRight: '20px', cursor: 'crosshair' }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            onDragStart={() => false} // Prevent default drag behavior
          ></canvas>
          {currentStep < 3 && (
              <img
                src={guideImages[currentStep]}
                alt={`Guide for ${steps[currentStep]}`}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  opacity: 0.25,
                  pointerEvents: 'none' // Ensure the image doesn't capture pointer events
                }}
              />
            )}
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '5px', marginBottom: '20px' }}>
                  <div style={{ backgroundColor: '#ff0000', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#ff0000')}></div>
                  <div style={{ backgroundColor: '#00ff00', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#00ff00')}></div>
                  <div style={{ backgroundColor: '#0000ff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#0000ff')}></div>
                  <div style={{ backgroundColor: '#ffff00', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#ffff00')}></div>
                  <div style={{ backgroundColor: '#ff00ff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#ff00ff')}></div>
                  <div style={{ backgroundColor: '#00ffff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#00ffff')}></div>
                  <div style={{ backgroundColor: '#000000', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#000000')}></div>
                  <div style={{ backgroundColor: '#ffffff', width: '50px', height: '50px', borderRadius: '50%', cursor: 'pointer' }} onClick={() => handleColorChange('#ffffff')}></div>
                </div>
                <input type="color" value={currentColor} onChange={(e) => handleColorChange(e.target.value)} style={{ marginBottom: '20px' }} /> {/* Color picker */}
                <div style={{ marginBottom: '20px' }}>
                  <button onClick={() => handleBrushSizeChange(5)} style={{ width: '30px', height: '30px', borderRadius: '50%', border: 'none', marginRight: '10px' }}>S</button>
                  <button onClick={() => handleBrushSizeChange(10)} style={{ width: '40px', height: '40px', borderRadius: '50%', border: 'none', marginRight: '10px' }}>M</button>
                  <button onClick={() => handleBrushSizeChange(15)} style={{ width: '50px', height: '50px', borderRadius: '50%', border: 'none', marginRight: '10px' }}>L</button>
                </div>
              </div>
            </div>
            <button onClick={nextStep}>Next</button>
          </div>
        ) : (
          <div>
            <h2>Enter character's name:</h2>
            <input type="text" value={characterName} onChange={handleNameInputChange} />
            <button onClick={handleSendButtonClick}>Send</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default DrawBoard;
