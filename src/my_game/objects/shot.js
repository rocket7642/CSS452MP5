"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../engine/index.js";

class Shot {
    constructor(projTexture, x, y) {
        super(null);

        this.mRenderComponent = new engine.SpriteRenderable(projTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(0, 0);
        this.mRenderComponent.getXform().setSize(2, 3.25);
        this.mRenderComponent.getXform().
        this.mRenderComponent.setElementPixelPositions(509, 595, 23, 153);
    }
        
    init() {
    }
    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.
    draw() {
    }
    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
    }
}

export default Shot;