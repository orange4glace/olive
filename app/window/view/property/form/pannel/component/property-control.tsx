import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import PostableVector2 from 'util/postable_vector2';
import PropertyLabel from './property-label';
import { Property, PropertyTypes, Vector2Property } from 'internal/drawing';
import { PropertyAnimatedDecorator } from './property-decorator';

import * as style from './style.scss'
import TrackItem from 'internal/timeline/track-item';
import Timeline from 'internal/timeline/timeline';

interface PropertyControlProps<T extends PropertyTypes> {
  label: string,
  timeline: Timeline;
  trackItem: TrackItem;
  drawing: Drawing;
  property: Property<T>;
}

class PropertyControl<T extends PropertyTypes> extends React.Component<PropertyControlProps<T>, {}> {

  @computed get currentPropertyValue(): T {
    const time = this.props.timeline.currentTime - this.props.trackItem.baseTime;
    return this.props.property.getValueAt(time);
  }

}

@observer
export class Vector2PropertyControl extends PropertyControl<PostableVector2> {

  constructor(props: any) {
    super(props);

    this.xValueChangeHandler = this.xValueChangeHandler.bind(this);
    this.yValueChangeHandler = this.yValueChangeHandler.bind(this);
  }

  xValueChangeHandler(e: any) {
    const property = this.props.property as Vector2Property;
    const time = this.props.timeline.currentTime - this.props.trackItem.baseTime;
    let value = property.createValue(+e.target.value, this.currentPropertyValue.y);
    property.addKeyframeAt(time, value);
  }

  yValueChangeHandler(e: any) {
    const property = this.props.property as Vector2Property;
    const time = (this.props.timeline.currentTime - this.props.trackItem.baseTime);
    let value = property.createValue(this.currentPropertyValue.x, +e.target.value);
    property.addKeyframeAt(time, value);
  }

  render() {
    return (
      <div className={style.component}>
        <PropertyAnimatedDecorator timeline={this.props.timeline} trackItem={this.props.trackItem} property={this.props.property}/>
        <PropertyLabel property={this.props.property}>{this.props.label}</PropertyLabel>
        <input value={this.currentPropertyValue.x} onChange={this.xValueChangeHandler}/>
        <input value={this.currentPropertyValue.y} onChange={this.yValueChangeHandler}/>
      </div>
    )
  }

}