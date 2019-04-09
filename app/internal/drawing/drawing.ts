import { Postable, postable } from 'worker-postable';
import PostableVector2 from 'util/postable_vector2';
import { type } from 'os';
import { DrawingType } from './drawing-type';
import { Vector2Property, Vector2PropertyBase, Property } from './property';
import { EventEmitter2 } from 'eventemitter2';
import { mat3, vec2, mat2d } from 'gl-matrix';

export enum DrawingEvent {
  CHILD_DRAWING_ADDED = 'CHILD_DRAWING_ADDED',
  CHILD_DRAWING_REMOVED = 'CHILD_DRAWING_REMOVED',
  PROPERTY_ADDED = 'PROPERTY_ADDED',
  PROPERTY_REMOVED = 'PROPERTY_REMOVED',
}

export interface DrawingBase {
  type: DrawingType;
  position: Vector2PropertyBase;
  scale: Vector2PropertyBase;
  children: Array<DrawingBase>;
}

@Postable
export abstract class Drawing implements DrawingBase {

  @postable type: DrawingType;

  @postable position: Vector2Property;
  @postable scale: Vector2Property;
  @postable children: Array<Drawing>;

  parent: Drawing;

  properties: Property<any>[] = [];

  ee: EventEmitter2;

  constructor(type: DrawingType) {
    this.type = type;
    this.position = new Vector2Property(new PostableVector2(0, 0));
    this.scale = new Vector2Property(new PostableVector2(1, 1));

    this.ee = new EventEmitter2();

    this.children = new Array<Drawing>();

    this.addProperty(this.position);
    this.addProperty(this.scale);
  }

  addDrawing(drawing: Drawing) {
    this.children.push(drawing);
    drawing.parent = this;
    this.ee.emit(DrawingEvent.CHILD_DRAWING_ADDED, drawing);
  }

  addProperty(property: Property<any>) {
    this.properties.push(property);
  }
  
  getTransformMatrix(time: number): mat2d {
    let mat: mat2d;
    if (this.parent != null) mat = this.parent.getTransformMatrix(time);
    else {
      mat = mat2d.create();
      mat2d.identity(mat);
    }
    let translateVec = vec2.create();
    let rotateVec = vec2.create();
    let scaleVec = vec2.create();
    let position = this.position.getInterpolatedPropertyValue(time);
    let scale = this.scale.getInterpolatedPropertyValue(time);
    vec2.set(translateVec, position.x, position.y);
    vec2.set(scaleVec, scale.x, scale.y);
    mat2d.translate(mat, mat, translateVec);
    mat2d.scale(mat, mat, scaleVec);
    return mat;
  }

  /*abstract*/ containsPoint(time: number, x: number, y: number): boolean {return false;}

  


  // Event Emitter
  addEventListener(type: (DrawingEvent.CHILD_DRAWING_ADDED | DrawingEvent.CHILD_DRAWING_REMOVED),
      callback: (drawing: Drawing) => void): void;
  addEventListener(type: (DrawingEvent.PROPERTY_ADDED | DrawingEvent.PROPERTY_REMOVED),
      callback: (property: Property<any>) => void): void;
  addEventListener(type: DrawingEvent, callback: (...args: any) => void) {
    this.ee.addListener(type, callback);
  }

  removeEventListener(type: (DrawingEvent.CHILD_DRAWING_ADDED | DrawingEvent.CHILD_DRAWING_REMOVED),
      callback: (drawing: Drawing) => void): void;
  removeEventListener(type: (DrawingEvent.PROPERTY_ADDED | DrawingEvent.PROPERTY_REMOVED),
      callback: (property: Property<any>) => void): void;
  removeEventListener(type: DrawingEvent, callback: (...args: any) => void) {
    this.ee.removeListener(type, callback);
  }
  
}