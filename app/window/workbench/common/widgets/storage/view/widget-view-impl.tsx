// import * as style from './widget-view.scss'
import * as React from 'react'
import { Disposable } from "base/common/lifecycle";
import { IObservableValue } from "mobx";
import { IStorageDirectory } from "internal/storage/storage-directory";
import { observable, observer } from "window/app-mobx";
import { IProject } from "internal/project/project";
import { IStorageWidgetStorageDirectoryView } from "window/workbench/common/widgets/storage/view/storage-directory-view";
import { IStorageWidgetView } from "window/workbench/common/widgets/storage/view/widget-view";
import { StorageWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/storage/view-outgoing-events';
import { StorageWidgetStorageDirectoryView } from 'window/workbench/common/widgets/storage/view/storage-directory-view-impl';

export class StorageWidgetView extends Disposable implements IStorageWidgetView {

  readonly project: IProject;

  public get targetStorageDirectoryView() { return this.targetStorageDirectoryView_.get(); }
  private readonly targetStorageDirectoryView_: IObservableValue<IStorageWidgetStorageDirectoryView>;

  constructor(
    project: IProject,
    targetDirectory: IStorageDirectory,
    private readonly viewOutgoingEvents: StorageWidgetViewOutgoingEvents) {
    super();

    this.project = project;

    const storageDirectoryView = new StorageWidgetStorageDirectoryView(targetDirectory, viewOutgoingEvents);
    this.targetStorageDirectoryView_ = observable.box(storageDirectoryView);
  }

  render() {
    return <StorageWidgetViewComponent view={this} viewOutgoingEvents={this.viewOutgoingEvents}/>
  }

}

export interface StorageWidgetViewProps {
  view: StorageWidgetView;
  viewOutgoingEvents: StorageWidgetViewOutgoingEvents;
}

@observer
export class StorageWidgetViewComponent extends React.Component<StorageWidgetViewProps> {

  constructor(props: StorageWidgetViewProps) {
    super(props);
  }

  render() {
    return (
      <div>
      { this.props.view.targetStorageDirectoryView.render()}
      </div>
    )
  }

}