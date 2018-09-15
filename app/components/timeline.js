import React from 'react';
import { observer } from 'mobx-react';

@observer
class Timeline extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const timeline = this.props.timeline;
    return (
      <div>
        <button onClick={()=>timeline.AddTimelineLayer()}>ADD LAYER</button>
        {
          Object.keys(timeline.layers).map(layer_key => (
            <div key={layer_key}>{timeline.layers[layer_key].id}</div>
          ))
        }
      </div>
    )
  }

}

export default Timeline;