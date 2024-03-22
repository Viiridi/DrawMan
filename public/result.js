document.addEventListener('DOMContentLoaded', function() {
    // Retrieve drawing data for Player 1 from localStorage
    const drawingDataPlayer1 = JSON.parse(localStorage.getItem('drawingDataPlayer1'));

    // Retrieve drawing data for Player 2 from localStorage
    const drawingDataPlayer2 = JSON.parse(localStorage.getItem('drawingDataPlayer2'));

    // Retrieve drawing data for Player 3 from localStorage
    const drawingDataPlayer3 = JSON.parse(localStorage.getItem('drawingDataPlayer3'));

    // Get the canvas elements for Player 1's containers
    const headCanvasPlayer1 = document.getElementById('headCanvasPlayer1');
    const bodyCanvasPlayer1 = document.getElementById('bodyCanvasPlayer1');
    const legsCanvasPlayer1 = document.getElementById('legsCanvasPlayer1');

    // Get the canvas elements for Player 2's containers
    const headCanvasPlayer2 = document.getElementById('headCanvasPlayer2');
    const bodyCanvasPlayer2 = document.getElementById('bodyCanvasPlayer2');
    const legsCanvasPlayer2 = document.getElementById('legsCanvasPlayer2');

    // Get the canvas elements for Player 3's containers
    const headCanvasPlayer3 = document.getElementById('headCanvasPlayer3');
    const bodyCanvasPlayer3 = document.getElementById('bodyCanvasPlayer3');
    const legsCanvasPlayer3 = document.getElementById('legsCanvasPlayer3');

    // Load drawing data onto the canvases for Player 1
    loadCanvasImage(headCanvasPlayer1, drawingDataPlayer1.head);
    loadCanvasImage(bodyCanvasPlayer1, drawingDataPlayer1.body);
    loadCanvasImage(legsCanvasPlayer1, drawingDataPlayer1.legs);

    // Load drawing data onto the canvases for Player 2
    loadCanvasImage(headCanvasPlayer2, drawingDataPlayer2.head);
    loadCanvasImage(bodyCanvasPlayer2, drawingDataPlayer2.body);
    loadCanvasImage(legsCanvasPlayer2, drawingDataPlayer2.legs);

    // Load drawing data onto the canvases for Player 3
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
