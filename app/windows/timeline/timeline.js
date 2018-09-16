import React from 'react';
import { observer } from 'mobx-react';

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='ruler'>
      </div>
      <div className='layers'>
      </div>
    )
  }

}

export default Timeline;