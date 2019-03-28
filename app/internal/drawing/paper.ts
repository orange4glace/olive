import { DrawingBase, Drawing } from './drawing';
import { DrawingType } from './drawing-type';
import { Postable } from 'worker-postable';

export interface PaperBase extends DrawingBase {

}

@Postable
export default class Paper extends Drawing implements PaperBase {

  constructor() {
    super(DrawingType.PAPER);
  }
  
}