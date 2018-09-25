import React from 'react';

import style from './index.scss';

@observer
class ResourceWindow extends React.Component {

  constructor(props) {
    super(props);
  }

  dragOverHandler(e) {
    e.preventDefault();
  }

  dropHandler(e) {
    e.preventDefault();
    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i ++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          console.log('... file[' + i + '].name = ' + file.path);
        }
      }
    }
  }

  render() {
    return (
      <div className={style.component}
          onDragOver={e=>this.dragOverHandler(e)}
          onClick={e=>this.dragHandler(e)}
          onDrag={e=>this.dragHandler(e)}
          onDrop={e=>this.dropHandler(e)}>
      </div>
    )
  }

}

export default ResourceWindow;