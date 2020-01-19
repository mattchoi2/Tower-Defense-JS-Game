var fire1 = new effectObj("fire", 0, 0, "fire");
var fire2 = new effectObj("fire", 0, 0, "fire");
var fire3 = new effectObj("fire", 0, 0, "fire");
var fire4 = new effectObj("fire", 0, 0, "fire");
var fire5 = new effectObj("fire", 0, 0, "fire");

var fireball1 = new bombObj("fireball", 0);
var fireball2 = new bombObj("fireball", 0);
var fireball3 = new bombObj("fireball", 0);
var fireball4 = new bombObj("fireball", 0);


function drawFire() {
	fireDraw(fire1);
	fireDraw(fire2);
	fireDraw(fire3);
	fireDraw(fire4);
	fireDraw(fire5);
	fireDraw(fireball1);
	fireDraw(fireball2);
	fireDraw(fireball3);
	fireDraw(fireball4);
	function fireDraw(obj) {
		if (obj.onScreen) {
			if (obj.id !== "fireball") {
				obj.draw();
			} else {
				spin(obj);
			}
		} else {
			obj.xpos = -canvas.width;
			obj.ypos = -canvas.height;
		}
		
		if (obj.base == "fire") {
			obj.id = obj.base + obj.frame;
			obj.setDimen(obj.xpos, obj.ypos);
		}
	}
}

animFire(fire1);
animFire(fire2);
animFire(fire3);
animFire(fire4);
animFire(fire5);
function animFire(obj) {
	if (obj.frame < 7) {
		obj.frame ++;
	} else {
		obj.frame = 1;
	}
	setTimeout(animFire, (3000 / game.fps) / game.timeMultiplier, obj);
}

function fireDir() {
	updateFire(fireball1);
	updateFire(fireball2);
	updateFire(fireball3);
	updateFire(fireball4);
	if (fire1.onScreen && fire2.onScreen && fire3.onScreen && fire4.onScreen && fire5.onScreen) {
		game.fireShotLimit = true;
	} else {
		game.fireShotLimit = false;
	}
}

function updateFire(obj) {
	
	if (obj.onScreen) {
		if (obj.xpos > canvas.width && obj.ypos + obj.height > ground.ypos) { //if you somehow miss the ground...
			obj.onScreen = false;
			game.shotHits --;
		} else if (obj.ypos >= ground.ypos) {
			if (fire1.onScreen == false) {
				placeFire(obj, fire1);
			} else if (fire2.onScreen == false) {
				placeFire(obj, fire2);
			} else if (fire3.onScreen == false) {
				placeFire(obj, fire3);
			} else if (fire4.onScreen == false) {
				placeFire(obj, fire4);
			} else if (fire5.onScreen == false) {
				placeFire(obj, fire5);
			}
			obj.onScreen = false;
		}
	}
}

function placeFire(obj, obj2) { //obj = fireball, obj2 = fire
	obj2.onScreen = true;
	obj2.xpos = obj.xpos;
	obj2.ypos = ground.ypos - obj2.height + 3;
	setTimeout(burnOut, obj.burnTime, obj2);
}

function burnOut(obj) {
	obj.onScreen = false;
}

function fireCheck() {
	drawBoom();
	game.fireAmmo --;
	game.shotHits ++; //Assuming that the fireball hits at least one enemy
	game.shotCount ++;
	if (fireball1.onScreen == false) {
		fireBall(fireball1);
	} else if (fireball2.onScreen == false) {
		fireBall(fireball2);
	} else if (fireball3.onScreen == false) {
		fireBall(fireball3);
	} else if (fireball4.onScreen == false) {
		fireBall(fireball4);
	}
}

var fireArr = [fire1, fire2, fire3, fire4, fire5];
function checkFireHit(obj) { //mushroom enemy
	var fireTemp = 0;
	while (fireTemp < fireArr.length) {
		if (fireArr[fireTemp].onScreen) {
			touchingSaw(obj, fireArr[fireTemp]);
		}
		fireTemp ++;
	}
}