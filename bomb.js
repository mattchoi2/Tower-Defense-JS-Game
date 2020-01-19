var bomb1 = new bombObj("bomb", 1);
var bomb2 = new bombObj("bomb", 2);
var bomb3 = new bombObj("bomb", 3);

function bombCheck() {
	drawBoom();
	game.bombAmmo --;
	game.shotCount ++;
	if (bomb1.onScreen == false) {
		fireBall(bomb1);
	} else if (bomb2.onScreen == false) {
		fireBall(bomb2);
	} else if (bomb3.onScreen == false) {
		fireBall(bomb3);
	}
}

function drawBomb(obj) {
	if (obj.onScreen) {
		spin(obj);
		if (obj.xpos > canvas.width || obj.ypos > canvas.height) { //I used canvas.height to give some grace to the players skills
			obj.onScreen = false;
			obj.xpos = 0;
			obj.ypos = 0;
		}
	}
}

function bombDir() {
	drawBomb(bomb1);
	drawBomb(bomb2);
	drawBomb(bomb3);
}

function bombExplode() {
	if (bomb1.onScreen) {
		explodeBomb(bomb1);
	} else if (bomb2.onScreen) {
		explodeBomb(bomb2);
	} else if (bomb3.onScreen) {
		explodeBomb(bomb3);
	}
}

function checkBombHit(obj) { //obj is all enemies, this is called EVERY frame for ALL enemies, efficiency needed
	var te = 0;
	if (bombBoomArr[te].onScreen && obj.isAttack) { //they must both be on screen to touch
		while (te < 4) {
			if (checkBombBoom(obj, bombBoomArr[te])) { //if they are touching
				explosionPush(obj, bombBoomArr[te]);
				game.shotHits ++;
				break;
			} else {
				te ++;
			}
		}
	}
}

function checkBombBoom(obj, obj2) { //obj 1 is enemy, obj2 is explosion animation
	if (obj.xpos < obj2.xpos + obj2.width  && obj.xpos + obj.width  > obj2.xpos &&
		obj.ypos < obj2.ypos + obj2.height && obj.ypos + obj.height > obj2.ypos &&
		obj2.temp2 == 2) { //effects enemies for only the first frame
		return true;
	}
}

function explosionPush(obj, obj2) { //only runs once
	var EnRelX = obj.xpos + (obj.width / 2);
	var EnRelY = obj.ypos + (obj.height / 2);
	var ExRelX = obj2.xpos + (obj2.width / 2);
	var ExRelY = obj2.ypos + (obj2.height / 2);
	
	var l1 = Math.abs(ExRelX - EnRelX); //horizontal
	var l2 = Math.abs(ExRelY - EnRelY); //vertical
	//TAN = OPP / ADJ
	var ang = Math.atan(l2 / l1); //use the angle to split the angled push (value from bomb1) into its components
	//
	var pushX = Math.cos(ang) * bomb1.force;
	var pushY = Math.sin(ang) * bomb1.force;
	
	obj.speed -= pushX;
	obj.velocy -= pushY;
	obj.health -= bomb1.damage;
}