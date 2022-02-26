import engine from "../../engine";

const unitPerSec = 120;
const fps = 60;

class DyePack {
  // Init with texture and position
  constructor(texture, pos) {
    this.dyePack = new engine.SpriteRenderable(texture);
    this.dyePack.getXform().setSize(2, 3.25);
    this.dyePack.getXform().setPosition(pos[0], pos[1]);

    this.oscillate = false;
    this.speed = unitPerSec / fps;
    this.lifeSpan = 5;
    this.position = null;
    this.destroyable = false;
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
