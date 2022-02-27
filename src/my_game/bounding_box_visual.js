"use strict";

import engine from "../engine/index.js";

class BoundingBoxVisual
{
  constructor(){
    this.topLeft;
    this.topRight;
    this.bottomLeft;
    this.bottomRight;

    this.topLine = null;
    this.bottomLine = null;
    this.leftLine = null;
    this.rightLine = null;
    

  }

  update(minX, maxX, minY, maxY, showLine){
    this.topLeft = vec2.fromValues(minX, maxY);
    this.topRight = vec2.fromValues(maxX, maxY);
    this.bottomLeft = vec2.fromValues(minX, minY);
    this.bottomRight = vec2.fromValues(maxX, minY);

    this.topLine.setVertices(minX, maxY, maxX, maxY);
    this.topLine.setShowLine(showLine);
    this.bottomLine.setVertices(minX, minY, maxX, minY);
    this.bottomLine.setShowLine(showLine);
    this.leftLine.setVertices(minX, minY, minX, maxY);
    this.leftLine.setShowLine(showLine);
    this.rightLine.setVertices(maxX, minY, maxX, maxY);
    this.rightLine.setShowLine(showLine);

  }

  createBBox(minX, maxX, minY, maxY)
  {
    this.topLeft = vec2.fromValues(minX, maxY);
    this.topRight = vec2.fromValues(maxX, maxY);
    this.bottomLeft = vec2.fromValues(minX, minY);
    this.bottomRight = vec2.fromValues(maxX, minY);

    this.topLine = new engine.LineRenderable(minX, maxY, maxX, maxY);
    this.topLine.setPointSize(5.0);
    this.bottomLine = new engine.LineRenderable(minX, minY, maxX, minY);
    this.bottomLine.setPointSize(5.0);
    this.leftLine = new engine.LineRenderable(minX, minY, minX, maxY);
    this.leftLine.setPointSize(5.0);
    this.rightLine = new engine.LineRenderable(maxX, minY, maxX, maxY);
    this.rightLine.setPointSize(5.0);
   
    //this.mCurrentLine.setShowLine(this.mShowLine);
  }


  draw(mCamera){
    this.topLine.draw(mCamera);
    this.bottomLine.draw(mCamera);
    this.leftLine.draw(mCamera);
    this.rightLine.draw(mCamera);
  }

}
export default BoundingBoxVisual;
