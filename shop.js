var textArea = new gameObj("textArea", 0, 0);
textArea.selected = "default";
var highlight = new gameObj("close", 0, 0); //just gave it a random id to stop errors
var gold = new shopObj("gold", 674, 340);
var close = new shopObj("close", 745, 20);
var purchase = new shopObj("purchase", 690, 454);
var shopScreen = new gameObj("shopScreen", 0, 0);
var itemContain1 = new shopObj("itemContain", 22, 20);
var itemContain2 = new shopObj("itemContain", 372, 20);
var cannonItem = new shopObj("cannonItem", itemContain1.xpos + 15, itemContain1.ypos + 5);
var timeItem = new shopObj("timeItem", itemContain2.xpos + 15, itemContain2.ypos + 5);
var itemContainers = [itemContain1, itemContain2, close];
var shopArr = [cannonItem, timeItem];

var collisionForce = 1; //used in the second state cannon norm shot upgrade
var displayLow = false;

function drawShop() {
	shopScreen.setDimen(0, -3);
	shopScreen.draw();
	textArea.setDimen(0, 375);
	textArea.draw();
	gold.setDimen(gold.xpos, gold.ypos);
	gold.draw();
	ctx.fillText(game.gold, gold.xpos + 70, gold.ypos + 20);
	for (var i = 0; i < itemContainers.length; i ++) {
		drawShopContainer(itemContainers[i]);
	}
	
	for (var i = 0; i < shopArr.length; i ++) {
		shopItemDraw(shopArr[i]);
	}
	drawShopText();
	displayLowMoney();
}

function shopItemDraw(obj) {
	obj.setDimen(obj.xpos, obj.ypos);
	obj.draw();
	ctx.fillStyle = "gold";
	ctx.fillRect(obj.xpos + 72, obj.ypos + 9, (obj.state / 5) * 196, 30); //total WIDTH is 196 pixels
	ctx.fillStyle = "black";
}

function drawShopContainer(obj) {
	obj.setDimen(obj.xpos, obj.ypos);
	obj.draw();
}

function updateItemDir() {
	updateItem(cannonItem);
	updateItem(timeItem);
	updateItem(close);
	updateItem(purchase);
}

function updateItem(obj) {
	if (mouseTouching(obj)) {
		obj.id = obj.baseName + "Hover";
	} else {
		obj.id = obj.baseName;
	}
}

function drawShopText() { //context, text, x, y, maxWidth, lineHeight) 
	drawPurchase();
	ctx.textAlign = "left";
	var message = "";
	var subMessage = "";
	var cost = 0;
	if (textArea.selected == "default") {
		message = "Click on an upgrade icon to see its price and function.";
	} else if (textArea.selected == "cannonItem") { //CANNON DAMAGE UPGRADE
		if (cannonItem.state == 0) {
			message = "Upgrade the cannon balls material from cast iron to steel.  The extra mass is compensated for with an equal amount "
			+ "of additional gunpowder added to the barrel.  Upon a collision with an enemy, the upgraded cannon ball will hit with " 
			+ "a deadly amount of force.  NORMAL CANNON SHOT DAMAGE INCREASED BY 15%";
			cost = 10;
		} else if (cannonItem.state == 1) {
			message = "The second upgrade utilizes the rare earth element, vibranium imported from Africa.  The steel cannon balls will be replaced with "
			+ "this rare material.  Vibranium density increases as it gains kinetic "
			+ "energy.  Once it hits any enemy, it will cause extreme damage.  NORMAL CANNON SHOT DAMAGE INCREASED BY 25%";
			cost = 100;
		} else if (cannonItem.state == 2) {
			message = "The third upgrade introduces a vibranium-titanium alloy to the composition of each "
			+ "ball, which increases momentum causing the enemy it collides with the be pushed back farther, with an increased damage bonus.  "   
			+ "NORMAL CANNON SHOT DAMAGE INCREASED BY 25% AND COLLISION FORCE INCREASED BY 50%";
			cost = 200;
		} 
		subMessage = "CURRENT DAMAGE: " + Math.round(game.normalShotDamage);
	} else if (textArea.selected == "timeItem") { //SLOW TIME DURATION UPGRADE
		if (timeItem.state == 0) {
			message = "Time is money, and it turns out you can actually buy time.  For the low price listed below, you can slow the passing "
			+ "of time by giving us your money from fallen enemies.  TIME ABILITY DURATION INCREASED BY 20%";
			cost = 50;
		} else if (timeItem.state == 1) {
			message = "Recent advances in Time Lord technology and our engineers ability to integrate the tech into the slow time ability "
			+ "allows for better manipulation the time continuum.  TIME ABILITY DURATION INCREASED BY 30%";
			cost = 250;
		}
		subMessage = "CURRENT DURATION: " + Math.round(game.slowTimeDuration / 1000) + " seconds";
	}
	wrapText(ctx, message, textArea.xpos + game.margin + 10, textArea.ypos + (game.margin * 2.5), textArea.width - game.margin - 50, 20);
	wrapText(ctx, "COST: " + cost + "     |     " + subMessage, textArea.xpos + game.margin + 10, textArea.ypos + textArea.height - (game.margin * 2.5), textArea.width - game.margin - 50, 20);
}

function drawPurchase() {
	if (textArea.selected !== "default") {
		purchase.setDimen(purchase.xpos, purchase.ypos);
		purchase.draw();
	}
}

function checkPurchase() {
	if (textArea.selected == "cannonItem") {
		if (cannonItem.state == 0 && game.gold >= 10) {
			upState(cannonItem);
			increaseCannonDamage(15);
			game.gold -= 10;
		} else if (cannonItem.state == 1 && game.gold >= 100) {
			upState(cannonItem);
			increaseCannonDamage(25)
			game.gold -= 100;
		} else if (cannonItem.state == 2 && game.gold >= 200) {
			upState(cannonItem);
			increaseCannonDamage(25);
			game.gold -= 200;
			collisionForce = 1.5;
		} else { //if you dont have the money
			displayLow = true;
			setTimeout(function(){displayLow = false;}, 1000);
		}
	} else if (textArea.selected == "timeItem") {
		if (timeItem.state == 0 && game.gold >= 50) {
			upState(timeItem);
			game.gold -= 50;
			game.slowTimeDuration += 0.20 * game.slowTimeDuration;
		} else if (timeItem.state == 1 && game.gold >= 250) {
			upState(timeItem);
			game.gold -= 250;
			game.slowTimeDuration += 0.3 * game.slowTimeDuration;
		} else { //if you dont have the money
			displayLow = true;
			setTimeout(function(){displayLow = false;}, 1000);
		}
	}
}

function upState(obj) {
	if (obj.state < 5) {
		obj.state += 1;
		playPurchaseSound();
	}
}

function displayLowMoney() {
	if (displayLow == true) {
		ctx.fillStyle = "red";
		ctx.fillText("You Require More Gold", purchase.xpos - 160, purchase.ypos + 20);
		ctx.fillStyle = "black";
	}
}

function increaseCannonDamage(percent) {
	game.normalShotDamage += game.normalShotDamage * (percent / 100);
}