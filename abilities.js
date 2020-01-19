var clockEffect = new effectObj("clock",0 ,0);
clockEffect.setDimen(canvas.width, 100);

function abilitySlowTime() {
	game.timeMultiplier = 0.5;
	clockEffect.setDimen(); //gives access to the width components
	clockEffect.setDimen((canvas.width / 2) - (clockEffect.width / 2),50);
	clockEffect.visible = true;
	setTimeout(endSlowTime, game.slowTimeDuration);
}

function endSlowTime() {
	clockEffect.visible = false;
	game.timeMultiplier = 1;
}

function endPowerShot() {
	game.speedMultiplier = 1;
	game.gravity = 0.002;
}