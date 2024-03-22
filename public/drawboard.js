document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const prompt = document.getElementById('prompt');
    const nextButton = document.getElementById('nextButton');
    const sendButton = document.getElementById('sendButton');

    const urlParams = new URLSearchParams(window.location.search);
    const currentPlayer = parseInt(urlParams.get('player')); // Get the player number from the URL parameter

    let currentStep = 0; // Current step in the drawing process
    const steps = ['head', 'body', 'legs']; // Steps in the drawing process

    let drawingData = { head: '', body: '', legs: '' }; // Drawing data for the current player

    // Function to start the next drawing step
    function nextStep() {
        // Get data URL of the canvas
        const dataURL = canvas.toDataURL('image/png');

        // Store the data URL in the corresponding player's drawing data
        if (currentStep === 0) {
            drawingData.head = dataURL;
        } else if (currentStep === 1) {
            drawingData.body = dataURL;
        } else if (currentStep === 2) {
            drawingData.legs = dataURL;
        }

        // Clear the canvas
        clearCanvas();

        // Proceed to the next step if available
        if (currentStep < steps.length - 1) {
            currentStep++;
            // Update UI to reflect next step
            prompt.textContent = `Draw the ${steps[currentStep]}`;
        }

        // Check if it's the last step and update button visibility
        if (currentStep === steps.length - 1) {
            nextButton.style.display = 'none';
            sendButton.style.display = 'block';
        }
    }

    nextButton.addEventListener('click', nextStep);

    sendButton.addEventListener('click', function() {
        // Get data URL of the canvas for the last step
        const dataURL = canvas.toDataURL('image/png');

        // Store the data URL in the corresponding player's drawing data
        drawingData.legs = dataURL;

        // Send drawing data to the results page for the current player
        localStorage.setItem(`drawingDataPlayer${currentPlayer}`, JSON.stringify(drawingData));
        
        // Redirect to the results page
        window.location.href = 'result.html';
    });

    // Drawing functionality
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    }

    function draw(e) {
        if (!isDrawing) return;

        const x = e.offsetX;
        const y = e.offsetY;

        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 2;
        ctx.stroke();

        [lastX, lastY] = [x, y];
    }

    function stopDrawing() {
        isDrawing = false;
    }

    function clearCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
});