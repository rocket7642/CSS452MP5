"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import EnemyHead from "./enemy_head.js";
import EnemyWing from "./enemy_wing.js";

class EnemyGroup extends engine.GameObjectSet{
    constructor(spriteTexture, xPos, yPos) {
        super(null);
        this.head = new EnemyHead(spriteTexture, xPos, yPos);
        this.topWing = new EnemyWing(spriteTexture, xPos, yPos);
        this.bottomWing = new EnemyWing(spriteTexture, xPos, yPos);

        this.addToSet(this.head);
        this.addToSet(this.topWing);
        this.addToSet(this.bottomWing);

        this.bBox = this.mSet[0].getBBox();

        this.minX = this.bBox.minX();
        this.maxX = this.bBox.maxX();
        this.minY = this.bBox.minY();
        this.maxY = this.bBox.maxY();

        
        this.box = new engine.BoundingBox(vec2.fromValues((this.minX+this.maxX)/2, (this.minY+this.maxY)/2), 9, 12);
    }
        

    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.

    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
        //console.log(this.size());

        let xform = this.head.getXform();
        this.topWing.setDestination(xform.getXPos() + 10, xform.getYPos() + 6);
        this.bottomWing.setDestination(xform.getXPos() + 10, xform.getYPos() - 6);

        let i;
        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].update();
        }

        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].getBBox();
            
        }

    }
    

}

export default EnemyGroup;