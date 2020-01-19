
var boom = new effectObj("", 0,0);
var temp = 1; //used in the cannon blast animation (boomAnim())

function drawBoom() {
	function boomAnim() {
		if (temp < 18) {
			boom.id = "boom" + temp;
			temp += 2;
			boom.setDimen(boom.xpos,boom.ypos);
			setTimeout(boomAnim, 35);
		} else {
			boom.id = "";
			temp = 1;
			cannon.isFire = false;
		}
	}
	boomAnim();
}

function drawEffects() {
	if (boom.id !== "") {
		boom.setDimen(cannon.xpos - 15, cannon.ypos - 80);
		ctx.save();
		ctx.translate(boom.xpos + (boom.width / 2), boom.ypos + boom.height - 9); //sets to pivot point when rotating canvas
		ctx.rotate(cannon.angle + (3.14 / 2)); //adds 90 degrees ( 1/2 pi on the unit circle)
		ctx.translate(-(boom.xpos + (boom.width / 2)), -boom.ypos - boom.height + 9);
		boom.ypos = boom.ypos - 50;
		boom.draw();
		ctx.restore();
	}
	validateId(boo);
	validateId(boo2);
	validateId(boo3);
	validateId(boo4);
	validateId(bombBoom);
	validateId(bombBoom2);
	validateId(bombBoom3);
	validateId(bombBoom4);
	function validateId(obj) {
		if (obj.id !== "") {
			obj.draw();
		}
	}
	drawClockEffect(clockEffect);
	drawFirework(firework1);
	drawFirework(firework2);
	drawPoison();
	countDown();
}

var temp2 = 1; //used in the second explosion animation
var boo = new effectObj("", 0, 0);
var boo2 = new effectObj("", 0, 0);
var boo3 = new effectObj("", 0, 0);
var boo4 = new effectObj("", 0, 0);
var boo5 = new effectObj("", 0, 0);
var boo6 = new effectObj("", 0, 0);
var booArr = [boo, boo2, boo3, boo4, boo5, boo6];

function drawBoo(obj) {
	var tem = 0;
	while (tem < 5) {
		if (booArr[tem].id == "") { //if not on screen and ready to be used
			if (obj.touchingTower == true) {
				booAnim(obj, booArr[tem]);
				obj.touchingTower = false;
				break;
			} else if (obj.isAttack == true) {
				booAnim(obj, booArr[tem]);
				obj.isAttack = false;
				break;
			}
		} else { //if not available to be used
			tem ++;
		}
	}
	function booAnim(obj, obj2) {
		if (obj2.temp2 < 2) {
			obj2.id = "boo" + obj2.temp2;
			obj2.setDimen(obj.xpos + (obj.width / 2) - (obj2.width / 2), obj.ypos + (obj.height / 2) - (obj2.height / 2));
			obj2.temp2 ++;
			setTimeout(booAnim, 45, obj, obj2);
		} else if (obj2.temp2 < 12) {
			obj2.id = "boo" + obj2.temp2;
			obj2.setDimen(obj2.xpos, obj2.ypos);
			obj2.temp2 ++;
			setTimeout(booAnim, 35, obj, obj2);
		} else {
			obj2.id = "";
			obj2.temp2 = 1;
		}
	}
}

function drawHealth(obj) {
	ctx.beginPath(); //black background
	ctx.fillStyle = "black";
	ctx.rect(obj.xpos, obj.ypos - 15, obj.width, 10);
	ctx.fill();
	
	ctx.beginPath(); //red health bar
	ctx.fillStyle = "red";
	ctx.rect(obj.xpos, obj.ypos - 15, obj.width * (obj.health / obj.healthMax), 10); //health percentage bar
	ctx.fill();
	ctx.fillStyle = "black";
}

function drawCoolDown(obj) {
	if (obj.coolDown > 0) {
		ctx.beginPath();
		ctx.fillStyle = "rgba(57,57,59,0.7)";
		ctx.rect(obj.xpos, obj.ypos, obj.width, (obj.height * (obj.coolDown / obj.coolDownTime)));
		ctx.fill();
		ctx.fillStyle = "rgba(0,0,0,1)";
	}
}

var minHand = new clockHand(350,50);
var hourHand = new clockHand(0,0);

function drawClockEffect(obj) {
	if(clockEffect.visible) {
		clockEffect.setDimen(330, 40);
		clockEffect.draw();
		
		minHand.xpos = obj.xpos + (obj.width / 2);
		minHand.ypos = obj.ypos + (obj.height / 2) - 1.5;
		minHand.width = (obj.width / 2.4);
		minHand.height = 3;
		minHand.speed = 1;
		updateClockEffect(obj, minHand);
		
		hourHand.xpos = obj.xpos + (obj.width / 2);
		hourHand.ypos = obj.ypos + (obj.height / 2) - 1.5;
		hourHand.width = (obj.width / 4);
		hourHand.height = 3;
		hourHand.speed = 0.07;
		updateClockEffect(obj, hourHand);
		
	}
}

function updateClockEffect(obj, obj2) {
	ctx.save();
	ctx.translate(obj2.xpos, obj2.ypos + (obj2.height / 2)); //sets to pivot point when rotating canvas
	ctx.rotate(obj2.angle*Math.PI/180);
	obj2.angle -= obj2.speed;
	ctx.translate(-obj2.xpos, - (obj2.ypos + (obj2.height / 2)));
	ctx.fillRect(obj2.xpos, obj2.ypos, obj2.width, obj2.height);
	ctx.restore();
}

