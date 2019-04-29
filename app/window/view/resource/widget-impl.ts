import * as React from 'react'
import { ResourceWidget } from "window/view/resource/widget";
import { ResourceWidgetModelImpl } from "window/view/resource/model/model-impl";
import { ResourceManager } from "internal/resource";
import { ResourceWidgetControllerImpl } from "window/view/resource/controller/controller_impl";
import { ResourceWidgetView, ResourceWidgetViewProps } from "window/view/resource/view/widget-view";

export class ResourceWidgetImpl extends ResourceWidget {

  constructor(resourceManager: ResourceManager) {
    super();
    this.model = new ResourceWidgetModelImpl(resourceManager);
    this.controller = new ResourceWidgetControllerImpl(this.model);
  }

  get name(): string {
    return 'Resource'
  }

  render(): JSX.Element {
    const props: ResourceWidgetViewProps = {
      widget: this
    }
    return React.createElement(ResourceWidgetView, props);
  }

  serialize(): Object {
    return null;
  }

  dispose(): void {

  }

}