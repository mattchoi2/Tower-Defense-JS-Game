
function launchEnemies() {
	if (game.tutorialStep < 0 && game.roundTrans == false && game.round == 1 && game.checkReady == false) { 
		//tutorial and round transistion is over
		if (game.roundInit == false) { //only runs through the initial script once
			setTimeout(timeLauncherR1, 2000);
			game.roundInit = true;
		}
	} else if (game.round == 1 && game.checkReady == true) {
		if (game.roundInit == true) { //the initializer for the "checkReady" point at the end of a round
			game.roundInit = false;
			game.gold += game.totalGold;
		}
	}
}

function timeLauncherR2() {
	game.roundStep ++;
	if (game.roundStep == 1 || game.roundStep == 2 || game.roundStep == 3 || game.roundStep == 4) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR2, 500);
	} else if (game.roundStep == 5 || game.roundStep == 6) {
		findPlant();
		setTimeout(timeLauncherR2, 200);
	} else if (game.roundStep == 7 || game.roundStep == 8 || game.roundStep == 9) {
		findPlant();
		whoReady.isAttack = true;
		setTimeout(timeLauncherR2, 500);
	} else if (game.roundStep == 10 || game.roundStep == 11) {
		findStump();
		setTimeout(timeLauncherR2, 2500);
	}
}

function timeLauncherR1() {
	game.roundStep ++;
	if (game.roundStep == 1) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 500);
	} else if (game.roundStep == 2) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 3000);
	} else if (game.roundStep == 3) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 500);
	} else if (game.roundStep == 4) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 3000);
	} else if (game.roundStep == 5) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 500);
	} else if (game.roundStep == 6) {
		whoReady().isAttack = true;
		findPlant();
		setTimeout(timeLauncherR1, 500);
	} else if (game.roundStep == 7) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 3000);
	} else if (game.roundStep == 8 || game.roundStep == 9 || game.roundStep == 10) {
		whoReady().isAttack = true;
		setTimeout(timeLauncherR1, 1000);
	} else if (game.roundStep == 11) {
		giantMush.isAttack = true;
		giantMush.health = 2000;
		giantMush.healthMax = 2000;
		giantMush.damage = 50;
		giantMush.xp = 100;
		endRound();
	}
}

function endRound() { //resets the game variables after each round
	if (game.isReady == true) { //clicked the nextRound button
		game.roundStep = 0;
		game.roundInit = false;
		game.roundTrans = true;
		game.isReady = false;
		wait = false;
		resume = false;
		launchEnemies();
	} else if (doesAnythingLive() == false) {
		setTimeout(endRound, 1000 / game.fps);
		game.checkReady = true; //draws round summary box when true, we are still waiting for them to click the next round button (makes game.isReady = true)
	} else if (doesAnythingLive() == true) {
		setTimeout(endRound, 1000 / game.fps);
	}
}

function doesAnythingLive() {
	var doesIt = false;
	for (i = 0; i < allEnemy.length; i ++) { //USES ALL ENEMIES LOCATED AT THE VERY END OF THE CODE, NEEDED BECAUSE ALL VARIABLES MUST INITIALIZE BEFORE ARRAYING
		if (allEnemy[i].isAttack) {
			doesIt = true;
		}
	}
	if (doesIt == false) {
		return false;
	} else if (doesIt) {
		return true;
	}
}