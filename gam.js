var game = { //establishes and sets up constructor for game
	fps: 60,
	mousex:0,
	mousey:0,
	timeMultiplier:1,
	slowTimeDuration: 5000,
	powerShotDuration: 5000,
	
	draw: function() {
		game.clear();
		drawStage();
		cannonTurn();
		drawEnemy();
		drawBall();
		sawDir();
		bombDir();
		drawFire();
		drawUI();
		drawEffects();
		drawXp();
	},
	
	update: function() {
		checkTowerHealth();
		getAngle(cannon);
		ballPhysicsDir();
		updateUI();
		launchEnemies();
		sawUpdate();
		levelCheck();
		updateEffects();
		fireDir();
		updateItemDir();
		countDownUpdate();
		updateTown();
	},
	
	run: function() {
		game.draw();
		game.update();
	},
	
	clear: function() {
		ctx.clearRect(0,0, canvas.width, canvas.height);
	}
}

game.dt = 1000 / game.fps;
game.gravity = 0.002;
game.round = 1;
game.health = 100;
game.gold = 0;
game.normAmmo = 100;
game.bombAmmo = 5;
game.tripleAmmo = 10;
game.sawAmmo = 1;
game.fireAmmo = 5;
game.margin = 12; //used in UI.js for the textBox object
game.tutorialStep = 0; //used in the initial tutorial
game.roundTrans = false;
game.roundInit = false;
game.roundStep = 1;
game.isReady = false;
game.checkReady = false; //the round summary page displays when true
game.shotCount = 0; //accuracy rating at round summary
game.shotHits = 0;
game.totalGold = 0;
game.xp = 0;
game.nextLevelXp = 100;
game.level = 1;
game.fireShotLimit = false; //used in limiting the fires you can have
game.speedMultiplier = 1; //used in powerShot ability
game.shopMode = false; //guess what this one is for
game.normalShotDamage = 50;
game.townMode = false;
game.placeMode = false;
game.mouseDown = false; //used in town building placement

function start() {
	xInterval = setInterval(game.run, 1000 / game.fps);
	normalShot.active = true; //starting ammo type
}

window.onload = function() { //temporary loading system, check resource.js for alternative
	start();
}
