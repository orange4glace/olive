import * as React from 'react'
import { IView } from "base/browser/ui/grid/gridview";
import { Relay, Event, Emitter } from "base/common/event";
import { Grid, SerializableGrid, Sizing, Direction, ISerializedGrid } from "base/browser/ui/grid/grid";
import { $, addDisposableListener } from "base/browser/dom";
import { registerSingleton } from "platform/instantiation/common/extensions";
import { IWidgetGroupsService, WidgetGroupDirection, IAddGroupOptions, WidgetGroupsOrder } from "window/workbench/services/editor/common/widget-groups-service";
import { WidgetGroupIdentifier } from "window/workbench/common/editor/editor";
import { IWidgetGroup, ISerializedWidgetGroup, isSerializedWidgetGroup, WidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
import { localize } from "nls";
// import { IWidgetGroupView, WidgetGroupView } from "window/workbench/browser/parts/editor/widget-group-view";
import { IInstantiationService, ServiceIdentifier } from "platform/instantiation/common/instantiation";
import { IDisposable, dispose, Disposable } from 'base/common/lifecycle';
import { values } from 'base/common/map';
import { coalesce } from 'base/common/arrays';
import { Memento } from 'window/workbench/common/memento';
import { IStorageService, StorageScope } from 'platform/storage/common/storage';
import { ILifecycleService } from 'platform/lifecycle/common/lifecycle';
import { onUnexpectedError } from 'base/common/errors';

interface IEditorPartUIState {
  serializedGrid: ISerializedGrid;
  activeGroup: WidgetGroupIdentifier;
}

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

export class EditorPart extends Disposable implements IWidgetGroupsService {

	_serviceBrand: ServiceIdentifier<any>;

  private readonly onDidRemoveGroup_: Emitter<IWidgetGroup> = new Emitter();
  public readonly onDidRemoveGroup: Event<IWidgetGroup> = this.onDidRemoveGroup_.event;

  // private gridWidgetView_: GridWidgetView<IWidgetGroupView>;
  gridWidget: SerializableGrid<IWidgetGroup>;
  private groups_: Map<WidgetGroupIdentifier, IWidgetGroup>
      = new Map<WidgetGroupIdentifier, IWidgetGroup>();
  private groupDisposables_: Map<WidgetGroupIdentifier, IDisposable[]> = new Map();

  private activeGroup_: IWidgetGroup;
  public get activeGroup() { return this.activeGroup_; }

	private readonly memento: Memento;
  private workspaceMemento: any;

  get count(): number {
    return this.groups_.size;
  }

  constructor(
    @IInstantiationService private readonly instantiationService: IInstantiationService,
    @IStorageService storageService: IStorageService,
    @ILifecycleService lifecycleService: ILifecycleService
  ) {
    super();
		this.memento = new Memento('olive.workbench.part.EditorPart', storageService);
    this.workspaceMemento = this.memento.getMemento(StorageScope.WORKSPACE);

		this._register(lifecycleService.onShutdown(() => {
      (window as any).mainConsole.log('SHUT DOWN @');
			// Ask the component to persist state into the memento
			this.saveState();
			// Then save the memento into storage
			this.memento.saveMemento();
		}));
  }

  public start() {
    // this.gridWidgetView_ = new GridWidgetView<IWidgetGroupView>();
    this.doCreateGridControl();
  }

  private doCreateGridControl(): void {
    const restoreError = !this.doCreateGridControlWithPreviousState();
    console.log('tryin doCreateGridControl ', restoreError);

    if (!this.gridWidget || restoreError) {
      const emptyGroup = this.doCreateGroup();
      this.gridWidget = new SerializableGrid(emptyGroup);
      this.doSetGroupActive(emptyGroup);
    }
  }

  private doCreateGridControlWithPreviousState(): boolean {
    const uiState: IEditorPartUIState = this.workspaceMemento['layout'];
    if (uiState && uiState.serializedGrid) {
      try {
        this.doCreateGridControlWithState(uiState.serializedGrid, uiState.activeGroup);
      } catch (error) {
				onUnexpectedError(new Error(`Error restoring editor grid widget: ${error} (with state: ${JSON.stringify(uiState)})`));

        this.groups_.forEach(group => group.dispose());
        this.groups_.clear();

        return false;
      }
    }

    return true;
  }

  private doCreateGridControlWithState(serializedGrid: ISerializedGrid, activeGroupId: WidgetGroupIdentifier): void {
    const groupViews: IWidgetGroup[] = [];
    const gridWidget = SerializableGrid.deserialize(serializedGrid, {
      fromJSON: (serializedWidgetGroup: ISerializedWidgetGroup | null) => {
        let groupView: IWidgetGroup;
        groupView = this.doCreateGroup(serializedWidgetGroup);

        groupViews.push(groupView);
        if (groupView.id === activeGroupId) 
          this.doSetGroupActive(groupView);

        return groupView;
      }
    })

    if (!this.activeGroup)
      this.doSetGroupActive(groupViews[0]);

    this.doSetGridWidget(gridWidget);
  }

  private doSetGridWidget(gridWidget: SerializableGrid<IWidgetGroup>): void {
    if (this.gridWidget)
      this.gridWidget.dispose();

    this.gridWidget = gridWidget;
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

	// getGroups(order = WidgetGroupsOrder.CREATION_TIME): IWidgetGroup[] {
	// 	switch (order) {
	// 		case WidgetGroupsOrder.CREATION_TIME:
	// 			return values(this.groups_);

	// 		case WidgetGroupsOrder.MOST_RECENTLY_ACTIVE:
	// 			const mostRecentActive = coalesce(this.mostRecentActiveGroups.map(groupId => this.getGroup(groupId)));

	// 			// there can be groups that got never active, even though they exist. in this case
	// 			// make sure to ust append them at the end so that all groups are returned properly
	// 			return distinct([...mostRecentActive, ...this.groups]);

	// 		case WidgetGroupsOrder.GRID_APPEARANCE:
	// 			const views: IEditorGroupView[] = [];
	// 			if (this.gridWidget) {
	// 				this.fillGridNodes(views, this.gridWidget.getViews());
	// 			}

	// 			return views;
	// 	}
	// }

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

    this.groups_.set(group.id, group);

    let disposables: IDisposable[] = [];
    disposables.push(group.onDidFocus(() => {
      this.doSetGroupActive(group);
    }));
    this.groupDisposables_.set(group.id, disposables);

    return group;
  }

  moveGroup(group: IWidgetGroup | WidgetGroupIdentifier, location: IWidgetGroup | WidgetGroupIdentifier, direction: WidgetGroupDirection): IWidgetGroup {
    const sourceView = this.assertGroup(group);
    const targetView = this.assertGroup(location);

		if (sourceView === targetView) {
			throw new Error('Cannot move group into its own');
		}

    this.gridWidget.moveView(sourceView, Sizing.Distribute, targetView, this.toGridViewDirection(direction));

    return sourceView;
  }

  removeGroup(group: IWidgetGroup | WidgetGroupIdentifier): void {
    const groupView = this.assertGroup(group);
    if (this.groups_.size === 1)
			return; // Cannot remove the last root group
    
    if (groupView.isEmpty())
      return this.doRemoveEmptyGroup(groupView);
  }

  private doRemoveEmptyGroup(group: IWidgetGroup): void {
    this.gridWidget.removeView(group, Sizing.Distribute);
    group.dispose();

    this.onDidRemoveGroup_.fire(group);
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

  private saveState(): void {
    if (this.gridWidget) {
      const uiState: IEditorPartUIState = {
        serializedGrid: this.gridWidget.serialize(),
        activeGroup: this.activeGroup.id
      };

      (window as any).mainConsole.log(uiState);

      this.workspaceMemento['layout'] = uiState;
    }
  }

  render(): React.ReactNode {
    return <EditorPartComponent editorPart={this}/>
  }

}

export class EditorPartComponent extends React.Component<{editorPart: EditorPart}> {

  private ref: React.RefObject<HTMLDivElement> = React.createRef();
  private disposables: IDisposable[] = [];

  componentDidMount() {
    const editorPart = this.props.editorPart;
    editorPart.gridWidget.layout(this.ref.current.offsetWidth, this.ref.current.offsetHeight);
    this.ref.current.append(editorPart.gridWidget.element);

    this.disposables.push(addDisposableListener(window, 'resize', e => {
      editorPart.gridWidget.layout(this.ref.current.offsetWidth, this.ref.current.offsetHeight);
    }));
  }

  componentWillUnmount() {
    dispose(this.disposables);
  }

  render() {
    return (
      <div ref={this.ref} style={{position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'}}>
      </div>
    )
  }

}

// registerSingleton(IWidgetGroupsService, EditorPart);