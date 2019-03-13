import Drawing, { DrawingBase } from './drawing';
import { DrawingType } from './drawing-type';

export interface PaperBase extends DrawingBase {

}

export default class Paper extends Drawing implements PaperBase {

  constructor() {
    super(DrawingType.PAPER);
  }
  
}