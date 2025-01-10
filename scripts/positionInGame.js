// --- positionInGame --- //

function InGamePosition(settings, level) {
  this.settings = settings;
  this.level = level;
  this.upSec = this.settings.updateSeconds;
  this.spaceshipSpeed = this.settings.spaceshipSpeed;
  this.object = null;
  this.spaceship = null;
}

InGamePosition.prototype.update = function (play) {
  //integer of LEFT 37, RIGHT 39;
  if (play.pressedKeys[37]) {
    this, (this.spaceship.x -= this.spaceshipSpeed * this.upSec);
  }

  if (play.pressedKeys[39]) {
    this, (this.spaceship.x += this.spaceshipSpeed * this.upSec);
  }
};

InGamePosition.prototype.entry = function (play) {
  this.spaceship_image = new Image();
  this.object = new Objects();
  this.spaceship = this.object.spaceship(
    play.width / 2,
    play.playBoundaries.bottom,
    this.spaceship_image
  );
};

InGamePosition.prototype.keyDown = function (play, keyboardCode) {};

InGamePosition.prototype.draw = function (play) {
  ctx.clearRect(0, 0, play.width, play.height);
  ctx.drawImage(
    this.spaceship_image,
    this.spaceship.x - this.spaceship.width / 2,
    this.spaceship.y - this.spaceship.height / 2
  );
};
