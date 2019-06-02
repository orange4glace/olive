import * as React from 'react'
import { EffectControlWidgetPropertyViewModel } from 'window/view/effect-control/model/property/property-view-model';
import { EffectControlWidget } from 'window/view/effect-control/widget';
import { EffectControlKeyframeViewModel } from 'window/view/effect-control/model/property/keyframe-view-model';
import { PropertyTypes } from 'internal/rendering/property/property';
import { observer } from 'window/app-mobx';
import ADiv from 'window/view/advanced-div';
import { EffectControlViewOutgoingEvents } from 'window/view/effect-control/view-outgoing-events';
import { StandardMouseEvent } from 'base/browser/mouseEvent';
import { createStandardMouseEvent } from 'base/olive/mouse-event';

interface MonitorWidgetKeyframeTimelineViewProps {
  widget: EffectControlWidget;
  propertyViewModel: EffectControlWidgetPropertyViewModel<any>;
  outgoingEvents:  EffectControlViewOutgoingEvents;
}

@observer
export class MonitorWidgetKeyframeTimelineView
    extends React.Component<MonitorWidgetKeyframeTimelineViewProps> {

  render() {
    const propertyVM = this.props.propertyViewModel;
    const keyframeVMs = propertyVM.keyframeViewModels;
    return (
      <div className='keyframe-timeline'>
      {[...keyframeVMs].map(keyframeVM => (
        <MonitorWidgetKeyframeView key={keyframeVM.viewModelID} {...this.props} keyframeViewModel={keyframeVM}/>
      ))}
      </div>
    )
  }

}

interface MonitorWidgetKeyframeViewProps<T extends PropertyTypes> extends MonitorWidgetKeyframeTimelineViewProps {
  keyframeViewModel: EffectControlKeyframeViewModel<T>;
}

@observer
export class MonitorWidgetKeyframeView<T extends PropertyTypes>
    extends React.Component<MonitorWidgetKeyframeViewProps<T>, {}> {

  constructor(props: any) {
    super(props);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.mouseDownMoveStartHandler = this.mouseDownMoveStartHandler.bind(this);
  }
  
  mouseDownHandler(e: React.MouseEvent) {
     this.props.outgoingEvents.emitKeyframeMouseDown({
       propertyViewModel: this.props.propertyViewModel,
       keyframeViewModel: this.props.keyframeViewModel,
       e: createStandardMouseEvent(e)
     });
  }
  
  mouseDownMoveStartHandler(e: MouseEvent) {
     this.props.outgoingEvents.emitKeyframeMouseMoveStart({
       propertyViewModel: this.props.propertyViewModel,
       keyframeViewModel: this.props.keyframeViewModel,
       e: createStandardMouseEvent(e)
     });
  }

  render() {
    const vm = this.props.keyframeViewModel;
    const timelineScrollVM = this.props.widget.model.timelineScrollViewModel;
    const style = {
      left: timelineScrollVM.getPositionRelativeToTimeline(vm.getTimeRelativeToTimeline()) + 'px'
    }
    return (
      <ADiv className={`keyframe ${vm.focused ? 'focused' : ''}`} style={style}
          onMouseDown={this.mouseDownHandler}
          onDocumentMouseMoveStart={this.mouseDownMoveStartHandler}>
      </ADiv>
    )
  }

}
