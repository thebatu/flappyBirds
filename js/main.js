
	console.log("working");


	var stage, w, h, loader;
	var sky, bird;
	var jump;


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

		 var manifest = [
		 	{id:"floor", src:"../assets/art/background1.png"},
		 	{id:"clouds", src:"../assets/art/background2.png"},
		 	{id:"sonic", src:"../assets/art/sonic.png"}
		];

		queue = new createjs.LoadQueue(false);
		queue.addEventListener("progress", updateLoading);
		queue.addEventListener("complete", doneLoading);
		queue.loadManifest(manifest);
		console.log("here");


		function updateLoading() {
   			messageField.text = "Loading " + (queue.progress*100|0) + "%"
   		 	stage.update();
   		 	console.log("updateLoading");

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

		    	if (!createjs.Ticker.hasEventListener("tick")) {
	 		 	createjs.Ticker.addEventListener("tick", tick);
			}



			function tick(event) {
				console.log(clouds);
				clouds.x = clouds.x-1;
				floor.x = floor.x-2;
				clouds2.x = clouds2.x-1;
				floor2.x = floor2.x-2;
		    	      	if (floor.x == -674){floor.x = 674;}
				if (floor2.x == -674){floor2.x = 674;}
				if (clouds.x == -640){clouds.x = 640;}
				if (clouds2.x == -640){clouds2.x = 640;}
				scene.update(event);
				canvas.onclick = doJump();


			}



		sonicImage = queue.getResult("sonic");
		var dataSonic= new createjs.SpriteSheet({
			"images": [sonicImage],
		     	"frames": {"regX": 0, "height": 64, "count": 9, "regY": 0, "width": 64},
		     	"animations":
		     		{"up": [0, 2, "up"],
		     		"straight": [3, 5, "straight"],
		     		"down": [6, 8, "down"]}
		});
		sonic = new createjs.Sprite(dataSonic, "straight");
		sonic.framerate = 5;
		sonic.x = 50;
		sonic.y = 50;
		jump = 0;

		scene.addChild(clouds,clouds2,floor,floor2,sonic);


		function doJump(){
			console.log("inside do jump");
			jump = 20;
			console.log(sonic.y);
			sonic.y = sonic.y+10;
			console.log(sonic.y);
			sonic.y = sonic.y-jump;
			jump = sonic.y;
			if (jump > 0){
			console.log("jump :"+jump);

     				jump = jump/2;
			}
		}





		}


	}