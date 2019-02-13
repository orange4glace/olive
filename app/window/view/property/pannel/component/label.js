import React from 'react';

import style from './style.scss';

class PropertyPannelLabel extends React.Component {

  render() {
    return (
      <div className='property-pannel label'>
        {this.props.children}
      </div>
    )
  }

}

export default PropertyPannelLabel;