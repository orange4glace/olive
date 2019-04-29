import { ResourceWidgetModel } from "window/view/resource/model/model";
import { ResourceWidgetResourceViewModelImpl } from "window/view/resource/model/resource-view-model-impl";
import { ResourceManager, Resource } from "internal/resource";
import { observable } from "window/app-mobx";
import { Disposable } from "base/common/lifecycle";

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

  private resourceAddedHandler(resource: Resource) {
    const vm = new ResourceWidgetResourceViewModelImpl(resource);
    this.resourceViewModels.push(vm);
  }

  private resourceWillRemoveHandler(resource: Resource) {

  }

}