var cannonSound1 = new Audio("assets/sounds/cannon.wav"); //buffers automatically when created
var cannonSound2 = new Audio("assets/sounds/cannon.wav");
var cannonSound3 = new Audio("assets/sounds/cannon.wav"); //had to make multiple objects again because if I used only one sound object
var cannonSound4 = new Audio("assets/sounds/cannon.wav"); //it would have to play completely before playing again.  AND muting settings
var cannonSound5 = new Audio("assets/sounds/cannon.wav"); //would be terminated if I simply created a new sound object every cannon shot.
var cannonSound6 = new Audio("assets/sounds/cannon.wav"); // :(
var cannonSound7 = new Audio("assets/sounds/cannon.wav");
var cannonSound8 = new Audio("assets/sounds/cannon.wav");
var cannonSound9 = new Audio("assets/sounds/cannon.wav");
var purchaseSound = new Audio("assets/sounds/purchase.mp3");

var cannonSoundArr = [cannonSound1, cannonSound2, cannonSound3, cannonSound4, cannonSound5, cannonSound6, cannonSound7, cannonSound8, cannonSound9];
var generalSounds = [purchaseSound];

function soundCannon() {
	for (var i = 0; i < cannonSoundArr.length; i ++) {
		if (cannonSoundArr[i].currentTime == 0) {
			cannonSoundArr[i].play();
			break;
		} else if (cannonSoundArr[i].currentTime > 1) {
			cannonSoundArr[i].currentTime = 0;
			cannonSoundArr[i].play();
			break;
		}
	}
}

function muteAll() {
	for (var i = 0; i < cannonSoundArr.length; i ++) {
		cannonSoundArr[i].muted = true;
	}
	
	for (var i = 0; i < generalSounds.length; i ++) {
		generalSounds[i].muted = true;
	}
}

function unmuteAll() {
	for (var i = 0; i < cannonSoundArr.length; i ++) {
		cannonSoundArr[i].muted = false;
	}
	
	for (var i = 0; i < generalSounds.length; i ++) {
		generalSounds[i].muted = false;
	}
	
}

function playPurchaseSound() {
	if (purchaseSound.currentTime == 0) {
		purchaseSound.play();
	} else if (purchaseSound.currentTime <= purchaseSound.duration) {
		purchaseSound.currentTime = 0;
		purchaseSound.play();
	}
}