import * as React from 'react'
import { IView } from "base/browser/ui/grid/gridview";
import { Relay, Event } from "base/common/event";
import { Grid, SerializableGrid, Sizing, Direction } from "base/browser/ui/grid/grid";
import { $ } from "base/browser/dom";
import { registerSingleton } from "platform/instantiation/common/extensions";
import { IWidgetGroupsService, WidgetGroupDirection, IAddGroupOptions } from "window/workbench/services/editor/common/widget-groups-service";
import { WidgetGroupIdentifier } from "window/workbench/common/editor/editor";
import { IWidgetGroup, ISerializedWidgetGroup, isSerializedWidgetGroup, WidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
import { localize } from "nls";
// import { IWidgetGroupView, WidgetGroupView } from "window/workbench/browser/parts/editor/widget-group-view";
import { IInstantiationService, ServiceIdentifier } from "platform/instantiation/common/instantiation";

class GridWidgetView<T extends IView> implements IView {

	readonly element: HTMLElement = $('.grid-view-container');

	get minimumWidth(): number { return this.gridWidget ? this.gridWidget.minimumWidth : 0; }
	get maximumWidth(): number { return this.gridWidget ? this.gridWidget.maximumWidth : Number.POSITIVE_INFINITY; }
	get minimumHeight(): number { return this.gridWidget ? this.gridWidget.minimumHeight : 0; }
	get maximumHeight(): number { return this.gridWidget ? this.gridWidget.maximumHeight : Number.POSITIVE_INFINITY; }

	private _onDidChange = new Relay<{ width: number; height: number; } | undefined>();
	readonly onDidChange: Event<{ width: number; height: number; } | undefined> = this._onDidChange.event;

	private _gridWidget: Grid<T>;

	get gridWidget(): Grid<T> {
		return this._gridWidget;
	}

	set gridWidget(grid: Grid<T>) {
		this.element.innerHTML = '';

		if (grid) {
			this.element.appendChild(grid.element);
			this._onDidChange.input = grid.onDidChange;
		} else {
			this._onDidChange.input = Event.None;
		}

		this._gridWidget = grid;
	}

	layout(width: number, height: number): void {
		if (this.gridWidget) {
			this.gridWidget.layout(width, height);
		}
	}

	dispose(): void {
		this._onDidChange.dispose();
	}
}

export class EditorPart implements IWidgetGroupsService {

	_serviceBrand: ServiceIdentifier<any>;

  // private gridWidgetView_: GridWidgetView<IWidgetGroupView>;
  readonly gridWidget: SerializableGrid<IWidgetGroup>;
  private groups_: Map<WidgetGroupIdentifier, IWidgetGroup>
      = new Map<WidgetGroupIdentifier, IWidgetGroup>();

  private activeGroup_: IWidgetGroup;
  public get activeGroup() { return this.activeGroup_; }

  get count(): number {
    return this.groups_.size;
  }

  constructor(
    @IInstantiationService private readonly instantiationService: IInstantiationService
  ) {
    const emptyGroup = this.doCreateGroup();
    console.log(emptyGroup);
    this.gridWidget = new SerializableGrid(emptyGroup);
    this.doSetGroupActive(emptyGroup);
    // this.gridWidgetView_ = new GridWidgetView<IWidgetGroupView>();
  }

  private assertGroup(group: IWidgetGroup | WidgetGroupIdentifier): IWidgetGroup {
    let ggg: IWidgetGroup | null;
    if (typeof group === 'number')
      ggg = this.getGroup(group);
    else ggg = group;
    if (!ggg) throw new Error('Invalid editor group provided!');
    return ggg;
  }

  getGroup(identifier: WidgetGroupIdentifier): IWidgetGroup | null {
    return this.groups_.get(identifier);
  }

  addGroup(location: IWidgetGroup | WidgetGroupIdentifier,
           direction: WidgetGroupDirection,
           options?: IAddGroupOptions): IWidgetGroup {
    const locationView = this.assertGroup(location);
    
    const group = this.doAddGroup(locationView, direction);

    this.doSetGroupActive(group);
    return group;
  }

  private doAddGroup(locationView: IWidgetGroup, direction: WidgetGroupDirection): IWidgetGroup {
    const newGroup = this.doCreateGroup();

    this.gridWidget.addView(
      newGroup,
      Sizing.Distribute,
      locationView,
      this.toGridViewDirection(direction)
    );

    return newGroup;
  }

  private doCreateGroup(from?: ISerializedWidgetGroup | null): IWidgetGroup {
    const label = this.getGroupLabel(this.count + 1);

    let group: IWidgetGroup;
    if (isSerializedWidgetGroup(from)) {
      group = WidgetGroup.createFromSerialized(from, this.instantiationService);
    }
    else {
      group = WidgetGroup.create(this.instantiationService);
    }

    return group;
  }

  private getGroupLabel(index: number): string {
    return localize('groupLabel', 'Group {0}', index);
  }

	private toGridViewDirection(direction: WidgetGroupDirection): Direction {
		switch (direction) {
			case WidgetGroupDirection.UP: return Direction.Up;
			case WidgetGroupDirection.DOWN: return Direction.Down;
			case WidgetGroupDirection.LEFT: return Direction.Left;
			case WidgetGroupDirection.RIGHT: return Direction.Right;
		}
	}

  activateGroup(group: IWidgetGroup | WidgetGroupIdentifier): IWidgetGroup {
    const groupView = this.assertGroup(group);
    this.doSetGroupActive(groupView);
    return groupView;
  }

  private doSetGroupActive(group: IWidgetGroup): void {
    console.log('do set grou pactive', group);
    if (this.activeGroup_ == group) return;

		const previousActiveGroup = this.activeGroup_;
		this.activeGroup_ = group;

		// Mark previous one as inactive
		if (previousActiveGroup) {
			previousActiveGroup.setActive(false);
		}

		// Mark group as new active
		group.setActive(true);
  }

  render(): React.ReactNode {
    return <EditorPartComponent editorPart={this}/>
  }

}

export class EditorPartComponent extends React.Component<{editorPart: EditorPart}> {

  ref: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    const editorPart = this.props.editorPart;
    this.ref.current.append(editorPart.gridWidget.element);
  }

  render() {
    return (
      <div ref={this.ref}>
      </div>
    )
  }

}

// registerSingleton(IWidgetGroupsService, EditorPart);