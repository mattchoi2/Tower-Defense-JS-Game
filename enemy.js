var mush = new enemyObj("mush1",150, 0);
var mush1 = new enemyObj("mush1",150, 0);
var mush2 = new enemyObj("mush1",150, 0);
var mush3 = new enemyObj("mush1",150, 0);
var mush4 = new enemyObj("mush1",150, 0);
var mush5 = new enemyObj("mush1",150, 0);
var mush6 = new enemyObj("mush1",150, 0);
var mush7 = new enemyObj("mush1",150, 0);
var giantMush = new enemyObj("giantMush1", 500, 0, true);

function drawEnemy() {
	drawEnemyDir(mush);
	drawEnemyDir(mush1);
	drawEnemyDir(mush2);
	drawEnemyDir(mush3);
	drawEnemyDir(mush4);
	drawEnemyDir(mush5);
	drawEnemyDir(mush6);
	drawEnemyDir(mush7);
	drawEnemyDir(giantMush);
	for (i = 0; i < plantArr.length; i ++) {
		drawEnemyDir(plantArr[i]);
	}
	for (i = 0; i < stumpArr.length; i ++) {
		drawEnemyDir(stumpArr[i]);
	}
}

function drawEnemyDir(obj) {
	if (obj.isAttack == true) {
		if (obj.baseName == "plant" || obj.baseName == "plantShoot" || obj.baseName == "stump") {
			obj.id = obj.baseName + obj.frame;
			obj.setDimen(obj.xpos, obj.ypos);
			obj.draw();
			if (obj.init == false && obj.baseName == "plant" || obj.baseName == "plantShoot") {
				animPlant(obj);
			} else if (obj.init == false && obj.baseName == "stump") {
				animStump(obj);
			}
		} else {
			obj.draw();
			animateMush(obj);
		}
		drawHealth(obj);
	}
	updateEnemy(obj);
}

function updateEnemy(obj) {
	if (obj.isAttack == false) { //spawn setting
		obj.xpos = canvas.width + 60;
		obj.ypos = ground.ypos - obj.height;
	} else {
		checkDistance(obj);
		checkCannonBall(obj);
		checkSawHit(obj);
		checkHealth(obj);
		checkBombHit(obj);
		checkFireHit(obj);
		
		if (obj.type !== "ranged") { //plants are exempt from moving
			obj.velocy += game.gravity * game.dt; //vertical gravity, which is later cancelled out
			if (touchingGround(obj) == true && obj.velocy >= 0) { //if on ground
				obj.velocy = 0;
			}
			
			if (obj.touchingTower == false) {
				if (obj.speed <= obj.speedMax) { //accelerate here
					obj.speed += obj.accel * game.dt;
				}
				obj.xpos -= obj.speed * game.dt * game.timeMultiplier; //horizontal speed
				obj.ypos += obj.velocy * game.dt; //vertical speed
			}
		}
	}
}

function checkDistance(obj) {
	if (obj.xpos - (tower.xpos + tower.width) < -5 && obj.baseName !== "stump") {
		obj.touchingTower = true;
		drawBoo(obj);
		obj.isAttack = false;
		game.health -= obj.damage;
	} else if (obj.xpos - (tower.xpos + tower.width) < -5) {
		obj.speed = -0.4;
		game.health -= obj.damage;
	} else if (obj.xpos >= canvas.width - obj.width) {
		if (obj.accel < 0) {
			obj.accel = 0;
			obj.speed = 0;
			obj.ypos = ground.ypos - obj.height - 5;
		}
	}
}

function checkHealth(obj) {
	if (obj.health <= 0) {
		drawBoo(obj);
		objXpCheck(obj);
		game.xp += obj.xp;
		obj.health = obj.healthMax;
	}
}

function checkCannonBall(obj) {
	var cannonArr = [ball, ball1, ball2, ball3, ball4, ball5, ball6, ball7, ball8];
	var temp4 = 0;
	while (temp4 < cannonArr.length) {
		touchingBall(obj, cannonArr[temp4]);
		temp4++;
	}
	
}

//==============================================ANIMATION========================

function animateMush(obj) {
	if (obj.wait == false && obj.isAttack == true) {
		animMush(obj);
		obj.wait = true;
	}
}

function animMush(obj) {
	if (obj.fCount > 4) {
		obj.fCount = 1;
	}
	if (obj.isBoss == undefined) {
		obj.id = "mush" + obj.fCount;
	} else {
		obj.id = "giantMush" + obj.fCount;
	}
	obj.fCount ++;
	obj.setDimen(obj.xpos, obj.ypos);
	setTimeout(animMush, 100, obj);
}

//======================================ENEMY LAUNCHER===========================

var enemyArr = [mush, mush1, mush2, mush3, mush4, mush5, mush6, mush7];

function whoReady() {
	var county = 0;
	while (county < 8) {
		if (enemyArr[county].isAttack == false) {
			enemyArr[county].health = enemyArr[county].healthMax;
			return enemyArr[county];
			county = 0;
		} else {
			county ++;
		}
	}
	county = 0;
	console.log("nobody ready :( ");
}
