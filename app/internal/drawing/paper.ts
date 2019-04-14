import { DrawingBase, Drawing } from './drawing';
import { DrawingType } from './drawing-type';
import { Postable } from 'worker-postable';
import { Vector2Property } from './property';

export interface PaperBase extends DrawingBase {

}

@Postable
export default class Paper extends Drawing implements PaperBase {

  constructor(position: Vector2Property, scale: Vector2Property) {
    super(DrawingType.PAPER, position, scale);
  }
  
}