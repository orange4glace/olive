import React from 'react';

import ResourceCommutor from 'windows/commutor/resource-commutor';

import style from './resource-item.scss';

@observer
class ResourceItem extends React.Component {

  constructor(props) {
    super(props);
  }

  dragStartHandler(e) {
    const resource = this.props.resource;
    console.log("Drag start");
    ResourceCommutor.setData(resource);
  }

  dropHandler(e) {
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

export default ResourceItem;