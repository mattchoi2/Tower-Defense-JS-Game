
function gameObj(i, x, y) { //all classes that inherit this will run through with null IDs (WTF)
	this.xpos = 0;
	this.ypos = 0;
	this.width = 0;
	this.height = 0;
	if (i !== undefined) { //to prevent errors on child constructors
		this.id = i;
	} 
	
	this.setDimen = function(x, y) { //UNIVERSAL method to set dimension (x,y,width,height)
		this.img = document.getElementById(this.id);
		this.width = this.img.width;
		this.height = this.img.height;
		if (this.xpos == undefined) { //prototype chain doesn't search for inherited parameters, this check boosts performance
			this.xpos = 0;
		} else {
			this.xpos = x;
		}
		if (this.ypos == undefined) {
			this.ypos = 0;
		} else {
			this.ypos = y;
		}
	}
	
	this.draw = function() {
		ctx.drawImage(this.img,this.xpos,this.ypos, this.width, this.height);
	}
	
	if (this.id !== undefined) { //also prevents errors on child constructors
		this.setDimen(this.xpos, this.ypos);
	}
}

function collisionObj(i, x, y) {
	this.id = i;
	this.setDimen(x, y);
}

function effectObj(i, x, y, base) {
	this.id = i;
	this.frame = 1;
	this.base = base;
	this.temp2 = 1;
	this.visible = false;
	this.onScreen = false;
	this.damage = 1; //used for fire effect
}

function cannonObj(i, x,y) {
	this.id = i;
	this.setDimen(x,y);
	this.angle = 0;
	this.isFire = false;
}

function ballObj(i, x, y, n) {
	this.id = i;
	this.xpos = x;
	this.ypos = y;
	this.velocx = 0;
	this.velocy = 0;
	this.speed = 1;
	this.damage = 50; //base damage by cannon ball (used in stage.js)
	this.damageMax = 50;
	this.onScreen = false;
	this.num = n;
}

function sawObj(i, n) {
	this.id = i;
	this.num = n;
	this.angle = 0;
	this.angleSpeed = 0.2;
	this.damage = 5;
	this.damageMax = 5;
}

function bombObj(i, n) { //also serves as the fireball object
	this.id = i;
	this.num = n;
	this.angle = 0;
	this.angleSpeed = 0.015;
	this.damage = 20;
	this.damageMax = 20;
	this.force = 0.2;
	this.burnTime = 3000;
	this.limitReached = false;
}

function enemyObj(i, x, y , boss, type) {
	this.id = i;
	if (i !== "plant" && i !=="stump") {this.setDimen(x,y);};
	this.isAttack = false;
	this.velocy = 0;
	this.speed = 0;
	this.speedMax = 0.1;
	this.touchingTower = false;
	this.wait = false;
	this.fCount = 1;
	this.health = 100;
	this.healthMax = 100;
	this.damage = 10;
	this.accel = 0.0005;
	this.hitArr = ["", "", "", "", "", "", "", "", ""]; //nine empty areas for the nine cannon balls ;)
	this.isBoss = boss;
	this.xp = 15;
	this.frame = 1;  //==============USED FOR PLANT=============
	this.init = false;
	this.baseName = i;
	this.type = type;
	this.isFiring = false;
}

function xpObj(text, n) { //xp marker when you kill a mush mush
	this.txt = text;
	this.onScreen = false;
	this.num = n;
	this.xp = 0;
	this.riseSpeed = 0.05;
	this.opacity = 1;
}

function cardObj(i, x, y, c, b) {
	this.id = i;
	this.setDimen(x,y);
	this.active = false;
	this.coolDown = 0;
	this.coolDownTime = c;
	this.baseName = b;
}

function buttonObj(i, x, y) {
	this.id = i;
	this.setDimen(x, y);
}

function clockHand(x, y) {
	this.xpos = x;
	this.ypos = y;
	this.angle = 0;
	this.width = 0;
	this.height = 0;
	this.speed = 0;
}

function fireworkObj(i, x, y) {
	this.id = i;
	this.xpos = x;
	this.ypos = y;
	this.counter = 1;
}

function shopObj(i, x, y) {
	this.id = i;
	this.xpos = x;
	this.ypos = y;
	this.baseName = i;
	this.state = 0; //the maximum is five, it is the tier system for the shop
}

function townBuilding(i) {
	this.id = i;
	this.baseName = i;
	this.xpos = 0;
	this.ypos = 0;
	this.state = 0;
	this.placed = false;
	this.row = 0;
	this.column = 0;
}
//=============================================ESTABLISH PROTOTYPE CHAIN=======================

collisionObj.prototype = new gameObj(); //makes collision objects inherit game object attributes / methods
cannonObj.prototype = new gameObj();
townBuilding.prototype = new gameObj();
fireworkObj.prototype = new gameObj();
xpObj.prototype = new gameObj();
effectObj.prototype = new gameObj();
ballObj.prototype = new gameObj();
/*====*/sawObj.prototype = new ballObj(); //a child's child prototype
		bombObj.prototype = new ballObj();
enemyObj.prototype = new gameObj();
cardObj.prototype = new gameObj();
buttonObj.prototype = new gameObj();
shopObj.prototype = new gameObj();