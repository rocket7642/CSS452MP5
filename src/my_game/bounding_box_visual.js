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

  update(){

  }

  updateBBox(minX, maxX, minY, maxY)
  {
    this.topLeft = vec2.fromValues(minX, maxY);
    this.topRight = vec2.fromValues(maxX, maxY);
    this.bottomLeft = vec2.fromValues(minX, minY);
    this.bottomRight = vec2.fromValues(maxX, minY);

    this.topLine = ;
    this.bottomLine = ;
    this.leftLine = ;
    this.rightLine = ;

    this.mCurrentLine.setFirstVertex(x, y);
    this.mCurrentLine.setFirstVertex(x, y);
                this.mCurrentLine.setPointSize(5.0);
                this.mCurrentLine.setShowLine(this.mShowLine);
  }


  draw(mCamera){
    this.topLine.draw(mCamera);
    this.bottomLine.draw(mCamera);
    this.leftLine.draw(mCamera);
    this.rightLine.draw(mCamera);
  }

}





export default BoxBoundingVisual;
