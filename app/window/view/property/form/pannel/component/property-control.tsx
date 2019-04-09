import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import PostableVector2 from 'util/postable_vector2';
import PropertyLabel from './property-label';
import { Property, PropertyTypes, Vector2Property } from 'internal/drawing';
import { PropertyAnimatedDecorator } from './property-decorator';

import * as style from './style.scss'
import TrackItem from 'internal/timeline/track-item';
import Timeline from 'internal/timeline/timeline';
import { NumberInput } from './number-input';
import { DrawingHost } from 'window/view/property/control/drawing-host';
import { PropertyHost } from 'window/view/property/control/property-host';
import { TrackItemHost } from 'window/view/property/control/track-item-host';

interface PropertyControlProps<T extends PropertyTypes> {
  label: string,
  timeline: Timeline;
  trackItemHost: TrackItemHost;
  drawingHost: DrawingHost<any>;
  propertyHost: PropertyHost;
}

class PropertyControl<T extends PropertyTypes> extends React.Component<PropertyControlProps<T>, {}> {

  @computed get currentPropertyValue(): T {
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property;
    const time = this.props.timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    return property.getValueAt(time);
  }

}

@observer
export class Vector2PropertyControl extends PropertyControl<PostableVector2> {

  constructor(props: any) {
    super(props);

    this.xValueChangeHandler = this.xValueChangeHandler.bind(this);
    this.yValueChangeHandler = this.yValueChangeHandler.bind(this);
  }

  xValueChangeHandler(val: number) {
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property as Vector2Property;
    const time = this.props.timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    let value = property.createValue(val, this.currentPropertyValue.y);
    property.addKeyframeAt(time, value);
  }

  yValueChangeHandler(val: number) {
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property as Vector2Property;
    const time = (this.props.timeline.currentTime - trackItem.time.start + trackItem.baseTime);
    let value = property.createValue(this.currentPropertyValue.x, val);
    property.addKeyframeAt(time, value);
  }

  render() {
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property;
    return (
      <div className={style.component}>
        <div className='label-space'>
          <PropertyAnimatedDecorator timeline={this.props.timeline} trackItem={trackItem} property={property}/>
          <PropertyLabel property={property}>{this.props.label}</PropertyLabel>
        </div>
        <div className='value-space'>
          <NumberInput value={this.currentPropertyValue.x} onChange={this.xValueChangeHandler}/>
          <NumberInput value={this.currentPropertyValue.y} onChange={this.yValueChangeHandler}/>
        </div>
      </div>
    )
  }

}