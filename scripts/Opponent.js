/** Counter to keep track of opponent ids. */
let counter = 0;

/** Public constructor for Opponent objects. */
function Opponent() {
  //set health to starting value 10
  this.health = 10;
  counter++;
  this.id = counter;
  //store the character's associated tag in an instance variable.
  let location = '17.45 2.3 10.986';
  let url = 'https://poly.google.com/view/2WOXO0LlL0K';
  this.tag = `<a-entity class='opponent' id='opponent${this.id}' 
  static-body gblock='${url}' position='${location}' 
  scale='0.8 0.8 0.8'></a-entity>`;
}

/** Executes when the opponent gets hit by a snowball. */
Opponent.prototype.damage = function() {
  this.health--;
};

/** Makes the health appear on the screen in an "HP Bar." */
Opponent.prototype.showHealth = function() {
    
};

/** Appends the opponent to the DOM. */
Opponent.prototype.appear = function() {
  //make opponent appear on the DOM
  let field = document.querySelector("#opponent_field");
  field.innerHTML += this.tag;
};