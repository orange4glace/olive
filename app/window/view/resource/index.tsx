import * as React from 'react';
import app from 'internal/app';

import ResourceViewController from './controller/controller'
import ResourceItemView from 'window/view/resource/resource-item-view';
import { ResourceManager } from 'internal/resource';

const style = require('./index.scss');

interface Props {
  resourceManager: ResourceManager
}

@app.mobx.observer
class ResourceView extends React.Component<Props, {}> {

  controller: ResourceViewController;

  constructor(props: any) {
    super(props);

    this.controller = new ResourceViewController(this.props.resourceManager)
  }

  dragOverHandler(e: React.DragEvent) {
    e.preventDefault();
  }

  dropHandler(e: React.DragEvent) {
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
    for (let i = 0; i < filePaths.length; i ++) {
      const path = filePaths[i];
      this.controller.addResource(path);
    }
  }

  render() {
    let resources: any[] = [];
    app.resource.resources.forEach(resource => {
      resources.push(<ResourceItemView resource={resource} key={resource.id}/>)
    })

    return (
      <div className={style.component}
          onDragOver={e=>this.dragOverHandler(e)}
          onDrop={e=>this.dropHandler(e)}>
        <div className="resource-items">
        { [resources] }
        </div>
      </div>
    )
  }

}

export default ResourceView;