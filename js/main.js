	console.log("working");

	
	var stage, w, h, loader;
	var sky, bird;


	function init () {
		//to be removed before deploying
		myCanvas.style.border = "red 1px solid";

		//new stage
		stage = new	createjs.stage;

		// grab canvas width and height for later calculations:
		w = stage.canvas.width;
		h = stage.canvas.height;

		manifest = [
			{src: "spritesheet_grant.png", id: "grant"},
			{src: "sky.png", id: "sky"},
			{src: "ground.png", id: "ground"},
			{src: "hill1.png", id: "hill"},
			{src: "hill2.png", id: "hill2"}
		];

		loader = new createjs.LoadQueue(false);
		loader.addEventListener("complete", handleComplete);
		loader.loadManifest(manifest, true, "/assets/art/");


	}