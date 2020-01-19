var stump1 = new enemyObj("stump", 0, 0);
var stump2 = new enemyObj("stump", 0, 0);
var stump3 = new enemyObj("stump", 0, 0);
var stump4 = new enemyObj("stump", 0, 0);
var stump5 = new enemyObj("stump", 0, 0);
var stumpArr = [stump1, stump2, stump3, stump4, stump5];

function placeStump(obj) {
	stumpDefaults(obj);
	obj.isAttack = true;
	obj.xpos = 820;
	obj.ypos = 230
}

function animStump(obj) {
	obj.init = true;
	if (obj.frame < 4) {
		obj.id = obj.baseName + obj.frame;
		obj.frame ++;
	} else if (obj.frame == 4) {
		obj.frame = 1;
		obj.id = obj.baseName + obj.frame;
	}
	setTimeout(animStump, 130, obj);
}

function stumpDefaults(obj) {
	obj.speedMax = 0.04;
	obj.healthMax = 1000;
	obj.health = 1000;
	obj.accel = 0.0009;
	obj.damage = 5;
	obj.xp = 25;
}

function findStump(obj) {
	for (i = 0; i < stumpArr.length; i ++) {
		if (stumpArr[i].isAttack == false) {
			placeStump(stumpArr[i]);
			break;
		}
	}
}