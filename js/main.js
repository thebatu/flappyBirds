
	console.log("working");

	
	var stage, w, h, loader;
	var sky, bird;


	function init () {
		//to be removed before deploying
		myCanvas.style.border = "red 1px solid";

		//new stage
		stage = new	createjs.Stage("myCanvas");

		// grab canvas width and height for later calculations:
		w = stage.canvas.width;
		h = stage.canvas.height;

		manifest = [
			{src: "../flappyBirds/assets/art/background.png", id: "grant"},
			{src: "../flappyBirds/assets/art/bird.png", id: "sky"},
			{src: "../flappyBirds/assets/art/ground.png", id: "ground"},
			{src: "../flappyBirds/assets/art/pipe.png", id: "ground"},
		];

		loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete", handleComplete);
		loader.loadManifest(manifest, true, "/assets/art/");
	}



	function handleComplete (event) {
		sky = new createjs.Shape();
		sky.graphics.beginBitmapFill(loader.getResult("sky")).drawRect(0, 0, w, h);

		var groundImg = loader.getResult("ground");
		ground = new createjs.Shape();
		ground.graphics.beginBitmapFill(groundImg).drawRect(0, 0, w + groundImg.width, groundImg.height);
		ground.tileW = groundImg.width;
		ground.y = h - groundImg.height;

		var spriteSheet = new createjs.SpriteSheet({
			framerate: 30,
			"images": [loader.getResult("bird")],
			"frames": {"regX": 82, "height": 292, "count": 64, "regY": 0, "width": 165},
			// define two animations, run (loops, 1.5x speed) and jump (returns to run):
			"animations": {
				"run": [0, 25, "run", 1.5],
				"jump": [26, 63, "run"]
			}
		});
		grant = new createjs.Sprite(spriteSheet, "run");
		grant.y = 35;

		stage.addChild(bird);
		stage.addEventListener("stagemousedown", handleJumpStart);

		createjs.Ticker.timingMode = createjs.Ticker.RAF;
		createjs.Ticker.addEventListener("tick", tick);



	}