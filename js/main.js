
var stage, w, h, loader;
var sky, bird;
var jump;
var isHurt = false;


function init () {
	//to be removed before deploying
	gameCanvas.style.border = "red 1px solid";

	canvas = document.getElementById("gameCanvas");
        		 scene = new createjs.Stage(canvas);

	stage = new createjs.Stage("gameCanvas");

	// grab canvas width and height for later calculations:
	w = stage.canvas.width;
	h = stage.canvas.height;

	messageField = new createjs.Text("Loading", "bold 29px Helvetica", "blue");
   	stage.addChild(messageField);
      stage.update();

      gameOverMessage = new createjs.Text("Game Over!", "bold 29px Helvetica", "red");

      //Main manifest
	 var manifest = [
	 	{id:"floor", src:"../assets/art/background1.png"},
	 	{id:"clouds", src:"../assets/art/background2.png"},
	 	{id:"sonic", src:"../assets/art/sonic.png"},
	 	{id:"enemy", src:"../assets/art/enemy.png"},
	 	{id:"sonic-1", src:"../assets/art/sonic-1.png"},
	 	{id:"sonicDeath", src:"../assets/art/sonicdeath-1.png"}
	];

	//Main queue
	queue = new createjs.LoadQueue(false);
	queue.addEventListener("progress", updateLoading);
	queue.addEventListener("complete", doneLoading);
	queue.loadManifest(manifest);

	// for slower browers
	function updateLoading() {
 			messageField.text = "Loading " + (queue.progress*100|0) + "%"
 		 	stage.update();

	}

	// Click to start
	function doneLoading(event) {
	     	window.clearInterval(window.loadingInterval);
     		messageField.text = "Click to start";
     		watchRestart();
	}

	// click handler
	function watchRestart() {
	    canvas.onclick = handleClick;
	    stage.addChild(messageField);
	    stage.update();
	}
	//function removeChild from the stage and get the show going!
	function handleClick() {
  			stage.removeChild(messageField);
 			restart();
	}

	//core function

	function restart() {
		//create clouds and images bitmaps.
		scene.removeAllChildren();
		floorImage = queue.getResult("floor");
		floor = new createjs.Bitmap(floorImage);
    		floor.x = 0;
    		floor.y = 192;
    		cloudsImage = queue.getResult("clouds");
	    	clouds = new createjs.Bitmap(cloudsImage);
	    	clouds.x = 0;
	    	clouds.y = 0;
     		floor2 = new createjs.Bitmap(floorImage);
     		floor2.x = 674;
     		floor2.y = 192;
     		clouds2 = new createjs.Bitmap(cloudsImage);
     		clouds2.x = 640;
     		clouds2.y = 0;
    		scene.addChild(clouds,clouds2,floor,floor);
    		scene.update();

    		//Sonic's sprite sheet data
		sonicImage = queue.getResult("sonic");
		var dataSonic= new createjs.SpriteSheet({
			"images": [sonicImage],
		     	"frames": {"regX": 0, "height": 64, "count": 9, "regY": 0, "width": 64},
		     	"animations":
		     		{"up": [0, 2, "up"],
		     		"straight": [3, 5, "straight"],
		     		"down": [6, 8, "down"] }
		});
		//Sonic's sprite sheet
		sonic = new createjs.Sprite(dataSonic, "straight");
		sonic.framerate = 5;
		sonic.x = 50;
		sonic.y = 50;
		scene.addChild(sonic);

		//enemy image
		var enemyImage = queue.getResult("enemy");
		var dataEnemy = new createjs.SpriteSheet({
			"images": [enemyImage],
		     	"frames": {"regX": 0, "height": 52, "count": 2, "regY": 0, "width": 48},
		     	"animations":
		     		{"stay": [0, 1, "stay"]}
		})

		//enemy spritesheet and gap between enemies
		numEnemies = 6;
		enemies = [];
		var hole = Math.floor(Math.random()*numEnemies);
			for (var i = 0; i<numEnemies;i++){
				enemies[i] = new createjs.Sprite(dataEnemy, "stay");
		          		enemies[i].framerate = Math.floor((Math.random()*8));
				enemies[i].x = 150;
				enemies[i].y = (50*i)-8;
				if (i >hole){
					enemies[i].y = enemies[i].y+100;
				}
		}

		// making enemies move- code should be refactored!
		for (var i =0; i<numEnemies;i++){
			scene.addChild(enemies[i]);
		}

		// event jump on click on the canvas
		canvas.onclick = doJump;
		function doJump(){
			jump=20;
			sonic.y = sonic.y-20;
			sonic.gotoAndPlay("up");
		}


		if (!createjs.Ticker.hasEventListener("tick")) {
	 		 	createjs.Ticker.addEventListener("tick", tick);
		}

		function die(){

     		sonicDyingImage= queue.getResult("sonicDeath");
     		var dataSonicDying= new createjs.SpriteSheet({
                "images": [sonicDyingImage],
                "frames": {"regX": 0, "height": 64, "count": 2, "regY": 0, "width": 48},
                "animations": {"dead": [0, 0, "dead"],
                "hurt": [1, 1, "hurt"]}
     		});

    	    		sonicDying = new createjs.Sprite(dataSonicDying, "hurt");
    	     		sonicDying.x = sonic.x;
    	     		sonicDying.y = sonic.y;
    	     		scene.addChild(sonicDying);
    	     		scene.addChild(gameOverMessage);
    	     		scene.removeChild(enemies[0]);
                 for (var i =0; i<numEnemies;i++){
                    scene.removeChild(enemies[i]);
                }
                  scene.removeChild(sonic);
	     		//console.log(index);
                  isHurt=true;
		}

		function tick(event) {
		//animations clouds and floor
		clouds.x = clouds.x-1;
		floor.x = floor.x-2;
		clouds2.x = clouds2.x-1;
		floor2.x = floor2.x-2;
    	      if (floor.x == -674){floor.x = 674;}
		if (floor2.x == -674){floor2.x = 674;}
		if (clouds.x == -640){clouds.x = 640;}
		if (clouds2.x == -640){clouds2.x = 640;}
		//sonic's down straight movement
		sonic.y = sonic.y+3;

		// Enemy entering from right side
		for (var i = 0;i<numEnemies;i++){
     			if (enemies[i] != null){
          			enemies[i].x = enemies[i].x-6;
          			if (enemies[i].x < -60){
               		enemies[i].x = 350;
               		enemies[i].y = (50*i)-8;
               		if (i > hole){
                    		enemies[i].y = enemies[i].y+100;
		               }
		          }
		     }
		}
		//check collision and call die method
		var collision = ndgmr.checkPixelCollision(sonic,enemies[0]);
		var i = 0;
		while (!collision && i <numEnemies){
    			var collision = ndgmr.checkPixelCollision(sonic,enemies[i]);
    			i++;
		}

		if (collision && !isHurt){
	     		//canvas.onclick = null;
	     		die();
		}
		scene.update(event);
	}
}





}