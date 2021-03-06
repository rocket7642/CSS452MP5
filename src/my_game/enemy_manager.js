"use strict";

import engine from "../engine/index.js";
import EnemyGroup from "./objects/enemy_group.js";
import EnemyGroupSpecial from "./objects/enemy_group_special.js";

class EnemyManager {
  constructor(spriteTexture) {
    this.framesToNextSpawn = 0;
    this.spriteTexture = spriteTexture;
    this.enemySet = [];
    this.autoSpawning = true;
  }

  spawn() {
    let xSpawn = Math.random() * (200 - 101);
    let ySpawn = Math.random() * (112 - 38) - 38;

    let newEnemy = null;
    //let r = Math.random * 5;
    //console.log(r);
    if (Math.random() * 5 > 4) {
      //console.log("Spawning special enemy");
      newEnemy = new EnemyGroupSpecial(this.spriteTexture, xSpawn, ySpawn);
    } else {
      newEnemy = new EnemyGroup(this.spriteTexture, xSpawn, ySpawn);
    }
    this.enemySet.push(newEnemy);
    //console.log("enemy at: " + xSpawn + " " + ySpawn);
  }

  draw(camera) {
    for (let i = 0; i < this.enemySet.length; i++) {
      this.enemySet[i].draw(camera);
    }
  }

  update(colliderDye) {
    this.framesToNextSpawn--;
    //console.log((this.framesToNextSpawn <= 0 && this.autoSpawning));
    if (this.framesToNextSpawn <= 0 && this.autoSpawning) {
      //console.log("hello!");
      this.framesToNextSpawn = Math.random() * 30 + 60;
      this.spawn();
    }

    for (let i = 0; i < this.enemySet.length; i++) {
      if (this.enemySet[i].checkDestroy()) {
        this.enemySet.splice(i, 1);
      } else {
        this.enemySet[i].update();
      }
    }

    if (engine.input.isKeyClicked(engine.input.keys.C)) {
      this.spawn();
    }
  }

  toggleAutoSpawn() {
    this.autoSpawning = !this.autoSpawning;
  }


  toggleBBvisible(){
    for (let i = 0; i < this.enemySet.length; i++) {
      this.enemySet[i].toggleDrawBoxes();
    }
  }

  getEnemyHead(index) {
    return this.enemySet[index].getHead();
  }

  getEnemyTopWing(index) {
    return this.enemySet[index].getTopWing();
  }

  getEnemyBottomWing(index) {
    return this.enemySet[index].getBottomWing();
  }

  getEnemyCount() {
    return this.enemySet.length;
  }
}

export default EnemyManager;
