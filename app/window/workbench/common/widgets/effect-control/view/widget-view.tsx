import * as style from './widget-view.scss'
import * as React from 'react'
import { Disposable } from 'base/common/lifecycle';
import { ITimeline } from 'internal/timeline/base/timeline';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { EffectControlTrackItemView, EffectControlTrackItemViewSelectorRegistry } from 'window/workbench/common/widgets/effect-control/view/track-item/track-item-view';
import { Registry } from 'platform/registry/common/platform';
import { observer } from 'mobx-react';

export class EffectControlView extends Disposable {

  private readonly timelineScrollView_: TimelineScrollView;
  public get timelineScrollView() { return this.timelineScrollView_; }

  private trackItemView_: EffectControlTrackItemView;
  public get trackItemView() { return this.trackItemView_; }

  constructor(
    protected readonly timeline: ITimeline,
    protected readonly trackItem: ITrackItem,
    public readonly viewOutgoingEvents: EffectControlViewOutgoingEvents
  ) {
    super();
    this.timelineScrollView_ = new TimelineScrollView(timeline);

    const trackItemViewCtor = Registry.as<EffectControlTrackItemViewSelectorRegistry>(EffectControlTrackItemViewSelectorRegistry.ID)
        .getView(trackItem.type);
    if (trackItemViewCtor) {
      this.trackItemView_ = new trackItemViewCtor(timeline, trackItem, this.timelineScrollView, viewOutgoingEvents);
    }
  }

  render() {
    return <ViewComponent view={this}/>
  }

}

@observer
class ViewComponent extends React.Component<{view: EffectControlView}> {

  render() {
    const view = this.props.view;
    return (
      <div className={`effect-control-content ${style.component}`}>
        <div className='form'>
          <div className='space'/>
          {view.trackItemView.renderForm()}
        </div>
        <div className='timeline'>
          {view.timelineScrollView.render(
            view.trackItemView.renderTimeline()
          )}
        </div>
      </div>
    )
  }

}