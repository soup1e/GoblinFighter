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
const addGoblin = document.getElementById('add-goblins-form');

/* State */
let player = {
    health: 10,
};

let goblins = [
    {
        name: 'Levi',
        type: 'Imp',
        health: 5,
    },
    {
        name: 'Bob',
        type: 'Frog',
        health: 2,
    },
    {
        name: 'Larry',
        type: 'Imp',
        health: 5,
    },
];

const Imp = {
    type: 'Imp',
    health: 5,
};

const Frog = {
    type: 'Frog',
    health: 2,
};

const Orc = {
    type: 'Orc',
    health: 10,
};

const Boss = {
    type: 'Boss',
    health: 20,
};

const playerAttackArray = [0, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 10];
const goblinAttackArray = [0, 0, 0, 1, 1, 1, 1, 2, 2, 3, 4];
const goblinTypeArray = [Imp, Imp, Imp, Imp, Imp, Frog, Frog, Frog, Orc, Orc, Boss];

let message = 'Start Fighting Goblins!';
let kills = 0;
/* Events */
addGoblin.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(addGoblin);
    const newgoblinType = getRandomItem(goblinTypeArray);

    const goblin = {
        name: formData.get('name'),
        type: newgoblinType.type,
        health: newgoblinType.health,
    };
    goblins.push(goblin);

    message = `A wild ${goblin.type} appeared!`;

    displayPlayer();
    displayGoblins();
    displayMessage();
    displayKills();
});

/* Display Functions */
function displayGoblins() {
    goblinList.innerHTML = '';
    //IF DEAD BREAK CODE TEST ! MAKE PLAY AGAIN BUTTON LATER
    if (player.health === 0) {
        return;
    } else {
        for (const goblin of goblins) {
            const goblinEl = renderGoblin(goblin);
            goblinList.append(goblinEl);

            goblinEl.addEventListener('click', () => {
                if (goblin.health < 1) {
                    message = `Dead things can't fight back!`;
                    displayMessage();
                    return;
                }

                const playerAttack = getRandomItem(playerAttackArray);

                goblin.health = Math.max(0, goblin.health - playerAttack); // new health is old health minus attack cant go below 0

                const goblinAttack = getRandomItem(goblinAttackArray);

                player.health = Math.max(0, player.health - goblinAttack);

                message = '';
                if (player.health === 0) {
                    message = '';
                    message = 'You Died. ';
                }

                if (playerAttack === 0) {
                    message += `You Whiffed LOL! `;
                } else if (playerAttack === 10) {
                    message += `Critical Hit!`;
                    Math.max(10, (player.health += goblinAttack));
                } else {
                    message += `You hit ${goblin.name} for ${playerAttack} damage. `;
                }

                if (playerAttack === 10) {
                    message += `You parried ${goblin.name}'s Attack!`;
                    displayPlayer();
                    displayGoblins();
                    displayMessage();
                    displayKills();
                    return;
                } else if (goblinAttack === 0) {
                    message += `${goblin.name} didn't fight back!`;
                } else {
                    message += `${goblin.name} hit you for ${goblinAttack} damage. `;
                }

                if (goblin.health === 0) {
                    kills++;
                }
                displayPlayer();
                displayGoblins();
                displayMessage();
                displayKills();
            });
        }
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
