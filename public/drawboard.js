document.addEventListener('DOMContentLoaded', function() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const playerCount = parseInt(urlParams.get('players')) || 1; // Default to 1 player if no parameter is provided

    const drawContainer = document.getElementById('drawContainer');
    const containerWidth = 600;
    const containerHeight = 800; // Adjusted container height

    // Calculate canvas height dynamically based on the number of players
    const canvasHeight = containerHeight / playerCount;

    const canvases = [];
    for (let i = 0; i < playerCount; i++) {
        const canvas = document.createElement('canvas');
        canvas.width = containerWidth;
        canvas.height = canvasHeight;
        canvas.style.border = '2px solid #000';
        drawContainer.appendChild(canvas);
        canvases.push(canvas);

        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#fff'; // Fill canvas with white color
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        initDraw(canvas);
    }

    function initDraw(canvas) {
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

            const rect = canvas.getBoundingClientRect(); // Get canvas bounding rectangle
            const x = e.clientX - rect.left; // Calculate mouse position relative to canvas
            const y = e.clientY - rect.top;

            const ctx = canvas.getContext('2d');
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        }

        function stopDrawing() {
            isDrawing = false;
            const ctx = canvas.getContext('2d');
            ctx.beginPath(); // To prevent connecting subsequent lines
        }
    }

    // Function to send images over WebSocket
    function sendImages() {
        const imageDataURLs = [];
        canvases.forEach((canvas, index) => {
            imageDataURLs.push(canvas.toDataURL('image/png'));
        });

        // Send image data URLs over WebSocket
        ws.send(JSON.stringify(imageDataURLs));
        console.log('Drawing sent:', imageDataURLs);
    }

    // WebSocket connection
    const ws = new WebSocket('ws://localhost:3000');

    ws.onopen = function () {
        console.log('WebSocket connection established');
    };

    ws.onmessage = function (event) {
        console.log('Message received:', event.data);
        renderImages(JSON.parse(event.data));
    };

    ws.onerror = function (error) {
        console.error('WebSocket error:', error);
    };

    ws.onclose = function () {
        console.log('WebSocket connection closed');
    };

    // Function to render received images on canvases
    function renderImages(imageDataURLs) {
        imageDataURLs.forEach((imageDataURL, index) => {
            const canvas = canvases[index];
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.onload = function () {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height); // Draw the received image on the canvas
            };
            img.src = imageDataURL;
        });
    }

    // Event listener for send button
    const sendButton = document.createElement('button');
    sendButton.textContent = 'Send';
    sendButton.addEventListener('click', sendImages);
    document.body.appendChild(sendButton);
});
