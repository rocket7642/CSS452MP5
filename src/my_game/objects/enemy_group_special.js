"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import EnemyGroup from "./enemy_group.js";
import EnemyHead from "./enemy_head.js";
import EnemyWing from "./enemy_wing.js";

class EnemyGroupSpecial extends EnemyGroup{
    constructor(spriteTexture, xPos, yPos) {
        super(spriteTexture, xPos, yPos);

        this.middleWing = new EnemyWing(spriteTexture, xPos + 10, yPos, this);



        this.addToSet(this.middleWing);



    }
        

    
    // This is the draw function, make sure to setup proper drawing environment, and more
    // importantly, make sure to _NOT_ change any state.

    
    // The Update function, updates the application state. Make sure to _NOT_ draw
    // anything from this function!
    update () {
        //console.log(this.size());

        let xform = this.head.getXform();
        this.topWing.setDestination(xform.getXPos() + 10, xform.getYPos() + 6);
        this.middleWing.setDestination(xform.getXPos() + 10, xform.getYPos());
        this.bottomWing.setDestination(xform.getXPos() + 10, xform.getYPos() - 6);

        let i;
        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].update();
        }

        for (i = 0; i < this.mSet.length; i++) {
            this.mSet[i].getBBox();
            
        }

    }

    terminate()
    {
        this.destroy = true;
    }
    checkDestroy(){
        return this.destroy;
    }
    

    colliderParser(collider1, collider2){
        this.head.colliderCheck(collider1);
    }

}

export default EnemyGroupSpecial;