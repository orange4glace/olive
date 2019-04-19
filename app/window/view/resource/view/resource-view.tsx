import * as React from 'react';
import { observer } from 'window/app-mobx';
import { ResourceWidgetViewProps } from 'window/view/resource/view/widget-view';
import { ResourceWidgetResourceViewModel } from 'window/view/resource/model/resource-view-model';
import { StaticDND } from 'base/view/dnd';
import { ResourceDragAndDropData } from 'window/view/dnd/dnd';

import * as style from './resource-view.scss'

export interface ResourceWidgetResourceViweProps extends ResourceWidgetViewProps {
  resourceViewModel: ResourceWidgetResourceViewModel;
}

@observer
export class ResourceWidgetResourceView extends React.Component<ResourceWidgetResourceViweProps, {}> {

  constructor(props: any) {
    super(props);

    this.dragStartHandler = this.dragStartHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
  }

  dragStartHandler(e: React.DragEvent) {
    StaticDND.CurrentDragAndDropData = new ResourceDragAndDropData(this.props.resourceViewModel.resource);
  }

  dropHandler(e: React.DragEvent) {
    e.preventDefault();
    e.stopPropagation();
  }

  dragEndHandler(e: React.DragEvent) {
    StaticDND.CurrentDragAndDropData = null;
  }

  render() {
    const resource = this.props.resourceViewModel.resource;
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

export default ResourceWidgetResourceView;