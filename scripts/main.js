const canvas = document.getElementById("ufoCanvas");

canvas.width = 900;
canvas.height = 750;

//canvas automatic resizing
function resize() {
  const height = window.innerHeight - 20;

  const ratio = canvas.width / canvas.height;
  const width = height * ratio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

window.addEventListener("load", resize, false);

//Game basics
function GameBasics(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;

  //active playing field
  this.playBoundaries = {
    top: 150,
    bottom: 650,
    left: 100,
    right: 800,
  };

  this.setting = {
    // Game settings
    updateSeconds: 1 / 60,
  };
  // We collect here the different positions, states of the game
  this.positionContainer = [];
}

// Return to current game position, status. Always returns the top element of positionContainer.
GameBasics.prototype.presentPosition = function () {
  return this.positionContainer.length > 0
    ? this.positionContainer[this.positionContainer.length - 1]
    : null;
};

// Move to the desired position
GameBasics.prototype.goToPosition = function (position) {
  // If we're already in a position clear the positionContainer.
  if (this.presentPosition()) {
    this.positionContainer.length = 0;
  }
  // If we find an entry in a given position, we call it.
  if (position.entry) {
    position.entry(play);
  }
  // Setting the current game position in the positionContainer
  this.positionContainer.push(position);
};

// Push our new position into the positionContainer
GameBasics.prototype.pushPosition = function (position) {
  this.positionContainer.push(position);
};

// Pop the position from the positionContainer
GameBasics.prototype.popPosition = function () {
  this.positionContainer.pop();
};

GameBasics.prototype.start = function () {
  setInterval(function () {
    gameLoop(play);
  }, this.setting.updateSeconds * 1000);
  //Go into the Opening position
  this.goToPosition(new OpeningPosition());
  //more code soon
};

const play = new GameBasics(canvas);
play.start();

function gameLoop(play) {
  let presentPosition = play.presentPosition;

  if (presentPosition) {
    //update
    if (presentPosition.update) {
      presentPosition.update(play);
    }
    //draw
    if (presentPosition.draw) {
      presentPosition.draw(play);
    }
  }
}
