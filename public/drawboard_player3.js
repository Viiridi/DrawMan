document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');

    const prompt = document.getElementById('prompt');
    const nextButton = document.getElementById('nextButton');
    const sendButton = document.getElementById('sendButton');

    let currentStep = 0; // Current step in the drawing process
    const steps = ['head', 'body', 'legs']; // Steps in the drawing process

    let drawingDataPlayer3 = { head: '', body: '', legs: '' }; // Drawing data for Player 1

    // Function to start the next drawing step
    function nextStep() {
        // Get data URL of the canvas
        const dataURL = canvas.toDataURL('image/png');

        // Store the data URL in the corresponding player's drawing data
        if (currentStep === 0) {
            drawingDataPlayer3.head = dataURL; // Store head drawing for Player 1
        } else if (currentStep === 1) {
            drawingDataPlayer3.body = dataURL; // Store body drawing for Player 1
        } else if (currentStep === 2) {
            drawingDataPlayer3.legs = dataURL; // Store legs drawing for Player 1
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
        drawingDataPlayer3.legs = dataURL; // Store legs drawing for Player 1

        // Send drawing data to the results page for Player 1
        localStorage.setItem('drawingDataPlayer3', JSON.stringify(drawingDataPlayer3));
        
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
