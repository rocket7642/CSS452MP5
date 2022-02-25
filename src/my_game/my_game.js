"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class MyGame extends engine.Scene {
    constructor() {
        super();

        // The camera to view the scene
        this.mCamera = null;
        this.mCameraPlayer = null;
        this.mCPActive = true;
        this.mCameraDye1 = null;
        this.mCD1Active = false;
        this.mCameraDye2 = null;
        this.mCD2Active = false;
        this.mCameraDye3 = null;
        this.mCD3Active = false;

        this.background = null;
        this.dye = null;
        this.mMsg = null;

    }
        
    init() {
        // Step A: set up the cameras
        this.mCamera = new engine.Camera(
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [0, 0, 800, 600]           // viewport (orgX, orgY, width, height)
        );
        this.mCamera.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mCameraPlayer = new engine.Camera(
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [0, 600, 200, 200]           // viewport (orgX, orgY, width, height)
        );
        this.mCameraPlayer.setBackgroundColor([0.8, 0.8, 0.8, 1]);

        this.mCameraDye1 = new engine.Camera(
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [200, 600, 200, 200]           // viewport (orgX, orgY, width, height)
        );
        this.mCameraDye1.setBackgroundColor([1, 0.8, 0.8, 1]);

        this.mCameraDye2 = new engine.Camera(
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [400, 600, 200, 200]           // viewport (orgX, orgY, width, height)
        );
        this.mCameraDye2.setBackgroundColor([0.8, 1, 0.8, 1]);

        this.mCameraDye3 = new engine.Camera(
            vec2.fromValues(30, 27.5), // position of the camera
            100,                       // width of camera
            [600, 600, 200, 200]           // viewport (orgX, orgY, width, height)
        );
        this.mCameraDye3.setBackgroundColor([0.8, 0.8, 1, 1]);

                // sets the background to gray
    
        this.mMsg = new engine.FontRenderable("Status Message");
        this.mMsg.setColor([0, 0, 0, 1]);
        this.mMsg.getXform().setPosition(-19, -8);
        this.mMsg.setTextHeight(3);
    }
    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
        // Step A: clear the canvas
        engine.clearCanvas([0.9, 0.9, 0.9, 1.0]); // clear to light gray
    
        this.mCamera.setViewAndCameraMatrix();

        this.mMsg.draw(this.mCamera);   // only draw status in the main camera

        if(this.mCPActive){
            this.mCameraPlayer.setViewAndCameraMatrix();
        }
        if(this.mCD1Active){
            this.mCameraDye1.setViewAndCameraMatrix();
        }
        if(this.mCD2Active){
            this.mCameraDye2.setViewAndCameraMatrix();
        }
        if(this.mCD3Active){
            this.mCameraDye3.setViewAndCameraMatrix();
        }
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
        //console.log("fucker");
        if(engine.input.isKeyClicked(engine.input.keys.Zero)){
            this.mCPActive = !this.mCPActive;
            console.log(this.mCPActive);
        }
        if(engine.input.isKeyClicked(engine.input.keys.One)){
            this.mCD1Active = !this.mCD1Active;
            console.log(this.mCD1Active);
        }
        if(engine.input.isKeyClicked(engine.input.keys.Two)){
            this.mCD2Active = !this.mCD2Active;
            console.log(this.mCD2Active);
        }
        if(engine.input.isKeyClicked(engine.input.keys.Three)){
            this.mCD3Active = !this.mCD3Active;
            console.log(this.mCD3Active);
        }
    }
}

window.onload = function () {
    engine.init("GLCanvas");

    let myGame = new MyGame();
    myGame.start();
}