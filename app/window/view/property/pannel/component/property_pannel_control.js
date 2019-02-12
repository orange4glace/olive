import React from 'react';

class PropertyPannelControl extends React.Component {

  render() {
    return (
      <div className='property-pannel control'>
        {this.props.children}
      </div>
    )
  }

}

export default PropertyPannelControl;