document.addEventListener('DOMContentLoaded', function() {
    // Retrieve drawing data for each player from localStorage
    const drawingDataPlayer1 = JSON.parse(localStorage.getItem('drawingDataPlayer1')) || {};
    const drawingDataPlayer2 = JSON.parse(localStorage.getItem('drawingDataPlayer2')) || {};
    const drawingDataPlayer3 = JSON.parse(localStorage.getItem('drawingDataPlayer3')) || {};

    // Get the canvas elements for each player's containers
    const headCanvasPlayer1 = document.getElementById('headCanvasPlayer1');
    const bodyCanvasPlayer1 = document.getElementById('bodyCanvasPlayer1');
    const legsCanvasPlayer1 = document.getElementById('legsCanvasPlayer1');

    const headCanvasPlayer2 = document.getElementById('headCanvasPlayer2');
    const bodyCanvasPlayer2 = document.getElementById('bodyCanvasPlayer2');
    const legsCanvasPlayer2 = document.getElementById('legsCanvasPlayer2');

    const headCanvasPlayer3 = document.getElementById('headCanvasPlayer3');
    const bodyCanvasPlayer3 = document.getElementById('bodyCanvasPlayer3');
    const legsCanvasPlayer3 = document.getElementById('legsCanvasPlayer3');

    // Display character's name for each player
    document.querySelector('.player-container:nth-child(1) h2').textContent = drawingDataPlayer1.name + "'s Drawings";
    document.querySelector('.player-container:nth-child(2) h2').textContent = drawingDataPlayer2.name + "'s Drawings";
    document.querySelector('.player-container:nth-child(3) h2').textContent = drawingDataPlayer3.name + "'s Drawings";

    // Load drawing data onto the canvases for each player
    loadCanvasImage(headCanvasPlayer1, drawingDataPlayer1.head);
    loadCanvasImage(bodyCanvasPlayer1, drawingDataPlayer1.body);
    loadCanvasImage(legsCanvasPlayer1, drawingDataPlayer1.legs);

    loadCanvasImage(headCanvasPlayer2, drawingDataPlayer2.head);
    loadCanvasImage(bodyCanvasPlayer2, drawingDataPlayer2.body);
    loadCanvasImage(legsCanvasPlayer2, drawingDataPlayer2.legs);

    loadCanvasImage(headCanvasPlayer3, drawingDataPlayer3.head);
    loadCanvasImage(bodyCanvasPlayer3, drawingDataPlayer3.body);
    loadCanvasImage(legsCanvasPlayer3, drawingDataPlayer3.legs);
});

function loadCanvasImage(canvas, imageData) {
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.onload = function() {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    };
    img.src = imageData;
}
