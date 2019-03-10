import * as React from 'react'

import Property, { PropertyTypes } from 'internal/drawing/property'
import { PropertyValue, Vector2PropertyValue } from 'internal/drawing/property-value'

import PropertyLabel from 'window/view/property/pannel/component/property-label'
import PostableVector2 from 'util/postable_vector2';

interface PropertyControlProps<T extends PropertyTypes> {
  label: string,
  property: Property<T>
}

class PropertyControl<T extends PropertyTypes> extends React.Component<PropertyControlProps<T>, {}> {

}

class Vector2PropertyControl extends PropertyControl<PostableVector2> {

  render() {
    return (
      <div>
        <PropertyLabel property={this.props.property}>{this.props.label}</PropertyLabel>
      </div>
    )
  }

}