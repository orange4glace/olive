import * as React from 'react'
import { Property } from 'internal/drawing';
import { observer } from 'window/app-mobx';
import Timeline from 'internal/timeline/timeline';
import TrackItem from 'internal/timeline/track-item';

interface PropertyProps {
  timeline: Timeline;
  trackItem: TrackItem;
  property: Property<any>;
}

@observer
export class PropertyAnimatedDecorator extends React.Component<PropertyProps, {}> {

  constructor(props: PropertyProps) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    const time = this.props.timeline.currentTime - this.props.trackItem.baseTime;
    this.props.property.setAnimated(!this.props.property.animated);
    this.props.property.addKeyframeAt(time, this.props.property.cloneValue(this.props.property.defaultValue));
  }

  render() {
    return (
      <div className={`animated ${this.props.property.animated ? 'true' : 'false'}`} onClick={this.clickHandler}>
      </div>
    )
  }

}