  
  window.addEventListener("keydown", function(event) {
	if (event.keyCode == 189) { //debugging key, "-" (dash)
		game.tutorialStep = -1;
		endRound();
	}
  }, false);
  
canvas.addEventListener('mousemove', function(event) { //if mouse moved it calculates position
	mouseCoords(event);
}, false);

canvas.addEventListener('mouseup', function(event) { //if mouse moved it calculates position
	game.mouseDown = false;
}, false);

canvas.addEventListener('mousedown', function(event) {
	game.mouseDown = true;
	if (game.mousey < UI.ypos && mouseTouching(textBox) == false && mouseTouching(nextRound) == false && game.checkReady == false && game.shopMode == false && mouseTouching(mute) == false && game.townMode == false) { //if mouse is on the screen
		if (bomb1.onScreen == false && bomb2.onScreen == false && bomb3.onScreen == false) {
			game.shotCount ++; //every time an ammo type is shot
			if (game.normAmmo > 0 && normalShot.active == true) { 
				drawBoom();
				game.normAmmo --;
				soundCannon();
				if (ball.onScreen == false) { //runs through all available cannon balls, else it will wait
					fireBall(ball);
				} else if (ball1.onScreen == false) {
					fireBall(ball1);
				} else if (ball2.onScreen == false) {
					fireBall(ball2);
				} else if (ball3.onScreen == false) {
					fireBall(ball3);
				} else if (ball4.onScreen == false) {
					fireBall(ball4);
				} else if (ball5.onScreen == false) {
					fireBall(ball5);
				} else if (ball6.onScreen == false) {
					fireBall(ball6);
				} else if (ball7.onScreen == false) {
					fireBall(ball7);
				} else if (ball8.onScreen == false) {
					fireBall(ball8);
				}
			} else if ( game.tripleAmmo > 0 && tripleShot.active == true) {
				tripleCheck();
			} else if (game.sawAmmo > 0 && sawShot.active) {
				sawCheck();
			} else if (game.bombAmmo > 0 && bombShot.active) {
				bombCheck();
			} else if (game.fireAmmo > 0 && fireShot.active && game.fireShotLimit == false) {
				fireCheck();
			}
		} else {
			bombExplode();
		}
	} else if (mouseTouching(UI) && game.townMode == false) { //if mouse in the UI
		checkActive(normalShot);
		checkActive(tripleShot);
		checkActive(slowTime);
		checkActive(powerShot);
		checkActive(sawShot);
		checkActive(bombShot);
		checkActive(fireShot);
		if (mouseTouching(shop) && game.checkReady == true) {
			game.shopMode = true;
		}  else if (mouseTouching(purchase)) { //not worth the effort to move UI to end text box
			checkPurchase();
		} else if (mouseTouching(town)) {
			game.townMode = true;
		}
	} else if (mouseTouching(skip)) { //tutorial skip button
		game.tutorialStep = -1;
		game.roundTrans = true;
	} else if (mouseTouching(nextRound)) { //next round button
		game.round ++;
		game.isReady = true;
		game.checkReady = false;
		if (game.round == 2) {
			setTimeout(timeLauncherR2, 2000);
		}
	} else if (game.shopMode) {
		if (mouseTouching(close)) {
			game.shopMode = false;
			textArea.selected = "default";
		} else if (mouseTouching(cannonItem)) {
			textArea.selected = "cannonItem";
		} else if (mouseTouching(timeItem)) {
			textArea.selected = "timeItem";
		}
	} else if (mouseTouching(mute)) {
		if (mute.id == "sound") {
			mute.id = "noSound";
			muteAll();
		} else if (mute.id == "noSound") {
			mute.id = "sound";
			unmuteAll();
		}
	} else if (mouseTouching(close)) {
		game.townMode = false;
	} else if (game.townMode) {
		if (mouseTouching(townUI)) {
			if (mouseTouching(farm)) {
				farm.active = true;
			} else if (mouseTouching(purchase2)) {
				if (cardSelected()) {
					game.placeMode = true;
				}
			}
		} else {
			if (mouseInGrid == false) {
				deselectAll();
			} else if (mouseInGrid) {
				
			}
		}
	}
}, false);

function checkActive(obj) {
	if (mouseTouching(obj) && game.mousex <= 300) { //300 pixels is the border between ammo and abilities
		resetActive();
		obj.active = true;
	} else if (mouseTouching(obj) && game.mousex > 300 && obj.coolDown <= 0) {
		obj.coolDown = obj.coolDownTime;
		if (obj.id == "slowTime" || obj.id == "slowTimeHover") {
			abilitySlowTime();
			countDownDuration = game.slowTimeDuration;
			countDownCard = slowTime;
		} else if (obj.id == "powerShot" || obj.id == "powerShotHover") {
			game.gravity = 0;
			game.speedMultiplier = 1.5;
			setTimeout(endPowerShot, game.powerShotDuration);
			countDownDuration2 = game.powerShotDuration;
			countDownCard2 = powerShot;
		}
	}
}

function resetActive() {
	normalShot.active = false;
	tripleShot.active = false;
	sawShot.active = false;
	bombShot.active = false;
	fireShot.active = false;
}

var triple = []; //must be outside the function to avoid being reset
var tripleCount = 0; //counter for a recursive-array loop

function tripleCheck() {
	drawBoom();
	game.tripleAmmo --;

	checkTriple(ball); //basically only two triple shots on the screen at once (2 x 3 = 6)
	checkTriple(ball1);
	checkTriple(ball2);
	checkTriple(ball3);
	checkTriple(ball4);
	checkTriple(ball5);
	checkTriple(ball6);
	checkTriple(ball7);
	checkTriple(ball8);
	if (triple.length == 3) {
		fireTripleBall(triple[0], triple[1], triple[2]); //sends all three balls as seperate objects in parameters
		triple = [];
		tripleCount = 0;
	}
}

function checkTriple(obj) {
		if (obj.onScreen == false && triple.length < 3) {
			triple[tripleCount] = obj;
			tripleCount ++;
		} 
}
