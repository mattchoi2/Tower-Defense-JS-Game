function levelCheck() {
	if (game.xp >= game.nextLevelXp) {
		game.level ++;
		game.xp = game.xp - game.nextLevelXp;
		levelAnim();
		nextLevelXp();
	}
}

function nextLevelXp() {
	if (game.level == 2) {
		game.nextLevelXp = 200;
	} else if(game.level == 3) {
		game.nextLevelXp = 500;
	} else if (game.level == 4) {
		game.nextLevelXp = 1000;
	}
}

function levelAnim() {
	firework1.xpos = 200;
	firework1.ypos = 280;
	firework1.onScreen = true;
	
	firework2.xpos = 500;
	firework2.ypos = 280;
	firework2.onScreen = true;
}

function updateFireworks(obj) {
	if (obj.onScreen && obj.ypos > 150) {
		obj.ypos -= 0.1 * game.dt;
	} else if (obj.onScreen && obj.counter == 1) {
		explodeFireworks(obj);
		levelUpTextAnim();
	}
	function explodeFireworks(obj) {
		if (obj.counter < 6) {
			obj.id = "firework" + obj.counter;
			obj.counter ++;
			setTimeout(explodeFireworks, 4000 / game.fps, obj);
		} else {
			obj.onScreen = false;
			obj.counter = 1;
			obj.id = "firework";
		}
	}
}

var levelUpText = new xpObj("LEVEL UP");
levelUpText.xpos = canvas.width / 2;
levelUpText.ypos = 200;

function levelUpTextAnim() {
	 levelUpText.onScreen = true;
	 setTimeout(fadeXp, 1000, levelUpText);
}