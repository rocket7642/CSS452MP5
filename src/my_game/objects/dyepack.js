"use strict";  // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine";

const unitPerSec = 120;
const fps = 60;

class DyePack extends engine.GameObject {
  // Init with texture and position
  constructor(texture, pos) {
    this.dyePack = new engine.SpriteRenderable(texture);
    this.dyePack.getXform().setSize(2, 3.25);
    this.dyePack.getXform().setPosition(pos[0], pos[1]);
    this.mRenderComponent.setElementPixelPositions(509, 595, 23, 153);
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
    if (this.lifeSpan <= 0) {
      this.destroyable = true;
    }
    this.lifeSpan -= 1 / fps;
    xform.incXPosBy(this.speed);
  }
}

export default DyePack;