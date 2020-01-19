var UI = new gameObj("UI", 0, 0);
var normalShot = new cardObj("normalShot", 0, 0, 0, "normalShot");
var bombShot = new cardObj("bombShot", 0, 0, 0, "bombShot");
var fireShot = new cardObj("fireShot", 0, 0, 0, "fireShot");
var sawShot = new cardObj("sawShot", 0, 0, 0, "sawShot");
var tripleShot = new cardObj("tripleShot", 0, 0, 0, "tripleShot");
var slowTime = new cardObj("slowTime", 0, 0, 1000);
var powerShot = new cardObj("powerShot", 0, 0, 1000);
var textBox = new gameObj("textBox", 0, 0);
var textBoxRound = new gameObj("textBoxRound", 0, 0);
var next = new buttonObj("next", 0, 0);
var shop = new buttonObj("shop", 0, 0);
var town = new buttonObj("town", 0, 0);
var skip = new buttonObj("skip", 0, 0);
var nextRound = new buttonObj("nextRound", 0, 0);
var levelBox = new gameObj("levelBox", 0, 0);
var mute = new shopObj("noSound", 0, 0); //needed the base name constructor for its double states

function drawUI() {
	if (game.townMode == false) {
		mute.setDimen(770, 10);
		mute.draw();
		UI.setDimen(0, 360);
		UI.draw();
		normalShot.setDimen(15, 385);
		normalShot.draw();
		fireShot.setDimen(215, 385);
		fireShot.draw();
		tripleShot.setDimen(65, 385);
		tripleShot.draw();
		slowTime.setDimen(308, 385);
		slowTime.draw();
		powerShot.setDimen(358, 385);
		powerShot.draw();
		sawShot.setDimen(165, 385);
		sawShot.draw();
		bombShot.setDimen(115, 385);
		bombShot.draw();
		if (game.checkReady == true && game.shopMode == false) {
			nextRound.setDimen(60, 50);
			nextRound.draw();
		} else {
			nextRound.ypos = -100;
		}
		levelBox.setDimen(0,0);
		levelBox.draw();
		drawCoolDown(slowTime);
		drawCoolDown(powerShot);
		drawUIText();
		drawXpBar();
		if (game.checkReady == true && game.shopMode == false) {
			shop.setDimen(595,370);
			shop.draw();
			town.setDimen(595, 400);
			town.draw();
		}
		if (game.shopMode == true) {
			drawShop();
		}
	} else {
		drawTownUI();
	}
}

function drawUIText() {
	ctx.font = "15px Arial";
	ctx.textAlign = "left";
	ctx.fillText("Level " + game.level, 28,24);
	ctx.textAlign = "center";
	ctx.fillStyle = "black";
	
	ctx.fillText(game.round, 750,438);
	ctx.fillText(game.gold, 750,388);
	ctx.fillText(game.health, 750,413);
	ctx.fillText(game.normAmmo, 37,453);
	ctx.fillText(game.tripleAmmo, 87,453);
	ctx.fillText(game.sawAmmo, 187,453);
	ctx.fillText(game.fireAmmo, 237,453);
	ctx.fillText(game.bombAmmo, 137,453);
	if (normalShot.active == true) {
		ctx.fillText(game.normAmmo, 750,463);
	} else if (tripleShot.active == true) {
		ctx.fillText(game.tripleAmmo, 750,463);
	} else if (sawShot.active == true) {
		ctx.fillText(game.sawAmmo, 750,463);
	} else if (bombShot.active == true) {
		ctx.fillText(game.bombAmmo, 750,463);
	} else if (fireShot.active == true) {
		ctx.fillText(game.fireAmmo, 750, 463);
	}
	if (game.checkReady == true && game.shopMode == false) { //round summary
		roundSummaryDraw();
	} else if (game.tutorialStep >= 0) { //tutorial
			textBoxDraw();
			next.setDimen(textBox.xpos + textBox.width - game.margin - skip.width, textBox.ypos + textBox.height - skip.height - game.margin);
			skip.setDimen(textBox.xpos + textBox.width - game.margin - (skip.width * 2.1), textBox.ypos + textBox.height - skip.height - game.margin);
			next.draw();
			skip.draw();
	} else {
		textBox.setDimen(canvas.width, canvas.height); //to prevent the mouse from clicking it
	}
	
	if (game.roundTrans == true) {
		roundAnim();
	}
}

function hoverControls(obj) {
	if (mouseTouching(obj)) {
		obj.id = obj.baseName + "Hover";
	} else if (obj.active) {
		obj.id = obj.baseName + "Active";
	} else {			
		obj.id = obj.baseName;
	}
}

function simpleHoverControls(obj) {
	var str = obj.id;
	if (mouseTouching(obj)) {
		obj.id = str.replace("Hover", ""); //it will infinitely concatenate unless replaced to a base state
		obj.id = obj.id + "Hover";
	} else {
		obj.id = str.replace("Hover", ""); //removes the "Hover" keyword if it exists
	}
}

