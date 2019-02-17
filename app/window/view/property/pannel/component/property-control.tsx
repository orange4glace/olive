import * as React from 'react'

import PropertyValue, {
    Vector2PropertyValue } from 'internal/object/property-value'

import PropertyLabel from 'window/view/property/pannel/component/property-label'

interface PropertyControlProps<T extends PropertyValue<any>> {
  label: string,
  property: T
}

class PropertyControl<T extends PropertyValue<any>> extends React.Component<PropertyControlProps<T>, {}> {

}

class Vector2PropertyControl extends PropertyControl<Vector2PropertyValue> {

  render() {
    return (
    )
  }

}