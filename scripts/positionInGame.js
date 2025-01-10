// --- positionInGame --- //

function InGamePosition(setting, level) {
  this.setting = setting;
  this.level = level;
  this.upSec = this.setting.updateSeconds;
  this.spaceshipSpeed = this.setting.spaceshipSpeed;
  this.object = null;
  this.spaceship = null;
}

InGamePosition.prototype.update = function (play) {
  const spaceship = this.spaceship;
  const spaceshipSpeed = this.spaceshipSpeed;
  const upSec = this.setting.updateSeconds;
  //integer of LEFT 37, RIGHT 39;
  if (play.pressedKeys[37]) {
    this, (this.spaceship.x -= this.spaceshipSpeed * this.upSec);
  }

  if (play.pressedKeys[39]) {
    this, (this.spaceship.x += this.spaceshipSpeed * this.upSec);
  }

  if (this.spaceship.x < play.playBoundaries.left) {
    this.spaceship.x = play.playBoundaries.left;
  }

  if (this.spaceship.x > play.playBoundaries.right) {
    this.spaceship.x = play.playBoundaries.right;
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
