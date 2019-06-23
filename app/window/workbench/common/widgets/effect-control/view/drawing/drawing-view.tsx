import * as style from './drawing-view.scss';
import * as React from 'react'
import { Disposable } from 'base/common/lifecycle';
import { Drawing } from 'internal/rendering/drawing/base/drawing';
import { ITimeline } from 'internal/timeline/base/timeline';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';
import { ViewSelectorRegistry } from 'window/workbench/common/widgets/common/selector-registry';
import { IConstructorSignature5 } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';

export abstract class EffectControlDrawingView<T extends Drawing> extends Disposable {

  private name_: string;
  public get name() { return this.name_; }

  constructor(
    name: string,
    protected readonly timeline: ITimeline,
    protected readonly trackItem: ITrackItem,
    protected readonly drawing: T,
    public readonly timelineScrollView: TimelineScrollView,
    public readonly viewOutgoingEvents: EffectControlViewOutgoingEvents
  ) {
    super();
    this.name_ = name;
  }

  renderForm(): React.ReactNode {
    return (
      <div className={`drawing-form ${style.component}`}>
        <div className='label'>{this.name}</div>
        {this.renderFormContent()}
      </div>
    )
  }

  renderTimeline(): React.ReactNode {
    return (
      <div className={`drawing-timeline ${style.component}`}>
        <div className='blank'></div>
        {this.renderTimelineContent()}
      </div>
    )
  }

  protected abstract renderFormContent(): React.ReactNode;
  protected abstract renderTimelineContent(): React.ReactNode;

}

export class EffectControlDrawingViewSelectorRegistry extends ViewSelectorRegistry
  <string, IConstructorSignature5<ITimeline, ITrackItem, Drawing, TimelineScrollView, EffectControlViewOutgoingEvents, EffectControlDrawingView<any>>> {
  static readonly ID = 'olive.workbench.registry.EffectControlDrawingViewSelectorRegistry'
}

Registry.add(EffectControlDrawingViewSelectorRegistry.ID, new EffectControlDrawingViewSelectorRegistry());