/* Imports */

/* Get DOM Elements */
const playerHealth = document.getElementById('playerhealth');
const playerImage = document.getElementById('playerimg');
const hpBar = document.getElementById('playerhpbar');
const messageDisplay = document.getElementById('notifications');
const killsDisplay = document.getElementById('scoreboard');

/* State */
let player = {
    health: 0,
};

let message = '';
let kills = 0;

/* Events */

/* Display Functions */
function displayPlayer() {
    playerHealth.textContent = Math.max(0, player.health);
    hpBar.value = playerHealth.textContent;
    if (player.health < 1) {
        playerImage.src = 'assets/playerDead.png';
    } else {
        playerImage.src = 'assets/player.png';
    }
}

function displayMessage() {
    messageDisplay.textContent = message;
}

function displayKills() {
    killsDisplay.textContent = `You defeated ${kills} Goblins!`;
}

// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
displayMessage();
displayKills();
