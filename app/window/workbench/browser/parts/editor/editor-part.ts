// import { IView } from "base/browser/ui/grid/gridview";
// import { Relay, Event } from "base/common/event";
// import { Grid } from "base/browser/ui/grid/grid";
// import { $ } from "base/browser/dom";
// import { registerSingleton } from "platform/instantiation/common/extensions";
// import { IWidgetGroupsService, WidgetGroupDirection, IAddGroupOptions } from "window/workbench/services/editor/common/widget-groups-service";
// import { IWidgetGroupView, WidgetGroupView } from "window/workbench/browser/parts/editor/widget-group-view";
// import { WidgetGroupIdentifier } from "window/workbench/common/editor/editor";
// import { IWidgetGroup, ISerializedWidgetGroup } from "window/workbench/common/editor/widget-group";
// import { localize } from "nls";

// class GridWidgetView<T extends IView> implements IView {

// 	readonly element: HTMLElement = $('.grid-view-container');

// 	get minimumWidth(): number { return this.gridWidget ? this.gridWidget.minimumWidth : 0; }
// 	get maximumWidth(): number { return this.gridWidget ? this.gridWidget.maximumWidth : Number.POSITIVE_INFINITY; }
// 	get minimumHeight(): number { return this.gridWidget ? this.gridWidget.minimumHeight : 0; }
// 	get maximumHeight(): number { return this.gridWidget ? this.gridWidget.maximumHeight : Number.POSITIVE_INFINITY; }

// 	private _onDidChange = new Relay<{ width: number; height: number; } | undefined>();
// 	readonly onDidChange: Event<{ width: number; height: number; } | undefined> = this._onDidChange.event;

// 	private _gridWidget: Grid<T>;

// 	get gridWidget(): Grid<T> {
// 		return this._gridWidget;
// 	}

// 	set gridWidget(grid: Grid<T>) {
// 		this.element.innerHTML = '';

// 		if (grid) {
// 			this.element.appendChild(grid.element);
// 			this._onDidChange.input = grid.onDidChange;
// 		} else {
// 			this._onDidChange.input = Event.None;
// 		}

// 		this._gridWidget = grid;
// 	}

// 	layout(width: number, height: number): void {
// 		if (this.gridWidget) {
// 			this.gridWidget.layout(width, height);
// 		}
// 	}

// 	dispose(): void {
// 		this._onDidChange.dispose();
// 	}
// }

// export class EditorPart implements IWidgetGroupsService {

//   private gridWidgetView_: GridWidgetView<IWidgetGroupView>;
//   private groupViews_: Map<WidgetGroupIdentifier, IWidgetGroupView>
//       = new Map<WidgetGroupIdentifier, IWidgetGroupView>();

//   get count(): number {
//     return this.groupViews_.size;
//   }

//   constructor(

//   ) {
//     this.gridWidgetView_ = new GridWidgetView<IWidgetGroupView>();
//   }

//   private assertGroupView(group: IWidgetGroupView | WidgetGroupIdentifier): IWidgetGroupView {
//     let groupView: IWidgetGroupView | null;
//     if (typeof group === 'number')
//       groupView = this.getGroup(group);
//     else groupView = group;
//     if (!groupView) throw new Error('Invalid editor group provided!');
//     return groupView;
//   }

//   getGroup(identifier: WidgetGroupIdentifier): IWidgetGroupView | null {
//     return this.groupViews_.get(identifier);
//   }

//   addGroup(location: IWidgetGroupView | WidgetGroupIdentifier,
//            direction: WidgetGroupDirection,
//            options?: IAddGroupOptions): IWidgetGroupView {
//     const locationView = this.assertGroupView(location);
    
//     const group = this.doAddGroup(locationView, direction);
//   }

//   private doAddGroup(locationView: IWidgetGroupView, direction: WidgetGroupDirection, groupToCopy?: IWidgetGroupView): IWidgetGroupView {
//     const newGroupView = this.doCreateGroupView(groupToCopy);
//   }

//   private doCreateGroupView(from?: IWidgetGroupView | ISerializedWidgetGroup | null): IWidgetGroupView {
//     const label = this.getGroupLabel(this.count + 1);

//     let groupView: IWidgetGroupView;
//     if (from instanceof WidgetGroupView) {
//       groupView = 
//     }
//   }

//   private getGroupLabel(index: number): string {
//     return localize('groupLabel', 'Group {0}', index);
//   }

// }

// registerSingleton(IWidgetGroupsService, EditorPart);