function updateUI() {
	if (game.townMode == false) {
		hoverControls(sawShot);
		hoverControls(normalShot);
		hoverControls(tripleShot);
		hoverControls(bombShot);
		hoverControls(fireShot);
		
		simpleHoverControls(slowTime);
		simpleHoverControls(powerShot);
		simpleHoverControls(skip);
		simpleHoverControls(next);
		simpleHoverControls(nextRound);
		simpleHoverControls(shop);
		simpleHoverControls(town);
		
		checkCoolDown(slowTime);
		checkCoolDown(powerShot);
	} else {
		updateTown();
	}
}

function mouseTouching(obj1) {
	if (obj1 !== undefined) {
		if (game.mousex >= obj1.xpos && game.mousex <= obj1.xpos + obj1.width
		&& game.mousey >= obj1.ypos && game.mousey <= obj1.ypos + obj1.height) {
			return true;
		} else {
			return false;
		}
	}
}

function textBoxDraw() {
	textBox.setDimen(300, 40);
	textBox.draw();
	ctx.textAlign = "left";
	var message = tutorialSteps();
	wrapText(ctx, message, textBox.xpos + game.margin, textBox.ypos +(game.margin * 2.5), textBox.width - game.margin, 20);
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
	var words = text.split(' ');
    var line = '';

    for(var n = 0; n < words.length; n++) {
    	var testLine = line + words[n] + ' ';
        var metrics = context.measureText(testLine);
        var testWidth = metrics.width;
        if (testWidth > maxWidth && n > 0) {
        	context.fillText(line, x, y);
            line = words[n] + ' ';
            y += lineHeight;
        }
        else {
            line = testLine;
        }
    }
    context.fillText(line, x, y);
}

function tutorialSteps() {
	if (game.tutorialStep == 0) {
		return "Tutorial: The cannon constantly turn towards your mouse cursor.  The bottom of the screen contains the UI " +
		"where you can select your ammo type.  You can only have one ammo type active at one time.  The ammo for each ammo type is shown " +
		"inside its respective card.  The ability cards are to the right of the ammo section.  These cards have a cooldown time period, so " +
		"use them sparingly.";
	}
}

var tempFontSize = 12;
var alpha = 1.0;
var wait = false; //while false, the next round text is NOT fading out
var resume = false; //while true, the text is still fading out
function roundAnim() {
	if (wait == false) {
		setTimeout(fadeOut, 2500);
		wait = true;
	} else if (resume == true) {
		fadeOut();
	}
	tempFontSize += .01 * game.dt;
	ctx.font = tempFontSize + "px Arial";
	ctx.fillStyle = "rgba(0, 0, 0, " + alpha + ")";
	ctx.fillText("Round " + game.round, canvas.width / 2,canvas.height / 2 - 80);
	ctx.fillStyle = "rgba(0, 0, 0, 1)";
}

function fadeOut() {
	resume = true;
	if (alpha > 0) {
		alpha -= 0.01 * game.dt;
	} else {
		game.roundTrans = false;
		wait = false;
		resume = false;
		alpha = 1;
		tempFontSize = 12;
	}
}

function checkCoolDown(obj) {
	if (obj.coolDown > 0) {
		obj.coolDown -= 1;
	}
}

function roundSummaryDraw() {
	textBoxRound.setDimen(300, 40);
	textBoxRound.draw();
	ctx.textAlign = "center";
	ctx.font = "25px Arial";
	ctx.fillText(game.shotCount, textBoxRound.xpos + 225, textBoxRound.ypos + 90);
	if (game.round == 1) {
		eachRoundSummaryText(game.shotCount, game.shotHits);
	}
}

function eachRoundSummaryText(actual, perfect) {
	ctx.fillText(perfect, textBoxRound.xpos + 225, textBoxRound.ypos + 55);
	var temp = perfect / actual;
	ctx.fillText(temp.toFixed(2), textBoxRound.xpos + 325, textBoxRound.ypos + 70);
	var base = game.round * 10;
	ctx.fillText(base, textBoxRound.xpos + 172, textBoxRound.ypos + 156);
	var total = base * (perfect / actual);
	ctx.fillText(temp.toFixed(2), textBoxRound.xpos + 245, textBoxRound.ypos + 156);
	ctx.fillText(game.level, textBoxRound.xpos + 172, textBoxRound.ypos + 198);
	ctx.fillText(Math.round(total), textBoxRound.xpos + 245, textBoxRound.ypos + 198);
	ctx.fillText(Math.round(total), textBoxRound.xpos + 325, textBoxRound.ypos + 156);
	ctx.fillStyle = "green";
	ctx.fillText(Math.round(total) * game.level, textBoxRound.xpos + 325, textBoxRound.ypos + 198);
	ctx.fillStyle = "black";
	total = Math.round(total) * game.level;
	game.totalGold += total;
}