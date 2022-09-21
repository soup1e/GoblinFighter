/* Imports */
import { renderGoblin } from './render.js';
import { getRandomItem } from './render.js';

/* Get DOM Elements */
const playerHealth = document.getElementById('playerhealth');
const playerImage = document.getElementById('playerimg');
const hpBar = document.getElementById('playerhpbar');
const messageDisplay = document.getElementById('notifications');
const killsDisplay = document.getElementById('scoreboard');
const goblinList = document.getElementById('goblin-list');

/* State */
let player = {
    health: 10,
};

let goblins = [
    {
        name: 'Levi',
        type: 'imp',
        health: 5,
    },
    {
        name: 'Bob',
        type: 'frog',
        health: 2,
    },
    {
        name: 'Larry',
        type: 'imp',
        health: 5,
    },
];

const imp = {
    type: 'imp',
    health: 5,
};

const frog = {
    type: 'frog',
    health: 2,
};

const orc = {
    type: 'orc',
    health: 10,
};

const playerAttackArray = [0, 1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 8];

let message = 'Start Fighting Goblins!';
let kills = 0;
/* Events */

/* Display Functions */
function displayGoblins() {
    goblinList.innerHTML = '';

    for (const goblin of goblins) {
        const goblinEl = renderGoblin(goblin);
        goblinList.append(goblinEl);

        goblinEl.addEventListener('click', () => {
            if (goblin.health < 1) {
                message = `He's Already Dead`;
                displayMessage();
                return;
            }

            const playerAttack = getRandomItem(playerAttackArray);

            goblin.health = Math.max(0, goblin.health - playerAttack); // new health is old health minus attack cant go below 0

            displayMessage();
            displayPlayer();
            displayGoblins();
        });
    }
}

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
displayGoblins();
displayMessage();
displayKills();
