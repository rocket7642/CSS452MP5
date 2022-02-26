"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";

const unitPerSec = 120;
const fps = 60;

class DyePack extends engine.GameObject {
  // Init with texture and position
  constructor(texture, x, y) {
    super(null);
    this.dyePack = new engine.SpriteRenderable(texture);
    this.dyePack.getXform().setSize(2, 3.25);
    this.dyePack.getXform().setPosition(x, y);
    this.dyePack.setElementPixelPositions(509, 595, 23, 153);
    this.dyePack.getXform().setRotationInDegree(90);
    this.dyePack.setColor([1, 1, 1, 0]);

    this.oscillate = false;
    this.destroyable = false;
    this.speed = unitPerSec / fps;
    this.lifeSpan = 5;
    this.position = null;
    this.oscillatePos = [];
  }

  update(mCamera) {
    let xform = this.dyePack.getXform();
    this.checkDestroyable();
    xform.incXPosBy(this.speed);
  }

  checkDestroyable() {
    let xform = this.dyePack.getXform();
    if (this.lifeSpan <= 0) {
      this.destroyable = true;
    }
    this.lifeSpan -= 2 / fps;

    if (
      xform.getXPos() > 100 ||
      xform.getYPos() < -100 ||
      xform.getYPos() > 75 ||
      xform.getYPos() > 75
    ) {
      this.destroyable = true;
    }

    console.log(this.destroyable);
  }

  draw(mCamera) {
    this.dyePack.draw(mCamera);
    // console.log(this.dyePack.getXform().getPosition());
  }

  isDestroyable() {
    return this.destroyable;
  }
}

export default DyePack;
