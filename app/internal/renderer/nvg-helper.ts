import NVG, { NVGType } from "../../../nanovg-webgl";

export class NVGHelper {
  vg: NVG;

  images: NVGType.image_t[] = [];
  paints: NVGType.paint_t[] = [];

  constructor(vg: NVG) {
    this.vg = vg;
  }

  createImageRGBA(w: NVGType.float, h: NVGType.float, flag: NVGType.int, ptr: NVGType.uintptr_t): NVGType.image_t {
    const image = this.vg.createImageRGBA(w, h, flag, ptr);
    this.images.push(image);
    return image;
  }

  createImagePattern(ox: NVGType.float, oy: NVGType.float, ex: NVGType.float, ey: NVGType.float,
      angle: NVGType.float, image: NVGType.image_t, alpha: NVGType.float): NVGType.paint_t {
    const pattern = this.vg.imagePattern(ox, oy, ex, ey, angle, image, alpha);
    this.paints.push(pattern);
    return pattern;
  }

  deleteImages() {
    this.images.forEach(image => {
      this.vg.deleteImage(image);
    })
    this.images = [];
  }

  freePaints() {
    this.paints.forEach(paint => {
      this.vg.freePaint(paint);
    })
    this.paints = [];
  }

}