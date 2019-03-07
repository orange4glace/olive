import * as React from 'react'

import Property from 'internal/object/property'
import PropertyValue, {
    Vector2PropertyValue } from 'internal/object/property-value'

import PropertyLabel from 'window/view/property/pannel/component/property-label'

interface PropertyControlProps<T extends PropertyValue<any>> {
  label: string,
  property: Property<T>
}

class PropertyControl<T extends PropertyValue<any>> extends React.Component<PropertyControlProps<T>, {}> {

}

class Vector2PropertyControl extends PropertyControl<Vector2PropertyValue> {

  render() {
    return (
      <div>
        <PropertyLabel property={this.props.property}>{this.props.label}</PropertyLabel>
        <input value={this.props.property.evaluatedValue.value.x}/>
      </div>
    )
  }

}