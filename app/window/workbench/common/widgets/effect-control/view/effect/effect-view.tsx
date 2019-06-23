import * as style from './effect-view.scss'
import * as React from 'react'
import { ITimeline } from 'internal/timeline/base/timeline';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { Effect } from 'internal/rendering/effect/base/effect';
import { Disposable } from 'base/common/lifecycle';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';
import { observer } from 'mobx-react';

export abstract class EffectControlEffectView<T extends Effect> extends Disposable {

  private name_: string;
  public get name() { return this.name_; }

  constructor(
    name: string,
    protected readonly timeline: ITimeline,
    protected readonly trackItem: ITrackItem,
    protected readonly effect: T,
    public readonly timelineScrollView: TimelineScrollView,
    public readonly viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super();
    this.name_ = name;
  }

  renderForm() {
    return (
      <div className={`effect-form ${style.component}`}>
        <div className='label'>{this.name}</div>
        <div className='content'>
          {this.renderFormContent()}
        </div>
      </div>
    )
  }

  renderTimeline() {
    return (
      <div className={`effect-timeline ${style.component}`}>
        <div className='blank'/>
        <div className='content'>
          {this.renderTimelineContent()}
        </div>
      </div>
    )
  }

  protected abstract renderFormContent(): React.ReactNode;
  protected abstract renderTimelineContent(): React.ReactNode;

}