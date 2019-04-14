import { DrawingBase, Drawing } from './drawing'
import { Postable, postable } from 'worker-postable';
import { DrawingType } from './drawing-type';
import { Vector2Property, Vector2PropertyBase } from './property';
import PostableVector2 from 'util/postable_vector2';
import { vec2, vec3, mat3 } from 'gl-matrix';
import { MaskDrawing, MaskDrawingBase } from './mask';
import { VideoResource } from 'internal/resource';

export interface VideoDrawingBase extends DrawingBase {
  masks: MaskDrawingBase[];
}

@Postable
export default class VideoDrawing extends Drawing implements VideoDrawingBase {

  videoResource: VideoResource;
  @postable masks: MaskDrawing[] = [];

  constructor(videoResource: VideoResource, position: Vector2Property, scale: Vector2Property) {
    super(DrawingType.VIDEO, position, scale);
    this.videoResource = videoResource;
  }

  containsPoint(time: number, x: number, y: number): boolean {
    return false;
    // const mat = this.getTransformMatrix(time);
    // const size = this.size.getInterpolatedPropertyValue(time);
    // let p1 = vec2.fromValues(0, 0),
    //     p2 = vec2.fromValues(size.x, size.y);
    // vec2.transformMat2d(p1, p1, mat);
    // vec2.transformMat2d(p2, p2, mat);

    // return (p1[0] <= x && x <= p2[0] && p1[1] <= y && y <= p2[1]);
  }

  addMask(mask: MaskDrawing) {
    this.masks.push(mask);
    this.addDrawing(mask);
  }

}