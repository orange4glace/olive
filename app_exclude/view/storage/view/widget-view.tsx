import * as React from 'react'
import { IStorageWidget } from 'window/view/storage/widget';

import * as style from './widget-view.scss'
import { observer } from 'window/app-mobx';
import { StorageWidgetStorageDirectoryView } from 'window/view/storage/view/storage-directory-view';
import { StorageWidgetViewOutgoingEvents } from 'window/view/storage/view-outgoing-events';

export interface StorageWidgetViewProps {
  widget: IStorageWidget;
}

@observer
export class StorageWidgetView extends React.Component<StorageWidgetViewProps> {

  outgoingEvents: StorageWidgetViewOutgoingEvents;

  constructor(props: StorageWidgetViewProps) {
    super(props);
    this.outgoingEvents = new StorageWidgetViewOutgoingEvents();

    this.props.widget.registerViewOutgoingEvents(this.outgoingEvents);
  }

  render() {
    const widget = this.props.widget;
    return (
      <div className={style.component}>
      {
        <StorageWidgetStorageDirectoryView {...this.props} outgoingEvents={this.outgoingEvents}
            storageDirectoryViewModel={widget.model.targetStorageDirectoryViewModel}/>
      }
      </div>
    )
  }

}