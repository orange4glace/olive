import DragAndDropObject from "./dragndrop-object";
import { EventEmitter2 } from "eventemitter2";

export default class DragAndDrop {

  private type: string;
  private data: any;
  ee: EventEmitter2;

  constructor() {
    this.ee = new EventEmitter2();
  }

  dragStart(e: React.DragEvent | DragEvent, type: string, data: any) {
    e.dataTransfer.setData('text/html', null); //cannot be empty string
    console.log('[DND] Drag start', type, data);
    this.type = type;
    this.data = data;
    this.ee.emit('dragstart', e, type, data);
  }

  dragEnd() {
    console.log('[DND] Drag end');
    this.type = null;
    this.data = null;
    this.ee.emit('dragend');
  }

  getData(): any {
    return this.data;
  }

  getType(): string {
    return this.type;
  }

}