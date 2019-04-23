import { Rendering } from "internal/rendering/rendering/rendering";
import { MonitorWidgetRenderingViewModel } from "window/view/monitor/model/timeline/rendering-view-model";
import { mat2d } from "gl-matrix";
import { MonitorWidgetSelectableViewModel } from "window/view/monitor/model/timeline/selectable-view-model";
import { VideoRendering } from "internal/rendering/rendering/video-rendering";
import { MonitorWidgetEffectViewModel } from "window/view/monitor/model/timeline/effect-view-model";
import { MonitorWidgetEffectViewModelImpl } from "window/view/monitor/model/timeline/effect-view-model-impl";
import { EffectType } from "internal/rendering/effect/effect";
import { TransformEffect } from "internal/rendering/effect/video-effect/transform-effect";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";

export abstract class MonitorWidgetRenderingViewModelImpl<T extends Rendering>
    implements MonitorWidgetRenderingViewModel<T> {

  protected readonly timeline_: Timeline;
  protected readonly trackItem_: TrackItem;
  readonly rendering: T;

  constructor(rendering: T) {
    this.rendering = rendering;
  }

  abstract select(x: number, y: number): MonitorWidgetSelectableViewModel;
  abstract getTransformMat(): mat2d;

}

export class MonitorWidgetVideoRenderingViewModel
    extends MonitorWidgetRenderingViewModelImpl<VideoRendering> {

  protected parent_: MonitorWidgetSelectableViewModel;
  effectViewModels: MonitorWidgetEffectViewModelImpl<any>[];

  constructor(parent: MonitorWidgetSelectableViewModel, rendering: VideoRendering) {
    super(rendering);
    this.parent_ = parent;
  }

  select(x: number, y: number) {
    let selected: MonitorWidgetSelectableViewModel = null;
    for (let i = 0; i < this.effectViewModels.length; i ++) {
      const evm = this.effectViewModels[i];
      selected = evm.select(x, y);
      if (selected) break;
    }
    return selected;
  }

  getTransformMat(): mat2d {
    let ret: mat2d;
    if (this.parent_)
      ret = this.parent_.getTransformMat();
    else {
      ret = mat2d.create();
      mat2d.identity(ret);
    }

    const currentOffsetTime = this.trackItem_.getTimeoffset(this.timeline_.currentTime);

    const effects = this.rendering.effects;
    for (let i = 0; i < effects.length; i ++) {
      const effect = effects[i];
      if (effect.type == EffectType.TRANSFORM) {
        const transformEffect = effect as TransformEffect;
        const position = transformEffect.position.getInterpolatedPropertyValue(currentOffsetTime);
        const scale = transformEffect.scale.getInterpolatedPropertyValue(currentOffsetTime);
        mat2d.translate(ret, ret, [position.x, position.y]);
        mat2d.scale(ret, ret, [scale.x, scale.y]);
      }
    }
    return ret;
  }

}