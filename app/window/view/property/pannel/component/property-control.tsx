import * as React from 'react'
import { computed, observer } from 'window/app-mobx';

import PropertyLabel from 'window/view/property/pannel/component/property-label'
import PostableVector2 from 'util/postable_vector2';
import { Property, PropertyTypes, Vector2Property } from 'internal/drawing';

interface PropertyControlProps<T extends PropertyTypes> {
  label: string,
  timeoffset: number;
  property: Property<T>;
}

class PropertyControl<T extends PropertyTypes> extends React.Component<PropertyControlProps<T>, {}> {

  @computed get currentPropertyValue(): T {
    console.log('computed')
    return this.props.property.getValueAt(this.props.timeoffset);
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
    let value = property.createValue(+e.target.value, this.currentPropertyValue.y);
    property.addKeyframeAt(this.props.timeoffset, value);
  }

  yValueChangeHandler(e: any) {
    const property = this.props.property as Vector2Property;
    let value = property.createValue(this.currentPropertyValue.x, +e.target.value);
    property.addKeyframeAt(this.props.timeoffset, value);
  }

  render() {
    return (
      <div>
        <PropertyLabel property={this.props.property}>{this.props.label}</PropertyLabel>
        <input value={this.currentPropertyValue.x} onChange={this.xValueChangeHandler}/>
        <input value={this.currentPropertyValue.y} onChange={this.yValueChangeHandler}/>
      </div>
    )
  }

}