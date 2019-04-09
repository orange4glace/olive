import * as React from 'react'
import { Property } from 'internal/drawing';
import { observer } from 'window/app-mobx';

interface PropertyLabelProps {
  property: Property<any>
}

@observer
export default class PropertyLabel extends React.Component<PropertyLabelProps, {}> {

  render() {
    var property = this.props.property;
    return (
      <div className='label'>
        { property.animatable &&
          <div className='toggle-animate'></div>
        }
        { this.props.children }
      </div>
    )
  }

}