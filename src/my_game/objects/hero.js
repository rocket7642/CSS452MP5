"use strict"; // Operate in Strict mode such that variables must be declared before used!

import engine from "../../engine/index.js";
import DyePack from "./dyepack.js";

class Hero extends engine.GameObject {
  constructor(spriteTexture, projTexture) {
    super(null);
    this.kDelta = 0.3;

    this.mRenderComponent = new engine.SpriteRenderable(spriteTexture);
    this.mRenderComponent.setColor([1, 1, 1, 0]);
    this.mRenderComponent.getXform().setPosition(0, 0);
    this.mRenderComponent.getXform().setSize(9, 12);
    this.mRenderComponent.setElementPixelPositions(0, 120, 0, 180);

    this.interpolate = new engine.LerpVec2(vec2.fromValues(0, 0), 0.05, 120);
    this.interpolate.setFinal(vec2.fromValues(50, 50));
    this.interpolate.config(0.05, 120);

    this.ocelX = new engine.Oscillate(4.5, 4, 60);
    this.ocelY = new engine.Oscillate(6, 4, 60);

    this.box = new engine.BoundingBox(
      this.mRenderComponent.getXform().getPosition(),
      9,
      12
    );

    this.shotText = projTexture;

    this.shotSet = new engine.GameObjectSet();
  }

  update(mCamera) {
    let xform = this.getXform();
    if (mCamera.isMouseInViewport()) {
      this.interpolate.setFinal(
        vec2.fromValues(mCamera.mouseWCX(), mCamera.mouseWCY())
      );
      this.interpolate.update();
      this.mRenderComponent
        .getXform()
        .setPosition(this.interpolate.get()[0], this.interpolate.get()[1]);
    }

    if (engine.input.isKeyClicked(engine.input.keys.Space)) {
      this.spawnProj();
    }
    if (engine.input.isKeyClicked(engine.input.keys.Q)) {
      this.ocelY.reStart();
      this.ocelX.reStart();
    }
    if (!this.ocelX.done() && !this.ocelY.done()) {
      this.mRenderComponent.getXform().incHeightBy(this.ocelX.getNext());
      this.mRenderComponent.getXform().incWidthBy(this.ocelY.getNext());
    } else {
      this.mRenderComponent.getXform().setSize(9, 12);
    }
    this.shotSet.update();
    this.destroyShots();
    // console.log(xform.getXPos() + " " + xform.getYPos());
  }

  draw(aCamera) {
    super.draw(aCamera);
    this.shotSet.draw(aCamera);
  }

  spawnProj() {
    this.shotSet.addToSet(
      new DyePack(
        this.shotText,
        this.mRenderComponent.getXform().getXPos() + 4,
        this.mRenderComponent.getXform().getYPos() + 3.5
      )
    );
  }

  triggerShake() {
    this.ocelY.reStart();
    this.ocelX.reStart();
  }

  collideCheck(collider) {
    if (this.box.intersectsBound(collider)) {
      triggerShake();
    }
  }

  destroyShots() {
    for (let i = 0; i < this.shotSet.size(); i++) {
      if (this.shotSet.getObjectAt(i).isDestroyable()) {
        this.shotSet.removeFromSet(this.shotSet.getObjectAt(i));
      }
    }
  }
}

export default Hero;
