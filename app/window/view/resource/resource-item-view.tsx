import * as React from 'react';
import app from 'internal/app';
import { DNDInstance } from 'window/dragndrop';
import { IResource } from 'standard';

const style = require('./resource-item.scss');

interface ResourceItemViewProps {
  resource: IResource;
}

@app.mobx.observer
class ResourceItemView extends React.Component<ResourceItemViewProps, {}> {

  constructor(props: any) {
    super(props);

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  dragStartHandler(e: React.DragEvent) {
    const resource = this.props.resource;
    DNDInstance.dragStart(e, 'resource', resource);
  }

  dropHandler(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  dragEndHandler(e: React.DragEvent) {
    DNDInstance.dragEnd();
  }

  render() {
    const resource = this.props.resource;
    return (
      <div className={style.component} draggable
        onDrop={this.dropHandler}
        onDragStart={this.dragStartHandler}
        onDragEnd={this.dragEndHandler}>
        <div className='ratio-4x3'>
          <div className='fill-absolute body'>
            <div className='content'>
            </div>
            <div className='title-bar'>
              <div className='inner'>
                <div className='title'></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

}

export default ResourceItemView;