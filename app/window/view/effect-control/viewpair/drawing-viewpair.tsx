import * as React from 'react'

import { observer } from "window/app-mobx";
import { PropertyViewProps, KeyframeViewProps } from '../props';
import { Property, PropertyTypes } from 'internal/drawing';

@observer
export class KeyframeTimelineView extends React.Component<PropertyViewProps<Property<PropertyTypes>>, {}> {

  constructor(props: PropertyViewProps<Property<PropertyTypes>>) {
    super(props);
  }

  render() {
    const propertyHost = this.props.propertyHost;
    const keyframes: JSX.Element[] = [];

    propertyHost.keyframeHosts.forEach(keyframeHost => {
      keyframes.push(<KeyframeView {...this.props} propertyHost={propertyHost} keyframeHost={keyframeHost}/>)
    })
    return (
      <div className='keyframes'>
        {keyframes}
      </div>
    )
  }
}




@observer
class KeyframeView extends React.Component<KeyframeViewProps, {}> {

  constructor(props: KeyframeViewProps) {
    super(props);
  }

  render() {
    const controller = this.props.controller;
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItem = controller.trackItemHost.trackItem;
    const keyframeHost = this.props.keyframeHost;
    const keyframe = keyframeHost.keyframe;
    const time = keyframe.timecode - trackItem.baseTime;
    const style = {
      left: controller.getPositionRelativeToTimeline(time)
    }
    return (
      <div className='keyframe' style={style}></div>
    )
  }

}