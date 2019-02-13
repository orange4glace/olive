import * as React from 'react';
import app from 'internal/app';
import Resource from 'internal/resource/resource';

const style = require('./resource-item.scss');

interface ResourceItemViewProps {
  resource: Resource;
}

@app.mobx.observer
class ResourceItemView extends React.Component<ResourceItemViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  dragStartHandler(e: React.DragEvent) {
    const resource = this.props.resource;
    console.log("Drag start");
  }

  dropHandler(e: React.DragEvent) {
    e.preventDefault();
    console.log("Drag");
    console.log(e.dataTransfer.getData('text'));
    e.stopPropagation();
  }

  render() {
    const resource = this.props.resource;
    return (
      <div className={style.component} draggable
        onDrop={e=>this.dropHandler(e)}
        onDragStart={e=>this.dragStartHandler(e)}>
        <div className='ratio-4x3'>
          <div className='fill-absolute body'>
            <div className='content'>
            </div>
            <div className='title-bar'>
              <div className='inner'>
                <div className='title'>{resource.path}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ResourceItemView;