/** Scripts to run events for snowball game.
  * Author: Christian Seremetis
  * Date: 6 August 2018
  */

//Store relevant DOM elements using querySelector()
let oldMan = document.querySelector('#oldMan');
let player = document.querySelector('#player');
let ball_frame = document.querySelector('#ball_frame');
let camera = document.querySelector('[camera]').object3D;
let healthBar = document.querySelector('#content');
let opponents = []; //store all opponents here
let numOpponents = 1;

//If the old man catches you, it's game over
player.addEventListener('collide', e => {
  if (e.detail.body.el == oldMan) {
    alert('Game Over!');
  } 
});

/** Creates the ball element that we append to the DOM
  * in the throwBall() function. 
  * @param {string} velocity, the ball's velocity
  */
function construct_ball(velocity) {
  let position = [];
  position.push(camera.position.x, camera.position.z);
  let snowball = {
    type: 'a-sphere',
    radius: '0.2',
    body: 'dynamic-body',
    position: `${position[0]} 3 ${position[1]}`,
    velocity: velocity
  };
  
  let tag = `<${snowball.type} ${snowball.body} class='snowball' 
  radius='${snowball.radius}' position='${snowball.position}' 
  velocity='${snowball.velocity}'></${snowball.type}>`;
  return tag;
}

/** Here we actually append the created ball to the DOM. */
function throwBall() {
  let position = camera.getWorldDirection();
  let velocity = `${position.x * -25} 2 ${position.z * -25}`;
  ball_frame.innerHTML = construct_ball(velocity);
}

/** Throw every time the user clicks. */
window.addEventListener('click', e => {
  throwBall();
});

/** Start the game when the page loads. */
for (let i = 0; i < numOpponents; i++) {
  let opponent = new Opponent();
  opponent.appear();
  opponents.push(opponent);
}

opponents.forEach(o => {
  let htmlObject = document.querySelector(`#opponent${o.id}`);
  
  htmlObject.addEventListener('collide', e => {
    if (o.health <= 1) {
      healthBar.innerHTML = `<h3>Opponent Defeated</h3>`;
    } else {
      o.damage();
      healthBar.innerHTML = `<h3>Opponent Health: ${o.health}</h3>`;
      healthBar.classList.toggle('hidden');
    }
  });
});