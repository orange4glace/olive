import { ResourceWidgetModel } from "window/view/resource/model/model";
import { ResourceWidgetResourceViewModelImpl } from "window/view/resource/model/resource-view-model-impl";
import { observable } from "window/app-mobx";
import { Disposable } from "base/common/lifecycle";
import ResourceManager from "internal/resource/manager";
import { IResource } from "internal/resource/resource";

export class ResourceWidgetModelImpl extends Disposable implements ResourceWidgetModel {

  readonly resourceManager: ResourceManager;

  @observable resourceViewModels: ResourceWidgetResourceViewModelImpl[];

  constructor(resourceManager: ResourceManager) {
    super();
    this.resourceManager = resourceManager;
    this.resourceViewModels = [];

    this.resourceAddedHandler = this.resourceAddedHandler.bind(this);

    resourceManager.resources.forEach(this.resourceAddedHandler);
    this._register(this.resourceManager.onResourceAdded(e => this.resourceAddedHandler(e.resource), this));
  }

  private resourceAddedHandler(resource: IResource) {
    const vm = new ResourceWidgetResourceViewModelImpl(resource);
    this.resourceViewModels.push(vm);
  }

  private resourceWillRemoveHandler(resource: IResource) {

  }

}