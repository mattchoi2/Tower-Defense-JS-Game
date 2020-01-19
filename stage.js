var sky = new gameObj("sky");

var ground = new collisionObj("grass", 0, 320);
var tower = new collisionObj("tower", 65, 75);

var townBackground = new gameObj("townBackground");

function drawStage() {
	if (game.townMode == false) {
		sky.draw();
		ground.draw();
		tower.draw();
	} else {
		townBackground.draw();
	}
}

function touchingGround(obj) {
	if (obj.xpos < ground.xpos + ground.width  && obj.xpos + obj.width  > ground.xpos &&
		obj.ypos < ground.ypos + ground.height && obj.ypos + obj.height > ground.ypos) {
		return true;
	} else {
		return false;
	}
}

function touchingBall(obj1, obj2) { //the enemy object = obj1   cannon object = obj2
	if (obj1.xpos < obj2.xpos + obj2.width  && obj1.xpos + obj1.width  > obj2.xpos &&
		obj1.ypos < obj2.ypos + obj2.height && obj1.ypos + obj1.height > obj2.ypos) {
		if (obj1.hitArr[obj2.num] == "") {
			obj1.health -= game.normalShotDamage;
			game.shotHits ++;
			obj2.damage = 0;
			setTimeout(resetHits, 80, obj1, obj2);
		}
		obj1.hitArr[obj2.num] = "hit";
		obj2.velocx = -0.4;
		if (obj1.baseName !== "stump") {
			obj1.speed = -0.1 * collisionForce;
		}
	}
}

function checkTowerHealth() {
	if (game.health <= 0) {
		if (tower.deathAnim == false) {
			tower.deathAnim = true;
			setTimeout(endGame, 5000);
		}
		spin(tower);
		tower.ypos -= 0.05 * game.dt;
		cannon.ypos -= 0.05 * game.dt;
	}
}

function endGame() {
	ctx.textAlign = "center";
	ctx.font = "50px Arial";
	ctx.fillText("YOU ARE NOW ALONE", canvas.width / 2, canvas.height / 2);
	clearInterval(xInterval);
	clearInterval(game.run);
}	

tower.angle = 0;
tower.angleSpeed = 0.1;
tower.deathAnim = false;