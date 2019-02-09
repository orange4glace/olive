import React from 'react';

import Property from 'object/property';
import PropertyPannelControl from 'windows/property/pannel/component/property_pannel_control';
import PropertyPannelLabel from 'windows/property/pannel/component/label';
import PropertyPannelIntegerSlider from 'windows/property/pannel/component/integer_slider';

class PropertyWindow extends React.Component {

  constructor(props) {
    super(props);

    this.propertyDOM = [
      [Property.WIDTH,
      <PropertyPannelControl key={Property.WIDTH}>
        <PropertyPannelLabel>WIDTH</PropertyPannelLabel>
        <PropertyPannelIntegerSlider
            value={this.getValue(Property.WIDTH)} onChange={this.onChange(Property.WIDTH)}/>
      </PropertyPannelControl>],
      [Property.HEIGHT,
      <PropertyPannelControl key={Property.HEIGHT}>
        <PropertyPannelLabel>HEIGHT</PropertyPannelLabel>
        <PropertyPannelIntegerSlider/>
      </PropertyPannelControl>],
      [Property.POSITION,
      <PropertyPannelControl key={Property.POSITION}>
      </PropertyPannelControl>]
    ]
  }

  getValue(property) {
    
  }

  onChange(property) {

  }

  render() {
    const properties = this.props.properties;
    return (
      <div>
      
      </div>
    )
  }

}

export default PropertyWindow;