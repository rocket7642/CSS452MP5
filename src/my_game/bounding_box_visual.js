"use strict";

import engine from "../engine/index.js";

class BoundingBoxVisual
{
  constructor(){
    this.top = top;
    this.left = left;
    this.right = right;
    this.bottom = bot;

  }

  update(){

  }

  updateBBox(minX, maxX, minY, maxY)
  {
    this.topLeft = vec2.fromValues(minX, maxY);
    this.topRight = vec2.fromValues(maxX, maxY);
    this.bottomLeft = vec2.fromValues(minX, minY);
    this.bottomRight = vec2.fromValues(maxX, minY);
  }


  draw(mCamera){

  }

}





export default BoxBoundingVisual;
