import * as React from 'react'

import { PropertyTypes } from "internal/rendering/effect/property/property";
import { computed } from "window/app-mobx";
import { EffectControlPropertyViewProps } from './props';

export class EffectControlPropertyFormView<T extends PropertyTypes> extends React.Component<EffectControlPropertyViewProps<T>, {}> {

  @computed get currentPropertyValue(): T {
    const timeline = this.props.timeline;
    const trackItem = this.props.trackItem;
    const property = this.props.property;
    const time = timeline.currentTime - trackItem.time.start + trackItem.baseTime;
    return property.getInterpolatedPropertyValue(time);
  }

}