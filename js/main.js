
	console.log("working");


	var stage, w, h, loader;
	var sky, bird;


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
            //messageField.maxWidth = 1000;
            //messageField.textAlign = "center";
            messageField.x = w.width/2;
            messageField.y = h.height/2;
            stage.addChild(messageField);
            stage.update();

		 var manifest = [
		 	{id:"floor", src:"../assets/art/background1.png"},
		 	{id:"clouds", src:"../assets/art/background2.png"}
		];

		preload = new createjs.LoadQueue(false);
		preload.addEventListener("progress", updateLoading);
		preload.addEventListener("complete", doneLoading);
		preload.loadManifest(manifest);
		//preload.load;
		console.log("here");


		function updateLoading() {
   			messageField.text = "Loading " + (preload.progress*100|0) + "%"
   		 	stage.update();
   		 	console.log("updateLoading");
   		 	// Ticker.setFPS(30);
   		 	// Ticker.addListener(stage);

		}
		function doneLoading(event) {
		     	window.clearInterval(window.loadingInterval);
	     		messageField.text = "Click to start";
	     		watchRestart();
	     		console.log("here 2");
		}
		function watchRestart() {
		    canvas.onclick = handleClick;
		    stage.addChild(messageField);
		    stage.update();
		    console.log("here 3");
		}

		function handleClick() {
    			stage.removeChild(messageField);
   			stage.update();
   			restart();

		}


	}



	// function handleComplete (event) {
	// 	sky = new createjs.Shape();
	// 	sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

	// 	var groundImg = loader.getResult("ground");
	// 	ground = new createjs.Shape();
	// 	ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
	// 	ground.tileW = groundImg.width;
	// 	ground.y = h - groundImg.height;

	// 	var spriteSheet = new createjs.SpriteSheet({
	// 		framerate: 30,
	// 		"images": [loader.getResult("bird")],
	// 		"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
	// 		// define two animations, run (loops, 1.5x speed) and jump (returns to run):
	// 		"animations": {
	// 			"run": [0, 25, "run", 1.5],
	// 			"jump": [26, 63, "run"]
	// 		}
	// 	});
	// 	grant = new createjs.Sprite(spriteSheet, "run");
	// 	grant.y = 35;

	// 	stage.addChild(bird);
	// 	stage.addEventListener("stagemousedown", handleJumpStart);

	// 	createjs.Ticker.timingMode = createjs.Ticker.RAF;
	// 	createjs.Ticker.addEventListener("tick", tick);



	// }