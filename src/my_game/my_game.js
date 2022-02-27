"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";
import EnemyManager from "./enemy_manager.js";
import EnemyGroup from "./objects/enemy_group.js";
import Hero from "./objects/hero.js";

class MyGame extends engine.Scene {
  constructor() {
    super();

    this.backgroundLoc = "assets/bg.png";
    this.spriteSheet = "assets/SpriteSheet.png";

    // The camera to view the scene
    this.mCamera = null;
    this.mCameraPlayer = null;
    this.mCPActive = true;
    this.mCameraDye1 = null;
    //this.mCD1Active = false;
    this.mCameraDye2 = null;
    //this.mCD2Active = false;
    this.mCameraDye3 = null;
    //this.mCD3Active = false;

    this.background = null;
    this.dyeTexture = null;
    this.dye = null;

    this.numPatrolMsg = null;
    this.numShotsSpawnedMsg = null;
    this.isAutoSpawnMsg = null;

    this.numShotsSpawned = 0;
    this.isAutoSpawning = true;

    this.messages = [];

    this.enemyManager = null;

    this.cameraQueue = [];
    this.cameraActiveQueue = [];
    this.cameraIndexQueue = [0, 1, 2];
    this.activeCameras = [false, false, false];
    this.activeCameraTimes = [0, 0, 0];
  }

  load() {
    engine.texture.load(this.backgroundLoc);
    engine.texture.load(this.spriteSheet);
  }

  unload() {
    engine.texture.unload(this.backgroundLoc);
    engine.texture.unload(this.spriteSheet);
  }

  init() {
    // Step A: set up the cameras
    this.mCamera = new engine.Camera(
      vec2.fromValues(0, 0), // position of the camera
      200, // width of camera
      [0, 0, 800, 600] // viewport (orgX, orgY, width, height)
    );
    this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

    this.mCameraPlayer = new engine.Camera(
      vec2.fromValues(0, 0), // position of the camera
      15, // width of camera
      [0, 600, 200, 200] // viewport (orgX, orgY, width, height)
    );
    this.mCameraPlayer.setBackgroundColor([0.8, 0.8, 0.8, 1]);
    this.mCameraPlayer.configLerp(1, 1);

    this.mCameraDye1 = new engine.Camera(
      vec2.fromValues(0, 0), // position of the camera
      6, // width of camera
      [200, 600, 200, 200] // viewport (orgX, orgY, width, height)
    );
    this.mCameraDye1.setBackgroundColor([1, 0.8, 0.8, 1]);
    this.mCameraDye1.configLerp(1, 1);

    this.mCameraDye2 = new engine.Camera(
      vec2.fromValues(0, 0), // position of the camera
      6, // width of camera
      [400, 600, 200, 200] // viewport (orgX, orgY, width, height)
    );
    this.mCameraDye2.setBackgroundColor([0.8, 1, 0.8, 1]);
    this.mCameraDye2.configLerp(1, 1);

    this.mCameraDye3 = new engine.Camera(
      vec2.fromValues(0, 0), // position of the camera
      6, // width of camera
      [600, 600, 200, 200] // viewport (orgX, orgY, width, height)
    );
    this.mCameraDye3.setBackgroundColor([0.8, 0.8, 1, 1]);
    this.mCameraDye3.configLerp(1, 1);

    this.cameraQueue.push(this.mCameraDye1);
    this.cameraQueue.push(this.mCameraDye2);
    this.cameraQueue.push(this.mCameraDye3);

    this.cameraActiveQueue.push(this.mCD1Active);
    this.cameraActiveQueue.push(this.mCD2Active);
    this.cameraActiveQueue.push(this.mCD3Active);

    this.numPatrolMsg = new engine.FontRenderable("0 Patrols");
    this.numPatrolMsg.setColor([0, 0, 0, 1]);
    this.numPatrolMsg.getXform().setPosition(-50, -50);
    this.numPatrolMsg.setTextHeight(3);

    this.numShotsSpawnedMsg = new engine.FontRenderable("0 Shots");
    this.numShotsSpawnedMsg.setColor([0, 0, 0, 1]);
    this.numShotsSpawnedMsg.getXform().setPosition(-50, -55);
    this.numShotsSpawnedMsg.setTextHeight(3);

    this.isAutoSpawnMsg = new engine.FontRenderable("AutoSpawn: true");
    this.isAutoSpawnMsg.setColor([0, 0, 0, 1]);
    this.isAutoSpawnMsg.getXform().setPosition(-50, -60);
    this.isAutoSpawnMsg.setTextHeight(3);

    this.messages.push(this.numPatrolMsg);
    this.messages.push(this.numShotsSpawnedMsg);
    this.messages.push(this.isAutoSpawnMsg);

    this.background = new engine.TextureRenderable(this.backgroundLoc);
    this.background.getXform().setSize(250, 250);
    this.background.getXform().setPosition(0, 0);
    this.dye = new Hero(this.spriteSheet, this.spriteSheet);

    this.enemyManager = new EnemyManager(this.spriteSheet, this.getLRUCamera);
  }

