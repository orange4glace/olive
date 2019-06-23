import * as style from './track-item-view.scss'
import * as React from 'react'
import { ViewSelectorRegistry } from 'window/workbench/common/widgets/common/selector-registry';
import { IConstructorSignature2, IConstructorSignature4 } from 'platform/instantiation/common/instantiation';
import { ITimeline } from 'internal/timeline/base/timeline';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { Registry } from 'platform/registry/common/platform';
import { Disposable } from 'base/common/lifecycle';
import { TimelineScrollView } from 'window/workbench/common/widgets/timeline/model/scroll-view-model';
import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';
import { observer } from 'mobx-react';

export abstract class EffectControlTrackItemView extends Disposable {

  constructor(
    timeline: ITimeline,
    trackItem: ITrackItem,
    timelineScrollView: TimelineScrollView,
    viewOutgoingEvents: EffectControlViewOutgoingEvents) {
    super();
  }

  renderForm() {
    return <FormComponent view={this}/>
  }

  renderTimeline() {
    return <TimelineComponent view={this}/>
  }

  abstract renderFormContent(): React.ReactNode;
  abstract renderTimelineContent(): React.ReactNode;

}

@observer
class FormComponent extends React.Component<{view: EffectControlTrackItemView}> {

  render() {
    const view = this.props.view;
    return (
      <div className={`track-item-form ${style.component}`}>
        <div className='label'>Track Item</div>
        {view.renderFormContent()}
      </div>
    )
  }

}

@observer
class TimelineComponent extends React.Component<{view: EffectControlTrackItemView}> {

  render() {
    const view = this.props.view;
    return (
      <div className={`track-item-timeline ${style.component}`}>
        <div className='blank'/>
        {view.renderTimelineContent()}
      </div>
    )
  }

}

export class EffectControlTrackItemViewSelectorRegistry extends ViewSelectorRegistry
  <string, IConstructorSignature4<ITimeline, ITrackItem, TimelineScrollView, EffectControlViewOutgoingEvents, EffectControlTrackItemView>> {
  static readonly ID = 'olive.workbench.registry.EffectControlTrackItemViewSelectorRegistry'
}

Registry.add(EffectControlTrackItemViewSelectorRegistry.ID, new EffectControlTrackItemViewSelectorRegistry());