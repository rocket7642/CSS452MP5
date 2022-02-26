"use strict"

import engine from "../../engine/index.js";

class EnemyWing extends engine.GameObject{
    constructor(spriteTexture) {
        super(null)
        //pixel positions for animations
        this.p =[
            [817,  613, 409, 205, 1,   1,   205, 409, 613, 817,  613, 409, 205, 1,   1,   205, 409, 613 ],
            [1020, 816, 612, 408, 204, 204, 408, 612, 816, 1020, 816, 612, 408, 204, 204, 408, 612, 816 ],
            [377,  377, 377, 377, 377, 215, 215, 215, 215, 215,  215, 215, 215, 215, 377, 377, 377, 377 ],
            [512,  512, 512, 512, 512, 351, 351, 351, 351, 351,  351, 351, 351, 351, 512, 512, 512, 512 ]];

        this.animationFrame = 0;    

        this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
        this.mRenderComponent.setColor([1, 1, 1, 0]);
        this.mRenderComponent.getXform().setPosition(0, 0);
        this.mRenderComponent.getXform().setSize(10, 8);
        this.setAnimation(0);
        this.interpolate = new engine.LerpVec2(vec2.fromValues(0, 0), 0.05, 120);
        


        this.destinationX = 0;
        this.destinationY = 0;
        this.interpolate.setFinal(vec2.fromValues(this.destinationX, this.destinationY));
        this.interpolate.config(0.05, 120);
    }

    init() {

    }

    update() {
        this.animationFrame++;
        if(this.animationFrame > 17)
        {
            this.animationFrame = 0;
        }
        this.setAnimation(this.animationFrame);

        this.interpolate.update();
        this.mRenderComponent.getXform().setPosition(this.interpolate.get()[0], this.interpolate.get()[1]);
        //console.log(this.interpolate.get());
        //console.log(this.mRenderComponent.getXform().getPosition());
        //temporary
        
        //2let xform = this.getXform();
        //xform.setPosition(this.destinationX, this.destinationY);
        
    }

    setDestination(destX, destY)
    {
        this.destinationX = destX;
        this.destinationY = destY;
        this.interpolate.setFinal(vec2.fromValues(this.destinationX, this.destinationY));
    }

    setAnimation(frame)
    {
        this.mRenderComponent.setElementPixelPositions(this.p[0][frame], this.p[1][frame], this.p[2][frame], this.p[3][frame]);

    }

}

export default EnemyWing;