import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import PostableVector2 from 'util/postable_vector2';
import PropertyLabel from '../../form/pannel/component/property-label';
import { Property, PropertyTypes, Vector2Property, Drawing } from 'internal/drawing';

import * as style from './style.scss'
import Timeline from 'internal/timeline/timeline';
import { NumberInput } from '../../form/pannel/component/number-input';
import { PropertyHost } from 'window/view/timeline/controller/property-host';
import { DrawingHost } from 'window/view/timeline/controller/drawing-host';
import { TrackItemHost } from 'window/view/timeline/controller';
import { Vector2 } from 'oliveutil/vector2';
import TrackItem from 'internal/timeline/track-item';
import { EffectControlPropertyViewProps } from '../../props';

interface PropertyControlViewProps<T extends PropertyTypes> extends EffectControlPropertyViewProps<Property<T>> {
  label: string
}

class PropertyControlView<T extends PropertyTypes> extends React.Component<PropertyControlViewProps<T>, {}> {

  @computed get currentPropertyValue(): T {
    const timeline = this.props.controller.timelineViewController.timelineHost.timeline;
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    return property.getInterpolatedPropertyValue(time);
  }

}

@observer
class PropertyAnimatedDecorator extends React.Component<PropertyControlViewProps<any>, {}> {

  constructor(props: PropertyControlViewProps<any>) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    const controller = this.props.controller;
    const timeline = controller.timelineViewController.timelineHost.timeline;
    const trackItem = controller.trackItemHost.trackItem;
    const property = this.props.propertyHost.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    property.setAnimated(!property.animated);
    property.addKeyframeAt(time, property.cloneValue(property.defaultKeyframe.value));
  }

  render() {
    const property = this.props.propertyHost.property;
    return (
      <div className={`animated ${property.animated ? 'true' : 'false'}`} onClick={this.clickHandler}>
      </div>
    )
  }

}

@observer
export class Vector2PropertyControlView extends PropertyControlView<PostableVector2> {

  constructor(props: any) {
    super(props);

    this.xValueChangeHandler = this.xValueChangeHandler.bind(this);
    this.yValueChangeHandler = this.yValueChangeHandler.bind(this);
  }

  xValueChangeHandler(val: number) {
    const timeline = this.props.controller.timelineViewController.timelineHost.timeline;
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    let value = property.createValue(val, this.currentPropertyValue.y);
    property.addKeyframeAt(time, value);
  }

  yValueChangeHandler(val: number) {
    const timeline = this.props.controller.timelineViewController.timelineHost.timeline;
    const trackItem = this.props.trackItemHost.trackItem;
    const property = this.props.propertyHost.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    let value = property.createValue(this.currentPropertyValue.x, val);
    property.addKeyframeAt(time, value);
  }

  render() {
    return (
      <div className={style.component}>
        <div className='label-space'>
          <PropertyAnimatedDecorator {...this.props}/>
          <div className='label'>{this.props.label}</div>
        </div>
        <div className='value-space'>
          <NumberInput value={this.currentPropertyValue.x} onChange={this.xValueChangeHandler}/>
          <NumberInput value={this.currentPropertyValue.y} onChange={this.yValueChangeHandler}/>
        </div>
      </div>
    )
  }

}

@observer
export class PolypathPropertyControlView extends PropertyControlView<Vector2[]> {

  constructor(props: any) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <div className='label-space'>
          <PropertyAnimatedDecorator {...this.props}/>
          <div className='label'>{this.props.label}</div>
        </div>
        <div className='value-space'>
        </div>
      </div>
    )
  }

}