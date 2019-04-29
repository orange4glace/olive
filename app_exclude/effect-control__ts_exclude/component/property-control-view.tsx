import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import PostableVector2 from 'util/postable_vector2';

import * as style from './style.scss'
import { Vector2 } from 'oliveutil/vector2';
import { PropertyTypes } from 'internal/rendering/effect/property/property';
import { EffectControlPropertyViewProps } from '../property/props';

@observer
class PropertyAnimatedDecorator extends React.Component<PropertyControlViewProps<any>, {}> {

  constructor(props: PropertyControlViewProps<any>) {
    super(props);
    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e: React.MouseEvent) {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const property = this.props.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    property.setAnimated(!property.animated);
    property.addKeyframeAt(time, property.cloneValue(property.defaultKeyframe.value));
  }

  render() {
    const property = this.props.property;
    return (
      <div className={`animated ${property.animated ? 'true' : 'false'}`} onClick={this.clickHandler}>
      </div>
    )
  }

}



