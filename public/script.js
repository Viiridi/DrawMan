document.addEventListener('DOMContentLoaded', function() {
    const playerForm = document.getElementById('playerForm');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        const playerNumber = parseInt(document.getElementById('playerNumber').value);
        window.location.href = `drawboard.html?player=${playerNumber}`;
    });
});
