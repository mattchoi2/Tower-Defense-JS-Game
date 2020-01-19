var townUI = new gameObj("townUI", 0, 0);
var townCenter = new gameObj("townCenter", 100, 100);
var farmHouse1 = new townBuilding("farmHouse1");
var farmHouse2 = new townBuilding("farmHouse1");
var farmHouse3 = new townBuilding("farmHouse1");
var farmHouse4 = new townBuilding("farmHouse1");
var farmHouseArr = [farmHouse1, farmHouse2, farmHouse3, farmHouse4];
var farm = new cardObj("farm", 0, 0, 0, "farm");
var purchase2 = new cardObj("purchase2", 0, 0, 0, "purchase2");

var cardArr = [farm];
var buildingArr = [farmHouseArr];
var drawOrder = [];

function drawTownUI() {
	townUI.setDimen(0, 386);
	townUI.draw();
	close.setDimen(close.xpos, close.ypos);
	close.draw();
	ctx.fillText(game.gold, 750, 420);
	ctx.fillText(game.health, 750,446);
	drawGrid();
	townCenter.setDimen(340, 80);
	townCenter.draw();
	farm.setDimen(15, 405);
	farm.draw();
	purchase2.setDimen(669, 460);
	purchase2.draw();
	
	drawSelectedText();
	drawBuildings();
}

function drawBuildings() {
	for (var i = 0; i < farmHouseArr.length; i ++) {
		if (farmHouseArr[i].placed) {
			farmHouseArr[i].draw();
		}
	}
}

function checkOrder() {
	for (var i = 0; i < buildingArr.length; i ++) {
		for (var j = 0; j < buildingArr[i].length; j ++) {
			if (buildingArr[i][j].placed) { //removes the buildings not placed yet
				if (drawOrder.length > 1) {
					var maxDifference = 0;
					for (var k = 0; k < drawOrder.length; k ++) { //must have a value for the difference for each iteration
						if (k == 0) {
							maxDifference = drawOrder[k].row - buildingArr[i][j].row
						} else {
							if (drawOrder[k] < buildingArr[i][j]) {
								
							}
						}
					}
				} else {
					drawOrder.push(buildingArr[i][j]);
				}
			}
		}
	}
}
checkOrder();

function updateTown() {
	hoverControls(farm);
	simpleHoverControls(purchase2);
	if (game.placeMode) {
		if (farm.active) {
			for (var i = 0; i < farmHouseArr.length; i ++) {
				if (farmHouseArr[i].placed == false) {
					farmHouseArr[i].xpos = game.mousex;
					farmHouseArr[i].ypos = game.mousey;
					farmHouseArr[i].setDimen(farmHouseArr[i].xpos - 39, farmHouseArr[i].ypos - 70);
					farmHouseArr[i].draw();
				}
			}
		}
	}
}

function cardSelected() {
	for (var i = 0; i < cardArr.length; i ++) {
		if (cardArr[i].active) {
			return true;
			break;
		}
	}
	return false;
}

function deselectAll() {
	farm.active = false;
	game.placeMode = false;
}

function drawSelectedText() {
	var message = "";
	if (farm.active) {
		message = "Farms are a production building that produces gold.  The gold is collected from each farm at the end of every round.  " +
		"These buildings can also be upgraded for more gold production. COST: 100";
	} else {
		message = "Select a structure to show its purpose and upgrades or select a card to see its cost";
	}
	ctx.textAlign = "left";
	wrapText(ctx, message, 310, 415, (townUI.width / 2) - 50, 20);
}

var xstart = 5;
var ystart = 170;

var row1 = 3;	var rowA = 1;
var row2 = 3;	var rowB = 2;
var row3 = 4;	var rowC = 3;
var row4 = 4;	var rowD = 3;
var row5 = 5;	var rowE = 4;
var row6 = 5;	var rowF = 3;
var row7 = 6;	var rowG = 4;
				var rowH = 3;
				var rowI = 4;
var rowArr = [];
var blockWidth = 70;
var blockHeight = 60;
var blockMouseCount = 0; //couldn't just use boolean, conditions change as the loop recurses through all blocks in grid
var mouseInGrid = false; //perspective matters ;)

function drawGrid() {
	for (var lol = 0; lol < 2; lol ++) {
		if (lol == 0) {
			xstart = 5;
			ystart = 170;
			rowArr = [row1, row2, row3, row4, row5, row6, row7];
		} else if (lol == 1) {
			xstart = 500;
			ystart = 100;
			rowArr = [rowA, rowB, rowC, rowD, rowE, rowF, rowG, rowH, rowI];
		}
		for (var j = 0; j < rowArr.length; j ++) { //draws entire rows every recursion
			for (var i = 0; i < rowArr[j]; i ++) { //draws isometric boxes in each recursion
				ctx.beginPath();
				if (isOdd(j)) {
					var tempx = xstart + ((blockWidth / 2));
					var tempy = ystart + ((blockHeight / 2) * j);
				} else {
					var tempx = xstart;
					var tempy = ystart + ((blockHeight / 2) * j);
				}
				
				ctx.moveTo(tempx + (i * blockWidth), tempy);
				ctx.lineTo(tempx + (blockWidth / 2) + (i * blockWidth), tempy - (blockHeight / 2));
				ctx.lineTo(tempx + (blockWidth) + (i * blockWidth), tempy);
				ctx.lineTo(tempx + (blockWidth / 2) + (i * blockWidth), tempy + (blockHeight / 2));
				ctx.closePath();
				ctx.stroke();
				ctx.fillStyle = "green";

				if (ctx.isPointInPath(game.mousex, game.mousey)) {
					ctx.fill();
					blockMouseCount ++;
					checkPlace(tempx + (i * blockWidth), tempy - 64, j);
				}
				ctx.fillStyle = "black";
			}
		}
	}
	if (blockMouseCount > 0) {
		blockMouseCount = 0;
		mouseInGrid = true;
	} else {
		mouseInGrid = false;
	}
}

function checkPlace(blockx, blocky, j) {
	if (game.mouseDown && game.placeMode && farm.active && game.gold > 100) {
		for (var i = 0; i < farmHouseArr.length; i ++) {
			if (farmHouseArr[i].placed == false) {
				farmHouseArr[i].xpos = blockx;
				farmHouseArr[i].ypos = blocky;
				farmHouseArr[i].placed = true;
				farmHouseArr[i].row = j;
				game.placeMode = false;
				game.gold -= 100;
				deselectAll();
				break;
			}
		}		
	}
}

function isOdd(n) {
	return Math.abs(n % 2) == 1; //if num is odd, function returns true
}