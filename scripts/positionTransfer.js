// --- positionTransfer --- //

function TransferPosition(level) {
    //more code
}

TransferPosition.prototype.draw = function(play) {
    ctx.clearRect(0, 0, play.width, play.height);
    ctx.font="40px Comic Sans MS";
    ctx.fillStyle = '#D7DF01';
    ctx.fillText("We are in Transfer Position", play.width / 2, play.height/2); 
}