var xp1 = new xpObj("", 0);
var xp2 = new xpObj("", 1);
var xp3 = new xpObj("", 2);
var xp4 = new xpObj("", 3);
var xp5 = new xpObj("", 4);
var xpArr = [xp1, xp2, xp3, xp4, xp5];

function drawXp() {
	drawIt(xp1);
	drawIt(xp2);
	drawIt(xp3);
	drawIt(xp4);
	drawIt(xp5);
	drawIt(levelUpText);
	function drawIt(obj) {
		if (obj.onScreen && obj.txt !== "LEVEL UP") {
			animateXp(obj);
			ctx.fillStyle = "rgba(0, 0, 0, " + obj.opacity + ")";
			ctx.fillText("+"+ obj.xp + " XP" ,obj.xpos,obj.ypos);
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
		} else if (obj.onScreen && obj.txt == "LEVEL UP") {
			ctx.fillStyle = "rgba(0, 0, 0, " + obj.opacity + ")";
			ctx.font = "60px Arial";
			ctx.textAlign = "center";
			ctx.fillText(obj.txt,obj.xpos,obj.ypos);
			ctx.fillStyle = "rgba(0, 0, 0, 1)";
		}
	}
}

function objXpCheck(obj) {
	var c = 0;
	while (c < xpArr.length) { //searches for an available xp marker object to draw
		if (xpArr[c].onScreen == false) {
			xpArr[c].onScreen = true;
			xpArr[c].xpos = obj.xpos + (obj.width / 2);
			xpArr[c].ypos = obj.ypos + (obj.height / 2);
			xpArr[c].xp = obj.xp;
			setTimeout(fadeXp, 500, xpArr[c]);
			break;
		} else {
			c ++;
		}
	}
}

function animateXp(obj) {
	obj.ypos -= obj.riseSpeed * game.dt * game.timeMultiplier;
}

function fadeXp(obj) {
	if (obj.opacity > 0) {
		obj.opacity -= 0.005 * game.dt * game.timeMultiplier;
		setTimeout(fadeXp, 1000 / game.fps, obj);
	} else {
		obj.onScreen = false;
		obj.opacity = 1;
	}
}

function drawXpBar() {
	ctx.fillStyle = "gold";
	ctx.fillRect(15, 479, 770 *(game.xp / game.nextLevelXp), 11); //total width times the percent to next lvl
	ctx.fillStyle = "black";
}

var firework1 = new fireworkObj("firework", 0, 0);
var firework2 = new fireworkObj("firework", 0, 0);

function drawFirework(obj) {
	if (obj.onScreen == true) {
		obj.setDimen(obj.xpos, obj.ypos);
		obj.draw();
	}
}

function updateEffects() {
	updateFireworks(firework1);
	updateFireworks(firework2);
}

var bombBoom = new effectObj("", 0, 0);
var bombBoom2 = new effectObj("", 0, 0);
var bombBoom3 = new effectObj("", 0, 0);
var bombBoom4 = new effectObj("", 0, 0);
var bombBoomArr = [bombBoom, bombBoom2, bombBoom3, bombBoom4];

function explodeBomb(obj) {
	obj.onScreen = false;
	var temt = 0;
	while (temt < 5) {
		if (bombBoomArr[temt].id == "") { //if not on screen and ready to be used
			bombBoomArr[temt].onScreen = true;
			booAnim(obj, bombBoomArr[temt]);
			break;
		} else { //if not available to be used, check next bomb
			temt ++;
		}
	}
	function booAnim(obj, obj2) { //obj is the bomb object, obj2 is the explosion object
		if (obj2.temp2 < 2) {
			obj2.id = "boo" + obj2.temp2;
			obj2.setDimen(obj.xpos - (obj2.width / 2), obj.ypos - (obj2.height / 2));
			obj2.temp2 ++;
			setTimeout(booAnim, 45, obj, obj2);
		} else if (obj2.temp2 < 12) {
			obj2.id = "boo" + obj2.temp2;
			obj2.setDimen(obj2.xpos, obj2.ypos);
			obj2.temp2 ++;
			setTimeout(booAnim, 35, obj, obj2);
		} else {
			obj2.id = "";
			obj2.temp2 = 1;
			obj2.onScreen = false;
		}
	}
}

var countDownDuration = 0;
var countDownCard;
var countDownDuration2 = 0;
var countDownCard2;
function countDown() {
	ctx.font = "14px Arial";
	ctx.textAlign = "center";
	var num = countDownDuration / 1000;
	num = num.toFixed(1);
	if (countDownDuration > 0) {
		ctx.fillText(num, countDownCard.xpos + 23, countDownCard.ypos + 70);
	}
	
	num = countDownDuration2 / 1000;
	num = num.toFixed(1);
	if (countDownDuration2 > 0) {
		ctx.fillText(num, countDownCard2.xpos + 23, countDownCard2.ypos + 70);
	}
}

function countDownUpdate() {
	if (countDownDuration > 0) {
		countDownDuration -= 1000 / game.fps;
	}
	
	if (countDownDuration2 > 0) {
		countDownDuration2 -= 1000 / game.fps;
	}
}