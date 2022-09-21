export function getRandomNumber(choices) {
    return Math.floor(Math.random() * choices);
}

export function getRandomItem(array) {
    const random = getRandomNumber(array.length);
    const item = array[random];
    return item;
}

export function renderGoblin(goblin) {
    const li = document.createElement('li');
    li.classList.add('goblin-display');
    const goblinImage = document.createElement('img');
    if (goblin.health > 0) {
        goblinImage.src = `assets/${goblin.type}.png`;
    } else if (goblin.health === 0) {
        goblinImage.src = 'assets/' + goblin.type + 'Dead.png';
    }
    const goblinName = document.createElement('span');
    goblinName.classList.add('goblin-name');
    goblinName.textContent = goblin.name;
    const goblinType = document.createElement('span');
    goblinType.classList.add('goblin-type');
    goblinType.textContent = `The ${goblin.type}`;
    const health = document.createElement('span');
    health.classList.add('health');
    health.textContent = goblin.health;

    li.append(goblinImage, goblinName, goblinType, health);
    return li;
}
