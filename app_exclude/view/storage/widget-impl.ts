import * as React from 'react'
import { StorageWidgetViewModel } from 'window/view/storage/model/model-impl';
import { IStorageService } from 'internal/storage/storage-service';
import { IStorageWidget } from 'window/view/storage/widget';
import { IProject } from 'internal/project/project';
import { ServicesAccessor } from 'platform/instantiation/common/instantiation';
import { IWidgetProvider } from 'window/view/widget-service';
import { WidgetRegistry } from 'window/view/widget-registry';
import { StorageWidgetViewProps, StorageWidgetView } from 'window/view/storage/view/widget-view';
import { Widget } from 'window/view/widget';
import { Event, Emitter } from 'base/common/event';
import { StorageWidgetViewOutgoingEvents } from 'window/view/storage/view-outgoing-events';
import { IStorageWidgetViewModel } from 'window/view/storage/model/model';
import { IDisposable } from 'base/common/lifecycle';
import { StorageWidgetController } from 'window/view/storage/controller/controller';
import { IProjectCoreService } from 'internal/project/project-core-service';
import { IStorageItem } from 'internal/storage/storage-item';
import { IStorageWidgetStorageItemViewModel } from 'window/view/storage/model/storage-item-model';
import { WindowRegistry } from 'window/registry';
import { StorageWidgetStorageItemViewSelector, Extensions } from 'window/view/storage/view/storage-item-view-registry';
import { StorageWidgetDefaultStorageItemView } from 'window/view/storage/view/storage-item/default-storage-item-view';
import { ViewSelectorPriority } from 'window/base/common/view-selector-registry';

// Register StorageItemViews
WindowRegistry.as<StorageWidgetStorageItemViewSelector>(Extensions.StorageWidgetStorageItemViewSelector).registerView(
  props => true,
  StorageWidgetDefaultStorageItemView,
  ViewSelectorPriority.LOW);

export class StorageWidget extends Widget implements IStorageWidget {

  // UI Events
  private readonly onDropOver_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDropOver = this.onDropOver_.event;
  private readonly onDrop_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDrop = this.onDrop_.event;
  private readonly onStorageItemDragStart_: Emitter<IStorageWidgetStorageItemViewModel> = new Emitter();
  public readonly onStorageItemDragStart = this.onStorageItemDragStart_.event;
  private readonly onStorageItemDragEnd_: Emitter<IStorageWidgetStorageItemViewModel> = new Emitter();
  public readonly onStorageItemDragEnd = this.onStorageItemDragEnd_.event;

  readonly model: IStorageWidgetViewModel;

  private disposables_: IDisposable[] = [];

  constructor(
    @IProjectCoreService private readonly projectCoreService_: IProjectCoreService,
    @IStorageService private readonly storageService_: IStorageService) {
    super('Resource');
    this.model = new StorageWidgetViewModel(this.storageService_);

    this.disposables_.push(new StorageWidgetController(this, projectCoreService_));
  }

  registerViewOutgoingEvents(outgoingEvents: StorageWidgetViewOutgoingEvents): void {
    outgoingEvents.onDropOver = e => this.onDropOver_.fire(e);
    outgoingEvents.onDrop = e => this.onDrop_.fire(e);
    outgoingEvents.onStorageItemDragStart = e => this.onStorageItemDragStart_.fire(e);
    outgoingEvents.onStorageItemDragEnd = e => this.onStorageItemDragEnd_.fire(e);
  }

  render(): JSX.Element {
    const props: StorageWidgetViewProps = {
      widget: this
    }
    return React.createElement(StorageWidgetView, props);
  }

  serialize(): Object {
    return null;
  }

  dispose(): void {

  }

}

interface Serial {
}

interface InitializationData {
  project: IProject;
}

class StorageWidgetProvider implements IWidgetProvider<StorageWidget> {

  create(initializationData: InitializationData,
      services: ServicesAccessor): StorageWidget {
    return new StorageWidget(
      initializationData.project.coreService,
      initializationData.project.storageService);
  }

  serialize(widget: StorageWidget) {
    return widget.serialize();
  }

  deserialize(obj: Serial, services: ServicesAccessor): any {
    return null;
    // return this.create({
    //   timeline: (<IProjectService>services.get(IProjectService)).getCurrentProject().timelineService.getTimeline(obj.timelineID)
    // }, services);
  }

}

WidgetRegistry.registerWidget('olive.StorageWidget', new StorageWidgetProvider());