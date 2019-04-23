import { Effect } from "internal/rendering/effect/effect";
import { MonitorWidgetEffectViewModel } from "window/view/monitor/model/timeline/effect-view-model";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";
import { VideoEffect } from "internal/rendering/effect/video-effect/video-effect";
import { MaskEffect } from "internal/rendering/effect/video-effect/mask-effect";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { mat2d, vec2 } from "gl-matrix";

export abstract class MonitorWidgetEffectViewModelImpl<T extends Effect> 
    implements MonitorWidgetEffectViewModel<T> {

  protected readonly timeline: Timeline;
  protected readonly trackItem: TrackItem;
  readonly effect: T;

  abstract traverse(func: Function): void;
  abstract select(x: number, y: number): MonitorWidgetSelectableViewModel;
  abstract getTransformMat(): mat2d;

}

export abstract class MonitorWidgetVideoEffectViewModelImpl<T extends VideoEffect>
    extends MonitorWidgetEffectViewModelImpl<T> {

  protected parent_: MonitorWidgetSelectableViewModel;

  constructor(parent: MonitorWidgetSelectableViewModel) {
    super();
    this.parent_ = parent;
  }

}

export class MonitorWidgetMaskEffectViewModelImpl extends MonitorWidgetVideoEffectViewModelImpl<MaskEffect> {

  traverse(func: (self: MonitorWidgetSelectableViewModel)=>void): void {
    func(this);
  }

  select(x: number, y: number): MonitorWidgetSelectableViewModel {
    const mask = this.effect;
    const currentTime = this.trackItem.getTimeoffset(this.timeline.currentTime);
    const polypath = mask.path.getInterpolatedPropertyValue(currentTime);
    const transMat = this.getTransformMat();
    // Todo: real polygon point test
    // For now, just min-max rect test is done
    let lx = Infinity, ly = Infinity, rx = -Infinity, ry = -Infinity;
    for (let i = 0; i < polypath.length; i ++) {
      let x = polypath[i].x;
      let y = polypath[i].y;
      let v = vec2.fromValues(x, y);
      vec2.transformMat2d(v, v, transMat);
      lx = Math.min(lx, v[0]);
      ly = Math.min(ly, v[1]);
      rx = Math.max(rx, v[0]);
      ry = Math.max(ry, v[1]);
    }
    if (lx <= x && x <= rx && ly <= y && y <= ry) return this;
    return null;
  }

  getTransformMat(): mat2d {
    let ret: mat2d;
    if (this.parent_)
      ret = this.parent_.getTransformMat();
    else {
      ret = mat2d.create();
      mat2d.identity(ret);
    }
    return ret;
  }

}