import * as React from 'react';

import ObjectBasePannel from 'window/view/property/pannel/object-base-pannel'

// import Property from 'object/property';
// import PropertyPannelControl from 'windows/property/pannel/component/property_pannel_control';
// import PropertyPannelLabel from 'windows/property/pannel/component/label';
// import PropertyPannelIntegerSlider from 'windows/property/pannel/component/integer_slider';

export default class PropertyView extends React.Component {

  constructor(props: any) {
    super(props);
/*
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
*/
  }

  render() {
    return (
      <div>
      
      </div>
    )
  }

}