import DrawingRenderer from "./drawing";
import { PaperBase } from "internal/drawing";
import { Posted } from "worker-postable";
import { DrawingContext } from "./drawing-context";

@Posted('Paper')
export class PaperRenderer extends DrawingRenderer implements PaperBase {

  constructor() {
    super();
  }

  protected drawSelf(context: DrawingContext) {
    
  }
  
}