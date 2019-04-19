import * as React from 'react'
import { observer } from "window/app-mobx";
import { EffectControlPropertyFormView } from './property-viewpair';
import PostableVector2 from 'util/postable_vector2';

@observer
export class Vector2PropertyControlView extends EffectControlPropertyFormView<PostableVector2> {

  constructor(props: any) {
    super(props);

    this.xValueChangeHandler = this.xValueChangeHandler.bind(this);
    this.yValueChangeHandler = this.yValueChangeHandler.bind(this);
  }

  xValueChangeHandler(val: number) {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const property = this.props.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    let value = property.createValue(val, this.currentPropertyValue.y);
    property.addKeyframeAt(time, value);
  }

  yValueChangeHandler(val: number) {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const property = this.props.property;
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