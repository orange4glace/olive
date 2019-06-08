import * as style from './style.scss'
import * as React from 'react'
import { Widget, ISerializedWidget } from 'window/workbench/common/editor/widget';
import { IStorageWidget } from 'window/workbench/common/widgets/storage/widget';
import { Emitter } from 'base/common/event';
import { IDisposable } from 'base/common/lifecycle';
import { IProject } from 'internal/project/project';
import { IStorageDirectory, StorageDirectory } from 'internal/storage/storage-directory';
import { StorageWidgetController } from 'window/workbench/common/widgets/storage/controller/controller';
import { StorageWidgetViewOutgoingEvents } from 'window/workbench/common/widgets/storage/view-outgoing-events';
import { IStorageWidgetStorageItemView } from 'window/workbench/common/widgets/storage/view/storage-item-view';
import { IStorageWidgetView } from 'window/workbench/common/widgets/storage/view/widget-view';
import { IStorageService } from 'platform/storage/common/storage';
import { StorageWidgetView } from 'window/workbench/common/widgets/storage/view/widget-view-impl';
import { IWidgetFactory, WidgetFactoryRegistry } from 'window/workbench/common/editor/widget-registry';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { IProjectsService } from 'internal/project/projects-service';
import { Registry } from 'platform/registry/common/platform';

interface ISerializedStorageWidget extends ISerializedWidget {
  projectID: string,
  storageDirectoryPath: string;
}

export class StorageWidget extends Widget implements IStorageWidget {

  static readonly TYPE = 'olive.workbench.widget.StorageWidget';

  // UI Events
  private readonly onDropOver_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDropOver = this.onDropOver_.event;
  private readonly onDrop_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDrop = this.onDrop_.event;
  private readonly onStorageItemDragStart_: Emitter<IStorageWidgetStorageItemView> = new Emitter();
  public readonly onStorageItemDragStart = this.onStorageItemDragStart_.event;
  private readonly onStorageItemDragEnd_: Emitter<IStorageWidgetStorageItemView> = new Emitter();
  public readonly onStorageItemDragEnd = this.onStorageItemDragEnd_.event;

  readonly view: IStorageWidgetView;
  private readonly viewOutgoingEvents_ = new StorageWidgetViewOutgoingEvents();

  private disposables_: IDisposable[] = [];

  get name() { return 'Storage' }

  constructor(
    private readonly project_: IProject,
    private readonly storageDirectory_: IStorageDirectory,
    @IStorageService storageService: IStorageService) {
    super(StorageWidget.TYPE, '', storageService);

    this.registerViewOutgoingEvents(this.viewOutgoingEvents_);
    this.view = new StorageWidgetView(project_, storageDirectory_, this.viewOutgoingEvents_);

    this.disposables_.push(new StorageWidgetController(this, project_));
  }

  private registerViewOutgoingEvents(outgoingEvents: StorageWidgetViewOutgoingEvents): void {
    outgoingEvents.onDropOver = e => this.onDropOver_.fire(e);
    outgoingEvents.onDrop = e => this.onDrop_.fire(e);
    outgoingEvents.onStorageItemDragStart = e => this.onStorageItemDragStart_.fire(e);
    outgoingEvents.onStorageItemDragEnd = e => this.onStorageItemDragEnd_.fire(e);
  }

  render(): React.ReactNode {
    return React.createElement(StorageWidgetComponent, {
      widget: this
    });
  }

  serialize(): ISerializedStorageWidget {
    return {
      serializedWidgetType: StorageWidget.TYPE,
      projectID: this.project_.id,
      storageDirectoryPath: this.storageDirectory_.getAbsolutePath()
    }
  }

  dispose(): void {

  }

  matches(obj: unknown) {
    return this === obj;
  }

}

interface StorageWidgetComponentProps {
  widget: StorageWidget;
}

class StorageWidgetComponent extends React.Component<StorageWidgetComponentProps> {

  constructor(props: StorageWidgetComponentProps) {
    super(props);
  }

  render() {
    return (
      <div className={style.component}>
        {this.props.widget.view.render()}
      </div>);
  }

}


class StorageWidgetFactory implements IWidgetFactory<StorageWidget> {

  serialize(widget: StorageWidget) {
    return widget.serialize();
  }

  deserialize(instantiationService: IInstantiationService, serializedWidget: ISerializedWidget) {
    if (serializedWidget.serializedWidgetType !== StorageWidget.TYPE) return null;
    const serial = serializedWidget as ISerializedStorageWidget;
    let widget: StorageWidget = null;
    instantiationService.invokeFunction(accessor => {
      const project = accessor.get(IProjectsService).getProject(serial.projectID);
      if (!project) return;
      widget = instantiationService.createInstance(StorageWidget, project, project.storage);
    })
    return widget;
  }
}

Registry.as<WidgetFactoryRegistry>(WidgetFactoryRegistry.ID).registerWidgetFactory(StorageWidget.TYPE, StorageWidgetFactory);

// interface Serial {
// }

// interface InitializationData {
//   project: IProject;
// }

// class StorageWidgetProvider implements IWidgetProvider<StorageWidget> {

//   create(initializationData: InitializationData,
//       services: ServicesAccessor): StorageWidget {
//     return new StorageWidget(
//       initializationData.project.coreService,
//       initializationData.project.storageService);
//   }

//   serialize(widget: StorageWidget) {
//     return widget.serialize();
//   }

//   deserialize(obj: Serial, services: ServicesAccessor): any {
//     return null;
//     // return this.create({
//     //   timeline: (<IProjectsService>services.get(IProjectsService)).getCurrentProject().timelineService.getTimeline(obj.timelineID)
//     // }, services);
//   }

// }

// WidgetRegistry.registerWidget('olive.StorageWidget', new StorageWidgetProvider());