/** Scripts to run events for snowball game.
  * Author: Christian Seremetis
  * Date: 6 August 2018
  */

//Store relevant DOM elements using querySelector()
let oldMan = document.querySelector('#oldMan');
let player = document.querySelector('#player');
let ball_frame = document.querySelector('#ball_frame');
let camera = document.querySelector('[camera]').object3D;

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
  
  let tag = `<${snowball.type} ${snowball.body} radius='${snowball.radius}' 
  position='${snowball.position}' velocity='${snowball.velocity}'>
  </${snowball.type}>`;
  console.log(tag);
  return tag;
}

/** Here we actually append the created ball to the DOM. */
function throwBall() {
  let position = camera.getWorldDirection();
  let velocity = `${position.x * -25} 2 ${position.z * -25}`;
  console.log('throwing ball');
  ball_frame.innerHTML = construct_ball(velocity);
  console.log('ball thrown');
}

/** Throw every time the user clicks. */
window.addEventListener('click', e => {
  throwBall();
});