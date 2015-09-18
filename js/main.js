
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
	     		console.log("doneLoading");

		}
		function watchRestart() {
		    canvas.onclick = handleClick;
		    stage.addChild(messageField);
		    stage.update();
		    console.log("watchRestart");
		}

		function handleClick() {
    			stage.removeChild(messageField);
   			restart();
		}

		function restart() {
			console.log("restart");
		    scene.removeAllChildren();
		    floorImage = preload.getResult("floor");
		    floor = new createjs.Bitmap(floorImage);
		    floor.x = 0;
		    floor.y = 192;
		    cloudsImage = preload.getResult("clouds");
		    clouds = new createjs.Bitmap(cloudsImage);
		    clouds.x = 0;
		    clouds.y = 0;
		    scene.addChild(clouds,floor);
		    scene.update();
		}


	}