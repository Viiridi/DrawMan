document.addEventListener('DOMContentLoaded', function() {
    const playerForm = document.getElementById('playerForm');
    const startButton = document.getElementById('startButton');

    startButton.addEventListener('click', function(event) {
        event.preventDefault();
        const playerCount = parseInt(document.getElementById('playerCount').value);
        window.location.href = `drawboard.html?players=${playerCount}`;
    });
});
