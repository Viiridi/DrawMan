window.addEventListener('DOMContentLoaded', () => {
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

    const overlayCanvas = document.createElement('canvas');
    overlayCanvas.id = 'overlayCanvas';
    overlayCanvas.width = canvasWidth;
    overlayCanvas.height = totalCanvasHeight; // Set overlay canvas height to match total draw canvas height
    overlayCanvas.style.position = 'absolute'; // Position the overlay canvas absolutely
    overlayCanvas.style.top = '0'; // Align the overlay canvas to the top of the draw container
    overlayCanvas.style.left = '0'; // Align the overlay canvas to the left of the draw container
    overlayCanvas.style.pointerEvents = 'none'; // Disable pointer events to allow interaction with underlying canvases
    drawContainer.appendChild(overlayCanvas);
    
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    document.body.appendChild(nextButton);
    
    let revealIndex = 0;
    nextButton.addEventListener('click', function() {
        if (revealIndex < playerCount) {
            const overlayCtx = overlayCanvas.getContext('2d');
            overlayCtx.fillStyle = '#000'; // Set fill color to black
            const blockHeight = canvasHeight + 3; // Adjust block height to include spacing and borders
            overlayCtx.fillRect(0, revealIndex * blockHeight, overlayCanvas.width, blockHeight);
            revealIndex++;
        }
        
        if (revealIndex === playerCount) {
            nextButton.style.display = 'none'; // Hide the next button when all overlays are revealed
            const revealButton = document.createElement('button');
            revealButton.textContent = 'Reveal';
            revealButton.addEventListener('click', function() {
                const overlayCtx = overlayCanvas.getContext('2d');
                overlayCtx.clearRect(0, 0, overlayCanvas.width, overlayCanvas.height);
                nextButton.style.display = 'block'; // Restore visibility of the next button
                revealButton.remove(); // Remove the reveal button
                revealIndex = 0; // Reset revealIndex
            });
            document.body.appendChild(revealButton);
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
