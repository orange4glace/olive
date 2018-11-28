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
    let filePaths = [];
    if (e.dataTransfer.items) {
      for (var i = 0; i < e.dataTransfer.items.length; i ++) {
        if (e.dataTransfer.items[i].kind === 'file') {
          var file = e.dataTransfer.items[i].getAsFile();
          filePaths.push(file.path);
        }
      }
    }
    if (filePaths.length) {
      resourceBackground.requestMetadata(filePaths)
    }
  }

  render() {
    return (
      <div className={style.component}>
      </div>
    )
  }

}

export default ResourceWindow;