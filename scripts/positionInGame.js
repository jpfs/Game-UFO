// --- positionInGame --- //

function InGamePosition(setting, level) {
  this.setting = setting;
  this.level = level;
  this.upSec = this.setting.updateSeconds;
  this.spaceshipSpeed = this.setting.spaceshipSpeed;
  this.object = null;
  this.spaceship = null;
  this.bullet = [];
}

InGamePosition.prototype.update = function (play) {
  const spaceship = this.spaceship;
  const spaceshipSpeed = this.spaceshipSpeed;
  const upSec = this.setting.updateSeconds;
  const bullets = this.bullets;
  //integer of LEFT 37, RIGHT 39;
  if (play.pressedKeys[37]) {
    this, (this.spaceship.x -= this.spaceshipSpeed * this.upSec);
  }

  if (play.pressedKeys[39]) {
    this, (this.spaceship.x += this.spaceshipSpeed * this.upSec);
  }

  //if the user fires: so hits the SPACE
  if (play.pressedKey[32]) {
    this.shoot();
  }

  if (this.spaceship.x < play.playBoundaries.left) {
    this.spaceship.x = play.playBoundaries.left;
  }

  if (this.spaceship.x > play.playBoundaries.right) {
    this.spaceship.x = play.playBoundaries.right;
  }

  //Moving bullets
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.y -= upSec * this.setting.bulletSpeed;
    // If our bullet flies out from the canvas, it will be cleared
    if (bullet.y < 0) {
      bullets.slice(i--, 1);
    }
  }
};

InGamePosition.prototype.shoot = function () {
  this.object = new Objects();
  this.bullets.push(
    this.object.bullet(
      this.spaceship.x,
      this.spaceship.y - this.spaceship.height / 2,
      this.setting.bulletSpeed
    )
  );
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

  //draw Bullets
  ctx.fillStyle = "#ff0000";
  for (let i = 0; i < this.bullets.length; i++) {
    let bullet = this.bullets[i];
    ctx.fillRect(bullet.x - 1, bullet.y - 6, 2, 6);
  }
};
