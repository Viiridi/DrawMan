// drawboard.js
window.addEventListener('DOMContentLoaded', (event) => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playerCount = parseInt(urlParams.get('players')) || 1; // Default to 1 player if no parameter is provided

    const drawContainer = document.getElementById('drawContainer');
    const containerHeight = 800;
    const containerWidth = 600;
    const canvasWidth = containerWidth;
    const canvasHeight = containerHeight / playerCount; // Adjusting height based on player count

    const spacingHeight = 2 * (playerCount - 1); // Calculate the total height of spacing lines between draw canvases
    const borderHeight = 2 * playerCount; // Calculate the total height of borders around draw canvases
    const totalCanvasHeight = canvasHeight * playerCount + spacingHeight + borderHeight; // Total height of all draw canvases, spacing lines, and borders

    const canvases = [];
    for (let i = 0; i < playerCount; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '2px solid #000';
        canvas.style.display = 'block'; // Ensuring each canvas is on a new line
        drawContainer.appendChild(canvas);
        canvases.push(canvas);

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; // Fill canvas with white color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        initDraw(canvas);
    }

    const overlayCanvas = document.getElementById('overlayCanvas');
    overlayCanvas.width = canvasWidth;
    overlayCanvas.height = totalCanvasHeight; // Set overlay canvas height to match total draw canvas height
    const overlayCtx = overlayCanvas.getContext('2d');
    const blockSize = (canvasHeight + 2) * playerCount; // Adjust block size to include spacing and borders for all players
    let revealIndex = 0;

    const nextButton = document.getElementById('nextButton');
    nextButton.addEventListener('click', function() {
        overlayCtx.fillStyle = '#000'; // Set fill color to black
        const blockHeight = canvasHeight + 3; // Adjust block height to include spacing and borders
        overlayCtx.fillRect(0, revealIndex * blockHeight, overlayCanvas.width, blockHeight);
        
        revealIndex++;
        if (revealIndex === playerCount) {
            nextButton.textContent = 'Reveal';
        } else if (revealIndex > playerCount) {
            overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
            revealIndex = 0;
            nextButton.textContent = 'Next';
        }
    });
});

function initDraw(canvas) {
    let isDrawing = false;
    const ctx = canvas.getContext('2d');

    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    function startDrawing(e) {
        isDrawing = true;
        draw(e); // To start drawing from the initial point
    }

    function draw(e) {
        if (!isDrawing) return;

        const rect = canvas.getBoundingClientRect(); // Get canvas bounding rectangle
        const x = e.clientX - rect.left; // Calculate mouse position relative to canvas
        const y = e.clientY - rect.top;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }

    function stopDrawing() {
        isDrawing = false;
        ctx.beginPath(); // To prevent connecting subsequent lines
    }
}
