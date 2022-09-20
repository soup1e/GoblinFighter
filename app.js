/* Imports */

/* Get DOM Elements */
const playerHealth = document.getElementById('playerhealth');
const playerImage = document.getElementById('playerimg');
let hpBar = document.getElementById('playerhpbar');
/* State */
let player = {
    health: 0,
};
/* Events */

function displayPlayer() {
    playerHealth.textContent = Math.max(0, player.health);
    hpBar.value = playerHealth.textContent;
    if (player.health < 1) {
        playerImage.src = 'assets/playerDead.png';
    } else {
        playerImage.src = 'assets/player.png';
    }
}
/* Display Functions */

// (don't forget to call any display functions you want to run on page load!)
displayPlayer();
