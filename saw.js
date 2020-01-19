var saw1 = new sawObj("saw", 1);
var saw2 = new sawObj("saw",2);
var saw3 = new sawObj("saw", 3);

function sawDir() {
	drawSaw(saw1);
	drawSaw(saw2);
	drawSaw(saw3);
}

function sawUpdate() {
	groundSaw(saw1);
	groundSaw(saw2);
	groundSaw(saw3);
}

function groundSaw(obj) {
	if (obj.xpos > canvas.width) {
		obj.onScreen = false;
		obj.xpos = 0;
		obj.ypos = 0;
	} else if (obj.ypos >= ground.ypos - (obj.height / 1.5)) {
		obj.velocy = 0;
		obj.velocx = 0.5 * game.timeMultiplier;
	}
}

function drawSaw(obj) { //spins and draws simultaneously!
	if (obj.onScreen) {
		spin(obj);
	}
}

function spin(obj) {
	obj.setDimen(obj.xpos, obj.ypos);
	ctx.save();
	ctx.translate(obj.xpos + (obj.width / 2), obj.ypos + (obj.height / 2)); //center pivot point
	ctx.rotate(obj.angle);
	obj.angle += obj.angleSpeed * game.dt * game.timeMultiplier;
	ctx.translate(-(obj.xpos + (obj.width / 2)), -(obj.ypos + (obj.height / 2)));
	obj.draw();
	ctx.restore();
}

function checkSawHit(obj) { //object is all the enemies
	var sawArr = [saw1, saw2, saw3];
	var temp5 = 0;
	while (temp5 < sawArr.length && sawArr[temp5].onScreen) {
		touchingSaw(obj, sawArr[temp5]); //next function down
		temp5 ++;
	}
}

function touchingSaw(obj1, obj2) { //the enemy object = obj1   cannon object = obj2
	if (obj1.xpos < obj2.xpos + obj2.width  && obj1.xpos + obj1.width  > obj2.xpos &&
		obj1.ypos < obj2.ypos + obj2.height && obj1.ypos + obj1.height > obj2.ypos) {
		obj1.health -= obj2.damage;
	}
}

function sawCheck() {
	drawBoom();
	game.sawAmmo --;
	game.shotHits ++; //Assuming that the saw hits at least one enemy
	game.shotCount ++;
	if (saw1.onScreen == false) {
		fireBall(saw1);
	} else if (saw2.onScreen == false) {
		fireBall(saw2);
	} else if (saw3.onScreen == false) {
		fireBall(saw3);
	}
}

function resetHits(obj1, obj2, str) {
	obj1.hitArr[obj2.num] = "";
	obj2.damage = obj2.damageMax;
}