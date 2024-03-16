// script.js
document.getElementById('startButton').addEventListener('click', function(event) {
    event.preventDefault(); // Prevent default form submission behavior
    
    // Get selected number of players
    const playerCount = document.getElementById('playerCount').value;
    
    // Redirect to drawboard.html with number of players as a query parameter
    window.location.href = 'drawboard.html?players=' + encodeURIComponent(playerCount);
});
