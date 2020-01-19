function animPlant(obj) {
	obj.init = true;
	if (obj.frame < 6 && obj.isAttack && obj.isFiring == false) {
		obj.frame ++;
		setTimeout(animPlant, 80 / game.timeMultiplier, obj);
	} else if (obj.frame == 6 && obj.isAttack && obj.isFiring == false) {
		obj.frame ++;
		setTimeout(animPlant, 500 / game.timeMultiplier, obj);
	} else if (obj.frame == 7 && obj.isAttack && obj.isFiring == false) {
		obj.frame --;
		setTimeout(animPlant, 500 / game.timeMultiplier, obj);
	}
}

var plant1 = new enemyObj("plant", 0, 0, false, "ranged");
var plant2 = new enemyObj("plant", 0, 0, false, "ranged");
var plant3 = new enemyObj("plant", 0, 0, false, "ranged");
var plant4 = new enemyObj("plant", 0, 0, false, "ranged");
var plant5 = new enemyObj("plant", 0, 0, false, "ranged");
var plantArr = [plant1, plant2, plant3, plant4, plant5];
var poison1 = new effectObj("poison1", 0, 100, "poison");
var poison2 = new effectObj("poison1", 0, 100, "poison");
var poison3 = new effectObj("poison1", 0, 100, "poison");
var poison4 = new effectObj("poison1", 0, 100, "poison");
var poison5 = new effectObj("poison1", 0, 100, "poison");

function drawPoison() {
	drawPoisonDir(poison1);
	drawPoisonDir(poison2);
	drawPoisonDir(poison3);
	drawPoisonDir(poison4);
	drawPoisonDir(poison5);
	function drawPoisonDir(obj) {
		if (obj.onScreen) {
			if (obj.temp2 == 1) {
				updatePoison(obj);
				obj.temp2 ++;
			}
			obj.setDimen(obj.xpos, obj.ypos);
			obj.draw();
			movePoison(obj);
		}
	}
}

function updatePoison(obj) {
	if (obj.frame < 4) {
		obj.id = obj.base + obj.frame;
		obj.frame ++;
		setTimeout(updatePoison, 100, obj);
	} else if (obj.frame == 4) {
		setTimeout(backAnim, 100, obj);
	}
	function backAnim(obj) {
		if (obj.frame > 1) {
			obj.id = obj.base + obj.frame;
			obj.frame --;
			setTimeout(backAnim, 100, obj);
		} else if (obj.frame == 1) {
			setTimeout(updatePoison, 100, obj);
		}
	}
}

function findPlant() {
	for (i = 0; i < plantArr.length; i ++) {
		if (plantArr[i].isAttack == false) {
			plantPlace(plantArr[i]);
			break;
		}
	}
}

function plantPlace(obj) {
	plantDefaults(obj);
	obj.isAttack = true;
	var lowest = tower.xpos + tower.width + 100;
	var highest = canvas.width - obj.width - 100;
	obj.xpos = Math.floor((Math.random() * (highest - lowest)) + lowest);
	obj.ypos = ground.ypos - 48;
	setTimeout(function(){plantFire(obj);}, 3000); //fancy bit of code, function is declared and executed as a parameter, saves space
}

function plantFire(obj) {
	obj.isFiring = true;
	obj.baseName = "plantShoot";
	obj.frame = 1;
	setTimeout(inPlantFire, 100, obj);
	function inPlantFire(obj) {
		if (obj.frame < 5 && obj.isAttack) {
			obj.frame ++;
			setTimeout(inPlantFire, 100 / game.timeMultiplier, obj);
			if (obj.frame == 4) {
				launchPoison(obj);
			}
		} else if (obj.frame == 5 && obj.isAttack) {
			setTimeout(backPlantFire, 100, obj);
		}
	}
	function backPlantFire(obj) {
		if (obj.frame > 4 && obj.isAttack) {
			obj.frame --;
			setTimeout(backPlantFire, 100 / game.timeMultiplier, obj);
		} else if (obj.frame == 4 && obj.isAttack) {
			obj.baseName = "plant";
			obj.frame = 6;
			obj.isFiring = false;
			animPlant(obj);
			setTimeout(plantFire, 4000, obj); //how long the plant should wait before firing again (4 seconds)
		}
	}
}

var poisonArr = [poison1, poison2, poison3, poison4, poison5];
function launchPoison(obj) {
	obj.fCount = 0;
	while (obj.fCount < poisonArr.length) {
		if (poisonArr[obj.fCount].onScreen == false) {
			poisonArr[obj.fCount].onScreen = true;
			poisonArr[obj.fCount].setDimen(0, 0); //allows access to width and height object states
			poisonArr[obj.fCount].xpos = obj.xpos - (poisonArr[obj.fCount].width / 2);
			poisonArr[obj.fCount].ypos = obj.ypos;
			break;
		} else {obj.fCount ++;}
	}
}

function movePoison(obj) {
	obj.xpos -= 0.5 * game.dt * game.timeMultiplier; //manipulate poison speed here
	if (obj.xpos < tower.xpos + tower.width - 20) {
		obj.onScreen = false;
		plantDefaults(obj);
		game.health -= 5;
	}
}

function plantDefaults(obj) {
	obj.init = false; //used in resetting the grow animation for plant
	obj.isFiring = false;
	obj.frame = 1;
	obj.baseName = "plant";
	obj.damage = 5;
	obj.health = 150;
	obj.healthMax = 150;
	obj.xp = 20;
}

var allEnemy = [mush, mush1, mush2, mush3, mush4, mush5, mush6, mush7, plant1, plant2, plant3, plant4, plant5, giantMush]; //all the enemies