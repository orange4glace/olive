import Drawing, { DrawingBase } from './drawing';

export interface PaperBase extends DrawingBase {

}

export default class Paper extends Drawing implements PaperBase {

  constructor() {
    super();
  }
  
}