import React from 'react';
import { observer } from 'mobx-react';

@observer
class Layers extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <div className='toolbar'>
        </div>
        <div className='layers'>
          {
            app.iterateLayers(layer => {
              <div className='layer'>
                {layer.id}
              </div>
            })
          }
        </div>
      </React.Fragment>
    )
  }

}

export default Layers;