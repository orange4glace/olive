import React from 'react';

import PropertyPannelLabel from 'windows/property/pannel/component/label';
import PropertyPannelIntegerSlider from 'windows/property/pannel/component/integer_slider';

import style from './figure.scss';

class FigurePropertyPannel extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        <div className='row'>
          <PropertyPannelLabel>WIDTH</PropertyPannelLabel>
          <PropertyPannelIntegerSlider/>
        </div>
      </div>
    )
  }

}

export default FigurePropertyPannel;