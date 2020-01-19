var cannon = new cannonObj("cannon", 100, 160);
var ball = new ballObj("ball", 100, 100, 0); //xpos, ypos, num (used in ball damage delay)
var ball1 = new ballObj("ball", 100, 100, 1);
var ball2 = new ballObj("ball", 100, 100, 2);
var ball3 = new ballObj("ball", 100, 100, 3);
var ball4 = new ballObj("ball", 100, 100, 4);
var ball5 = new ballObj("ball", 100, 100, 5);
var ball6 = new ballObj("ball", 100, 100, 6);
var ball7 = new ballObj("ball", 100, 100, 7);
var ball8 = new ballObj("ball", 100, 100, 8);

function getAngle(obj) {
	var x1 =  obj.xpos;
	var y1 = obj.ypos;
	var x2 = game.mousex;
	var y2 = game.mousey;
	
	var l1 = Math.sqrt(Math.abs(Math.pow(x2 - x1, 2) + Math.pow(y2-y1, 2))); //distance formula
	var l2 = Math.abs(x2 - x1);
	var angle = Math.acos(l2 / l1);
	//cosine = adjacent / hypotenuse
	angle = angle * (180 / 3.14); //radians to degrees
	
	if (y2 < y1 && x2 > x1) { //Quadrant 1
		angle = -angle;
	} else if(x2 <= x1 && y2 <= y1) { //Quadrant 2
		angle = -90;
	} else if (x2 < x1 && y2 > y1) { //Quadrant 3
		angle = 90;
	}
	cannon.angle = angle * (3.14 / 180); //back to radians, converted because i only understand quadrants in degrees (lol)
}

function cannonTurn() {
	if (game.townMode == false) {
		ctx.save();
		ctx.translate(cannon.xpos + 10, cannon.ypos + (cannon.height / 2)); //sets to pivot point when rotating canvas
		ctx.rotate(cannon.angle);
		ctx.translate(-cannon.xpos - 10, -(cannon.ypos + (cannon.height / 2))); //moves pivot point back
		cannon.draw();
		ctx.restore();
	}
}

function mouseCoords(event) {
	if (event !== undefined) {
		var rect = canvas.getBoundingClientRect();
			
		game.mousex = event.clientX - rect.left;
		game.mousey = event.clientY - rect.top;
	}
}

function fireBall(obj, spread) { //calls only once when mouse is clicked
	obj.onScreen = true;
	obj.xpos = cannon.xpos;
	obj.ypos = cannon.ypos;
	moveBallToEnd(obj);
	obj.setDimen(obj.xpos, obj.ypos);
	if (spread == undefined) {
		obj.velocx = Math.abs(Math.cos(cannon.angle) * obj.speed * game.speedMultiplier);
		obj.velocy = Math.sin(cannon.angle) * obj.speed * game.speedMultiplier;
	} else {
		var spread = (spread * (3.14 / 180)) + cannon.angle;
		obj.velocx = Math.abs(Math.cos(spread) * obj.speed * game.speedMultiplier);
		obj.velocy = Math.sin(spread) * obj.speed * game.speedMultiplier;
	}
}

function drawBall() {
	checkExists(ball);
	checkExists(ball1);
	checkExists(ball2);
	checkExists(ball3);
	checkExists(ball4);
	checkExists(ball5);
	checkExists(ball6);
	checkExists(ball7);
	checkExists(ball8);
	
	function checkExists(obj) {
		if (obj.img !== undefined) {
			obj.draw();
			obj.onScreen = true;
			if (obj.xpos > canvas.width || obj.ypos > canvas.height - UI.height) { //if outside canvas
				obj.onScreen = false;
			}
		}
	}
}

function moveBallToEnd(obj) { //of the cannon when firing
	var l1 = cannon.width;
	var l2 = Math.cos(cannon.angle) * cannon.width; //how far horizontally
	var l3 = Math.sin(cannon.angle) * cannon.width; //how far vertically
	obj.xpos += l2;
	obj.ypos += l3;
}

function ballPhysicsDir() { //redirects to ballPhysics WITH objects
	ballPhysics(ball);
	ballPhysics(ball1);
	ballPhysics(ball2);
	ballPhysics(ball3);
	ballPhysics(ball4);
	ballPhysics(ball5);
	ballPhysics(ball6);
	ballPhysics(ball7);
	ballPhysics(ball8);
	ballPhysics(saw1); //FUCK SHIT UP
	ballPhysics(saw2);
	ballPhysics(saw3);
	ballPhysics(bomb1);
	ballPhysics(bomb2);
	ballPhysics(bomb3);
	ballPhysics(fireball1);
	ballPhysics(fireball2);
	ballPhysics(fireball3);
	ballPhysics(fireball4);
}

function ballPhysics(obj) {
	if(obj.onScreen) {
		obj.xpos += obj.velocx * game.dt * game.timeMultiplier;
		obj.ypos += obj.velocy * game.dt * game.timeMultiplier;
		obj.velocy += game.gravity * game.dt * game.timeMultiplier;
	} else {
		obj.xpos = canvas.width * 2; //keeps them from hurting mushrooms will out of frame
		obj.ypos = canvas.height * 2; //because mushrooms spawn out of frame
	}
}

function fireTripleBall(obj1, obj2, obj3) { //calls only once when mouse is clicked
	fireBall(obj1); //first ball fires normally
	var tempAngle = 10;
	fireBall(obj2, tempAngle); //the second parameter is the spread of the shot
	fireBall(obj3, -tempAngle);
}
