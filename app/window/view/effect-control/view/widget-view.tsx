import * as React from 'react'
import { EffectControlWidget } from 'window/view/effect-control/widget';
import { observer } from 'window/app-mobx';
import { EffectControlWidgetFormView } from 'window/view/effect-control/view/form/widget-form-view';
import { EffectControlWidgetTimelineView } from 'window/view/effect-control/view/timeline/widget-timeline-view';
import { EffectControlViewOutgoingEvents } from 'window/view/effect-control/view-outgoing-events';

export interface EffectControlWidgetViewProps {
  widget: EffectControlWidget;
}

@observer
export class EffectControlWidgetView extends React.Component<EffectControlWidgetViewProps, {}> {

  outgoingEvents: EffectControlViewOutgoingEvents;

  constructor(props: any) {
    super(props);

    this.outgoingEvents = new EffectControlViewOutgoingEvents();
    this.props.widget.registerViewOutgoingEvents(this.outgoingEvents);
  }

  render() {
    if (this.props.widget.model) {
      const model = this.props.widget.model;
      return (
        <>
          <EffectControlWidgetFormView {...this.props} model={model} outgoingEvents={this.outgoingEvents}/>
          <EffectControlWidgetTimelineView key={model.viewModelID} {...this.props} model={model} outgoingEvents={this.outgoingEvents}/>
        </>
      )
    }
    else {
      return <div>No TrackItem Selected</div>
    }
  }

}