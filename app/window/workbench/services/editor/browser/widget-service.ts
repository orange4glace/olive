import { IWidgetService } from "window/workbench/services/editor/common/widget-service";
import { Event, Emitter } from "base/common/event";
import { IWidget, ISerializedWidget, Widget } from "window/workbench/common/editor/widget";
import { IWidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
import { IWidgetGroupsService } from "window/workbench/services/editor/common/widget-groups-service";
import { registerSingleton } from "platform/instantiation/common/extensions";
import { ServiceIdentifier } from "platform/instantiation/common/instantiation";

export class WidgetService implements IWidgetService {

	_serviceBrand: ServiceIdentifier<any>;

  private onDidActiveEditorChange_: Emitter<void> = new Emitter();
  readonly onDidActiveEditorChange: Event<void> = this.onDidActiveEditorChange_.event;

  readonly activeWidget: IWidget;

  readonly widgets: ReadonlyArray<IWidget>;

  constructor(
    @IWidgetGroupsService private readonly widgetGroupsService: IWidgetGroupsService
  ) {

  }

  openWidget(widget: IWidget | ISerializedWidget, group?: IWidgetGroup): IWidget {
    if (widget instanceof Widget) {
      const targetGroup = this.findTargetGroup(widget, group);

      return this.doOpenWidget(targetGroup, widget);
    }


  }

  private doOpenWidget(group: IWidgetGroup, widget: IWidget): IWidget {
    group.openWidget(widget);
    return widget;
  }

  private findTargetGroup(widget: IWidget, group?: IWidgetGroup): IWidgetGroup {
    let targetGroup: IWidgetGroup;

    if (group && typeof group !== 'number') return group;

		// Fallback to active group if target not valid
		if (!targetGroup) {
			targetGroup = this.widgetGroupsService.activeGroup;
		}

		return targetGroup;

  }

}

registerSingleton(IWidgetService, WidgetService);