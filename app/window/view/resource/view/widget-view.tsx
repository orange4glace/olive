import * as React from 'react'
import { ResourceWidget } from 'window/view/resource/widget';
import ResourceWidgetResourceView from 'window/view/resource/view/resource-view';

import * as style from './widget-view.scss'
import { observer } from 'window/app-mobx';

export interface ResourceWidgetViewProps {
  widget: ResourceWidget;
}

@observer
export class ResourceWidgetView extends React.Component<ResourceWidgetViewProps, {}> {

  render() {
    const widget = this.props.widget;
    return (
      <div className={style.component}
          onDragOver={widget.controller.widgetViewDragOverHandler}
          onDrop={widget.controller.widgetViewDropHandler}>
      {
        widget.model.resourceViewModels.map(resourceViewModel =>
            <ResourceWidgetResourceView {...this.props} key={resourceViewModel.id} resourceViewModel={resourceViewModel}/>)
      }
      </div>
    )
  }

}