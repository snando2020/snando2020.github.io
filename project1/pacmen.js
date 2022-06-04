var gameWidth = document.getElementById('game').clientWidth;
var gameHeight = document.getElementById('game').clientHeight;
const pacArray = [
    ['project1/images/PacMan1.png', 'project1/images/PacMan2.png'],
    ['project1/images/PacMan3.png', 'project1/images/PacMan4.png'],
];

const pacMen = []; // This array holds all the pacmen
var focus = 0;
var direction = 0;
// This function returns an object with random values
function setToRandom(scale) {
    return {
        x: Math.random() * scale,
        y: Math.random() * scale,
    };
}

// Factory to make a PacMan at a random position with random velocity
function makePac() {
    // returns an object with random values scaled {x: 33, y: 21}
    let velocity = setToRandom(10); // {x:?, y:?}
    let position = setToRandom(2000);

    // Add image to div id = game
    let game = document.getElementById('game');
    let newimg = document.createElement('img');
    newimg.style.position = 'absolute';
    newimg.src = 'project1/images/PacMan1.png';
    newimg.width = 100;

    // TODO: set position here
    newimg.style.left = position.x;
    newimg.style.top = position.y;
    // TODO add new Child image to game
    game.appendChild(newimg);

    // return details in an object
    return {
        position,
        velocity,
        newimg,
        direction,
        focus
    };
}

function update() {
    // loop over pacmen array and move each one and move image in DOM
    pacMen.forEach((item) => {
        item.focus = (item.focus + 1) % 2
        item.newimg.src = pacArray[item.newimg.direction][item.focus];
        checkCollisions(item);
        item.position.x += item.velocity.x;
        item.position.y += item.velocity.y;
        item.newimg.style.left = item.position.x;
        item.newimg.style.top = item.position.y;
    });
    setTimeout(update, 150);
}

function checkCollisions(item) {
    // TODO: detect collision with all walls and make pacman bounce
    if (
        item.position.x + item.velocity.x + item.newimg.width > game.offsetWidth ||
        item.position.x + item.velocity.x < 0
    )
        item.velocity.x = -item.velocity.x;
    if (
        item.position.y + item.velocity.y + item.newimg.height >
        game.offsetHeight ||
        item.position.y + item.velocity.y < 0
    )
        item.velocity.y = -item.velocity.y;
}

function makeOne() {
    pacMen.push(makePac()); // add a new PacMan
}