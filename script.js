// Base Created By Edspresso Editor
// Alan Zhang 9/12/20

// The attributes of the player.
var player = {
    x: 200,
    y: 50,
    x_v: 0,
    y_v: 0,
    isJumping : true,
    height: 20,
    width: 20
};
// The status of the arrow keys
var keys = {
    right: false,
    left: false,
    up: false,
};
// The friction and gravity to show realistic movements
var gravity = 0.6;
var friction = 0.8;
// The number of platforms
var num = 5;
// The platforms
var platforms = [];
// Function to render the canvas
function rendercanvas(){
    ctx.fillStyle = "#F0F8FF";
    ctx.fillRect(0, 0, 540, 540);
}
// Function to render the player
function renderplayer(){
    ctx.fillStyle = "#F08080";
    ctx.fillRect((player.x)-player.width, (player.y)-player.height, player.width, player.height);
    }
// Function to create platforms
function createplat(){
    for(i = 0; i < num; i++) {
      if (i % 2 == 0) {
        platforms.push(
            {
            x: 100 * i,
            y: 200 + (30 * i),
            width: 110,
            height: 15
            }
        );
      } else {
        platforms.push(
            {
            x: 100 * i,
            y: 200 + (30 * i),
            width: 110,
            height: 15
            }
        );
      }
    }
    }
// Function to render platforms
function renderplat(){
    ctx.fillStyle = "#45597E";
    // ctx.fillRect(platforms[0].x, platforms[0].y, platforms[0].width, platforms[0].height);
    // ctx.fillRect(platforms[1].x, platforms[1].y, platforms[1].width, platforms[1].height);
    for (let i = 0; i < num; i++) {
      ctx.fillRect(platforms[i].x, platforms[i].y, platforms[i].width, platforms[i].height);
    }
}
// This function will be called when a key on the keyboard is pressed
function keydown(e) {
    // 37 is the code for the left arrow key
    if(e.keyCode == 37) {
        keys.left = true;
    }
    // 37 is the code for the up arrow key
    if(e.keyCode == 38) {
        if(player.isJumping == false) {
            player.y_v = -10;
        }
    }
    // 39 is the code for the right arrow key
    if(e.keyCode == 39) {
        keys.right = true;
    }
}
// This function is called when the pressed key is released
function keyup(e) {
    if(e.keyCode == 37) {
        keys.left = false;
    }
    if(e.keyCode == 38) {
        if(player.y_v < -2) {
        player.y_v = -3;
        }
    }
    if(e.keyCode == 39) {
        keys.right = false;
    }
}
function loop() {
    // If the player is not jumping apply the effect of frictiom
    if(player.isJumping) {
        player.y_v += (player.y_v > 8) ? 0 : gravity;

    } else {
        // If the player is in the air then apply the effect of gravity
        player.x_v *= friction;
    }
    player.isJumping = true;
    // If the left key is pressed increase the relevant horizontal velocity
    if(keys.left) {
        player.x_v = -2.5;
    }
    if(keys.right) {
        player.x_v = 2.5;
    }
    // Updating the y and x coordinates of the player
    player.y += player.y_v;
    player.x += player.x_v;
    // A simple code that checks for collions with the platform
    let ind = -1;
    for (let i = 0; i < num; i++) {
      if(platforms[i].x < player.x && player.x < platforms[i].x + platforms[i].width+20 &&
      platforms[i].y < player.y && player.y < platforms[i].y + platforms[i].height){
          ind = i;
      }
    }
    if (ind > -1){
        player.isJumping = false;
        player.y = platforms[ind].y;
    }
    if (player.y > 540) {
      player.y = 0;
    }
    if (player.x < 0) {
      player.x = 540;
    }
    if (player.x > 540) {
      player.x = 0;
    }
    // Rendering the canvas, the player and the platforms
    rendercanvas();
    renderplayer();
    renderplat();
}
canvas=document.getElementById("canvas");
ctx=canvas.getContext("2d");
ctx.canvas.height = 540;
ctx.canvas.width = 540;
createplat();
// Adding the event listeners
document.addEventListener("keydown",keydown);
document.addEventListener("keyup",keyup);
setInterval(loop,20);
