"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import { vec2 } from "../../lib/gl-matrix.js";
import shot from "/shot.js";

class Hero extends engine.GameObject {
    constructor(spriteTexture, projTexture) {
        super(null);
        this.kDelta = 0.3;
        this.interpolate = new engine.LerpVec2(getXform().getPosition(),0.05,120);
        

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(0, 0);
        this.mRenderComponent.getXform().setSize(9, 12);
        this.mRenderComponent.setElementPixelPositions(0, 120, 0, 180);
    }

    update(mCamera) {
        // control by WASD
        let xform = this.getXform();
        if (mCamera.isMouseInViewport()) {
            this.interpolate.setFinal(new vec2(mCamera.mouseWCX(),mCamera.mouseWCY()));
            this.dye.getXform().setPosition(this.interpolate._interpolateValue());
        }

        if(engine.input.isKeyClicked(engine.input.keys.Space)){
            this.spawnProj();
        }
        if(engine.input.isKeyClicked(engine.input.keys.Q)){
            
        }
    }

    spawnProj(){
        
    }
}

export default Hero;