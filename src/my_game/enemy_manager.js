"use strict"

import engine from "../engine/index.js";
import EnemyGroup from "./objects/enemy_group.js";

class EnemyManager
{
    constructor(spriteTexture)
    {
        this.framesToNextSpawn = 0;
        this.spriteTexture = spriteTexture;
        this.enemySet = [];
    }

    spawn()
    {
        let xSpawn = (Math.random() * (112 - 38) - 75);
        let ySpawn = (Math.random() * (400 - 201) + 200);
        let newEnemy = new EnemyGroup(this.spriteTexture, xSpawn, ySpawn);
        this.enemySet.push(newEnemy);
    }

    draw(camera)
    {
        for(let i = 0; i < this.enemySet.length; i++)
        {
            this.enemySet[i].draw(camera);
        }
    }

    update()
    {
        this.framesToNextSpawn--;
        if(this.framesToNextSpawn <= 0)
        {
            this.framesToNextSpawn = (Math.random() * (30) + 60);
            this.spawn();
        }

        for(let i = 0; i < this.enemySet.length; i++)
        {
            this.enemySet[i].update();
        }
    }

}

export default EnemyManager;