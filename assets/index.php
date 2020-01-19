<HTML>

<HEAD>

<TITLE>
Canvas
</TITLE>

<style>
body {
background-color:black;
}

#canvas {
border-width:5px;
border-color:white;
border-style:solid;
}

#allAlign {
margin:auto;
width:800px;
margin-top:100px;
text-align:center;
}

#dir {
color:white;
font-size:20px;
text-align:center;
}

.hide {
display:none;
}

</style>

</HEAD>

<BODY>

<div id="allAlign">

<canvas id="canvas" width="800" height="500">
</canvas>

</div>

<p id="dir">Tower Defense Game</p>

<img class = "hide" id="sky" src="assets/scenery/sky.jpg">
<img class = "hide" id="grass" src="assets/scenery/grass.png">

<img class = "hide" id="tower" src="assets/structures/tower.png">
<img class = "hide" id="cannon" src="assets/structures/cannon.png">

<img class = "hide" id="UI" src="assets/UI/UI.png">
<img class = "hide" id="normalShot" src="assets/UI/normalShot.png">
<img class = "hide" id="normalShotHover" src="assets/UI/normalShotHover.png">
<img class = "hide" id="normalShotActive" src="assets/UI/normalShotActive.png">
<img class = "hide" id="tripleShot" src="assets/UI/tripleShot.png">
<img class = "hide" id="tripleShotHover" src="assets/UI/tripleShotHover.png">
<img class = "hide" id="tripleShotActive" src="assets/UI/tripleShotActive.png">

<img class = "hide" id="mush1" src="assets/enemy/mush1.png">
<img class = "hide" id="mush2" src="assets/enemy/mush2.png">
<img class = "hide" id="mush3" src="assets/enemy/mush3.png">
<img class = "hide" id="mush4" src="assets/enemy/mush4.png">
<img class = "hide" id="mushHurt" src="assets/enemy/mushHurt.png">
<img class = "hide" id="mushDie1" src="assets/enemy/mushDie1.png">
<img class = "hide" id="mushDie2" src="assets/enemy/mushDie2.png">
<img class = "hide" id="mushDie3" src="assets/enemy/mushDie3.png">

<img class = "hide" id="boom1" src="assets/effects/boom1.png">
<img class = "hide" id="boom2" src="assets/effects/boom2.png">
<img class = "hide" id="boom3" src="assets/effects/boom3.png">
<img class = "hide" id="boom4" src="assets/effects/boom4.png">
<img class = "hide" id="boom5" src="assets/effects/boom5.png">
<img class = "hide" id="boom6" src="assets/effects/boom6.png">
<img class = "hide" id="boom7" src="assets/effects/boom7.png">
<img class = "hide" id="boom8" src="assets/effects/boom8.png">
<img class = "hide" id="boom9" src="assets/effects/boom9.png">
<img class = "hide" id="boom10" src="assets/effects/boom10.png">
<img class = "hide" id="boom11" src="assets/effects/boom11.png">
<img class = "hide" id="boom12" src="assets/effects/boom12.png">
<img class = "hide" id="boom13" src="assets/effects/boom13.png">
<img class = "hide" id="boom14" src="assets/effects/boom14.png">
<img class = "hide" id="boom15" src="assets/effects/boom15.png">
<img class = "hide" id="boom16" src="assets/effects/boom16.png">
<img class = "hide" id="boom17" src="assets/effects/boom17.png">
<img class = "hide" id="boom18" src="assets/effects/boom18.png">
<img class = "hide" id="ball" src="assets/effects/ball.png">

<?php
//integer starts at 0 before counting
    $i = 0; 
    $dir = 'assets/';
    if ($handle = opendir($dir)) {
        while (($file = readdir($handle)) !== false){
            if (!in_array($file, array('.', '..')) && !is_dir($dir.$file)) 
                $i++;
        }
    }
    $i = $i / 2;
    // prints out how many were in the directory
    echo "<p id='imageCounter' class='hide'>$i</p>";
?>

<script src="gam.js"></script>
<script src="resources.js"></script>
<script src="class.js"></script>
<script src="stage.js"></script>
<script src="cannon.js"></script>
<script src="controls.js"></script>
<script src="effects.js"></script>
<script src="enemy.js"></script>
<script src="UI.js"></script>
</BODY>

</HTML>