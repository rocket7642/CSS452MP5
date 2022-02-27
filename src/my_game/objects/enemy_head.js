"use strict"

import engine from "../../engine/index.js";

class EnemyHead extends engine.GameObject{
    constructor(spriteTexture, xPos, yPos, group) {
        super(null);
        //this.interpolate = new engine.LerpVec2(this.mRenderComponent().getPosition(),0.05,120);
        
        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(xPos, yPos);
        this.mRenderComponent.getXform().setSize(7.5, 7.5);
        this.mRenderComponent.setElementPixelPositions(154, 287, 0, 180);

        this.interpolate = new engine.LerpVec2(vec2.fromValues(0, 0), 0.05, 120);
        this.interpolate.config(0.05, 120);

        this.group = group;
        this.setSpeed(((Math.random() * (10 - 5) + 5)/60)); //randomly generated speed on creation

        this.setRotation(Math.random() * 360);
        this.rotVal = 0;

        
    }


    
    update(){
        super.update();
        //console.log(this.getCurrentFrontDir()[0], this.getCurrentFrontDir()[1]);
        
    }

    setRotation(angle)
    {
        let y = Math.sin(angle);
        let x = Math.cos(angle);
        this.setCurrentFrontDir(vec2.fromValues(x, y));
    }

    horizonalWallCollision()
    {
        this.setCurrentFrontDir(vec2.fromValues(this.getCurrentFrontDir()[0], -this.getCurrentFrontDir()[1]));
    }

    verticalWallCollision()
    {
        this.setCurrentFrontDir(vec2.fromValues(-this.getCurrentFrontDir()[0], this.getCurrentFrontDir()[1]));
    }

    onHit()
    {
        this.mRenderComponent.getXform().incXPosBy(5);
    }
    


}

export default EnemyHead;