  // This is the draw function, make sure to setup proper drawing environment, and more
  // importantly, make sure to _NOT_ change any state.
  draw() {
    // Step A: clear the canvas
    engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray

    this.mCamera.setViewAndCameraMatrix();
    this.background.draw(this.mCamera);
    // only draw status in the main camera
    for (let i = 0; i < this.messages.length; i++) {
      this.messages[i].draw(this.mCamera);
    }

    this.dye.draw(this.mCamera);
    this.enemyManager.draw(this.mCamera);

    if (this.mCPActive) {
      this.mCameraPlayer.setViewAndCameraMatrix();
      this.background.draw(this.mCameraPlayer);
      this.dye.draw(this.mCameraPlayer);
      this.enemyManager.draw(this.mCameraPlayer);
    }
    if (this.activeCameras[0]) {
      this.mCameraDye1.setViewAndCameraMatrix();
      this.background.draw(this.mCameraDye1);
      this.dye.draw(this.mCameraDye1);
      this.enemyManager.draw(this.mCameraDye1);
    }
    if (this.activeCameras[1]) {
      this.mCameraDye2.setViewAndCameraMatrix();
      this.background.draw(this.mCameraDye2);
      this.dye.draw(this.mCameraDye2);
      this.enemyManager.draw(this.mCameraDye2);
    }
    if (this.activeCameras[2]) {
      this.mCameraDye3.setViewAndCameraMatrix();
      this.background.draw(this.mCameraDye3);
      this.dye.draw(this.mCameraDye3);
      this.enemyManager.draw(this.mCameraDye3);
    }
  }

  // The Update function, updates the application state. Make sure to _NOT_ draw
  // anything from this function!
  update() {
    this.dye.update(this.mCamera);
    this.enemyManager.update(this.dye);
    for (let i = 0; i < this.enemyManager.getEnemyCount(); i++) {
      //   this.enemyManager.getEnemy(i).colliderParser(this.dye);
      //   this.dye.collideCheck(this.enemyManager.getEnemy(i));
    }

    this.mCameraPlayer.panTo(
      this.dye.getXform().getXPos(),
      this.dye.getXform().getYPos()
    );
    //console.log(this.dye.getXform().getRotationInRad());
    this.mCameraPlayer.update();

    //text stuff
    this.numPatrolMsg.setText(this.enemyManager.getEnemyCount() + " Patrols");
    // console.log(this.dye.getSetSize());
    this.numShotsSpawnedMsg.setText(this.numShotsSpawned + "  Shots");

    //camera stuff
    //console.log(this.activeCameraTimes[0] + " " + this.activeCameraTimes[1] + " " + this.activeCameraTimes[2]);
    for (let i = 0; i < 3; i++) {
      //console.log(this.activeCameras[i]);
      if (this.activeCameras[i]) {
        this.activeCameraTimes[i]++;
        //console.log(this.activeCameraTimes[i]);
        if (this.activeCameraTimes[i] >= 320) {
          this.activeCameraTimes[i] = 0;
          this.activeCameras[i] = false;
        }
      }
    }

    let l = [];
    for (let i = 0; i < this.dye.shotSet.size(); i++) {
      for (let j = 0; j < this.enemyManager.getEnemyCount(); j++) {
        // this.dye.shotSet.getObjectAt(i).collideCheck(this.enemyManager.getEnemy(j));
        if (
          this.dye.getObject(i).pixelTouches(this.enemyManager.getEnemy(j), l)
        ) {
          console.log("Collided!!!!!!");
        }
      }
    }

    if (engine.input.isKeyClicked(engine.input.keys.Zero)) {
      this.mCPActive = !this.mCPActive;
      console.log(this.mCPActive);
    }
    if (engine.input.isKeyClicked(engine.input.keys.One)) {
      this.activeCameras[0] = !this.activeCameras[0];
      //console.log(this.mCD1Active);
    }
    if (engine.input.isKeyClicked(engine.input.keys.Two)) {
      this.activeCameras[1] = !this.activeCameras[1];
      //console.log(this.mCD2Active);
    }
    if (engine.input.isKeyClicked(engine.input.keys.Three)) {
      this.activeCameras[2] = !this.activeCameras[2];
      //console.log(this.mCD3Active);
    }
    if (engine.input.isKeyClicked(engine.input.keys.A)) {
      this.enemyManager.toggleAutoSpawn();
      this.isAutoSpawning = !this.isAutoSpawning;
      this.isAutoSpawnMsg.setText("AutoSpawn: " + this.isAutoSpawning);
    }
  }

  activateLRUCamera(xPos, yPos) {
    let lruCamera = this.getLRUCamera();
    //let lruCameraActive = this.getLRUCameraActive();
    //lruCameraActive = true;
    lruCamera.panTo(xPos, yPos);
    this.activeCameras[this.getLRUCameraIndex()] = true;
  }

  getLRUCamera() {
    let lruCamera = this.cameraQueue.shift();
    this.cameraQueue.push(lruCamera);
    return lruCamera;
  }

  //unused
  getLRUCameraActive() {
    let lruCameraActive = this.cameraActiveQueue.shift();
    this.cameraActiveQueue.push(lruCameraActive);
    return lruCameraActive;
  }

  getLRUCameraIndex() {
    let lruCameraIndex = this.cameraIndexQueue.shift();
    this.lruCameraIndex.push(lruCameraIndex);
    return lruCameraIndex;
  }
}

window.onload = function () {
  engine.init("GLCanvas");

  let myGame = new MyGame();
  myGame.start();
};
