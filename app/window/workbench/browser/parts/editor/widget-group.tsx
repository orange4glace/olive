import * as style from './widget-group.scss';
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Emitter, Event, Relay } from "base/common/event";
import { IWidget, ISerializedWidget, isSerializedWidget } from "window/workbench/common/editor/widget";
import { IWidgetOpenCloseEvent } from "window/workbench/common/editor";
import { IDisposable, Disposable, dispose } from "base/common/lifecycle";
import { WidgetGroupIdentifier } from "window/workbench/common/editor/editor";
import { Registry } from "platform/registry/common/platform";
import { IWidgetFactoryRegistry, IWidgetFactory, WidgetFactoryRegistry } from "window/workbench/common/editor/widget-registry";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IView } from "base/browser/ui/grid/gridview";
import { ISerializableView } from "base/browser/ui/grid/grid";
import { observable, observer } from 'window/app-mobx';
import { WidgetTabView } from 'window/workbench/browser/parts/editor/widget-tab-view';
import { IObservableValue } from 'mobx/lib/internal';
import { WidgetGroupDropTarget } from 'window/workbench/browser/parts/editor/widget-group-drop-target';
import { trackFocus } from 'base/browser/dom';
import { IWidgetGroupsService } from 'window/workbench/services/editor/common/widget-groups-service';

export function isSerializedWidgetGroup(obj: any): obj is ISerializedWidgetGroup {
	const group: ISerializedWidgetGroup = obj;

	return obj && typeof obj === 'object' && Array.isArray(group.widgets) && Array.isArray(group.mru);
}

export interface WidgetOpenCloseEvent extends IWidgetOpenCloseEvent {
  widget: IWidget;
}

export interface ISerializedWidgetGroup {
  id: WidgetGroupIdentifier;
  widgets: ISerializedWidget[];
  mru: number[];
}

export interface IWidgetGroup extends ISerializableView, IDisposable {

  readonly id: WidgetGroupIdentifier;

  readonly onDragEnter: Event<React.DragEvent>;
  readonly onDragLeave: Event<React.DragEvent>;
  readonly onDragEnd: Event<React.DragEvent>;

  
  readonly onDidFocus: Event<void>;
  emitDidFocus(): void;
  readonly onDidWidgetOpen: Event<IWidgetOpenCloseEvent>;
  readonly onDidWidgetClose: Event<IWidgetOpenCloseEvent>;
  readonly onDidWidgetActivate: Event<IWidget>;

  readonly widgets: ReadonlyArray<IWidget>;
  readonly activeWidget: IWidget | null;

  openWidget(widget: IWidget /*TODO: IWidgetOpenOptions*/): void
  openWidget(widget: ISerializedWidget): void
  openWidget(widget: IWidget | ISerializedWidget): void;

  closeWidget(widget: IWidget, openNext: boolean): number | undefined;

  setActiveWidget(widget: IWidget): void;
  setActive(value: boolean): void;

  isEmpty(): boolean;

}

export class WidgetGroup extends Disposable implements IWidgetGroup {

	private static __next_id = 0;

  private readonly onDragEnter_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDragEnter: Event<React.DragEvent> = this.onDragEnter_.event;
  private readonly onDragLeave_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDragLeave: Event<React.DragEvent> = this.onDragLeave_.event;
  private readonly onDragEnd_: Emitter<React.DragEvent> = new Emitter();
  public readonly onDragEnd: Event<React.DragEvent> = this.onDragEnd_.event;
  public emitDragEnter(e: React.DragEvent) { this.onDragEnter_.fire(e); }
  public emitDragLeave(e: React.DragEvent) { this.onDragLeave_.fire(e); }
  public emitDragEnd(e: React.DragEvent) { this.onDragEnd_.fire(e); }
  
  private readonly onDidFocus_: Emitter<void> = new Emitter();
  public readonly onDidFocus = this.onDidFocus_.event;
  public emitDidFocus() { this.onDidFocus_.fire(); }
  private readonly onDidWidgetOpen_: Emitter<WidgetOpenCloseEvent> = new Emitter();
  public readonly onDidWidgetOpen = this.onDidWidgetOpen_.event;
  private readonly onDidWidgetClose_: Emitter<WidgetOpenCloseEvent> = new Emitter();
  public readonly onDidWidgetClose = this.onDidWidgetClose_.event;
  private readonly onDidWidgetDispose_: Emitter<IWidget> = new Emitter();
  public readonly onDidWidgetDispose = this.onDidWidgetDispose_.event;
  private readonly onDidWidgetActivate_: Emitter<IWidget> = new Emitter();
  public readonly onDidWidgetActivate = this.onDidWidgetActivate_.event;

  element: HTMLElement;
	private _onDidChange = this._register(new Relay<{ width: number; height: number; } | undefined>());
	readonly onDidChange: Event<{ width: number; height: number; } | undefined> = this._onDidChange.event;
  layout() {}
  readonly minimumWidth = 10;
  readonly minimumHeight = 10;
  readonly maximumWidth = Infinity;
  readonly maximumHeight = Infinity;

  private id_: WidgetGroupIdentifier;
  public get id() { return this.id_; }

  @observable private active_: boolean;
  public get active() { return this.active_; }

  readonly widgets: IWidget[] = observable.array([], {deep: false});
  private mru_: IWidget[] = [];
  private activeWidget_: IObservableValue<IWidget> = observable.box(null);
  public get activeWidget() { return this.activeWidget_.get(); }

  readonly dropTarget: WidgetGroupDropTarget;
  readonly widgetTabView: WidgetTabView;

  constructor(
    from: ISerializedWidgetGroup,
    @IInstantiationService private readonly instantiationService: IInstantiationService,
    @IWidgetGroupsService private readonly widgetGroupsService_: IWidgetGroupsService
  ) {
    super();

    console.log('Create WidgetGroup ', from);

    this.dropTarget = instantiationService.createInstance(WidgetGroupDropTarget, this);
    this.widgetTabView = instantiationService.createInstance(WidgetTabView, this);

    if (isSerializedWidgetGroup(from))
      this.deserialize(from);
    else {
      this.id_ = WidgetGroup.__next_id ++;
    }

    this.element = document.createElement('div');
    this.element.style.width = '100%';
    this.element.style.height = '100%';
    ReactDOM.render(<WidgetGroupComponent widgetGroup={this}/>, this.element);
  }

  openWidget(widget: IWidget /*TODO: IWidgetOpenOptions*/): void
  openWidget(widget: ISerializedWidget): void
  openWidget(widget: IWidget | ISerializedWidget): void {
    let widgetInstance: IWidget;
    if (isSerializedWidget(widget)) {
      const widgetFactory = 
        Registry.as<IWidgetFactoryRegistry>(WidgetFactoryRegistry.ID).getWidgetFactory(widget.serializedWidgetType);
      widgetInstance = widgetFactory.deserialize(this.instantiationService, widget);
    }
    else widgetInstance = widget;

    let targetIndex: number;
    const indexOfActive = this.indexOf(this.activeWidget);

    // Insert to the END
    targetIndex = this.widgets.length;

    this.doOpenWidget(widgetInstance, targetIndex);

  }

  private doOpenWidget(widget: IWidget, index: number): void {
    this.splice(index, false, widget);
    this.registerWidgetListeners(widget);
    this.onDidWidgetOpen_.fire({
      groupId: this.id,
      widget: widget,
      index: index,
      replaced: false
    });
    this.setActiveWidget(widget);
  }

  private registerWidgetListeners(widget: IWidget): void {
    const unbind: IDisposable[] = [];

    // const onceDispose = Event.once(widget.onDispose);
    // unbind.push(onceDispose(() => {
    //   if (this.indexOf(widget) >= 0) {
    //     this.onDidWidgetDispose_.fire(widget);
    //   }
    // }))

    // TODO
  }

  closeWidget(widget: IWidget, openNext = true): number | undefined {
    const event = this.doCloseWidget(widget, openNext, false);

    if (event) {
      this.onDidWidgetClose_.fire(event);
      return event.index;
    }

    return undefined;
  }

  private doCloseWidget(widget: IWidget, openNext: boolean, replaced: boolean): WidgetOpenCloseEvent | null {
    const index = this.indexOf(widget);
    if (index == -1) return null; // Not found

    if (openNext && this.matches(this.activeWidget, widget)) {
      // More than one widget
      if (this.mru_.length > 1) {
        let newActive: IWidget;
        // TODO: MRU
        if (index === this.widgets.length - 1)
          newActive = this.widgets[index - 1];
        else
          newActive = this.widgets[index + 1];
          
        this.setActiveWidget(newActive);
      }
      else // One Editor
        this.activeWidget_.set(null);
    }

    this.splice(index, true);

    console.log('Widgt Closed', this.widgets.length);
    if (this.widgets.length === 0) {
      // Empty WidgetGroup. Close itself.
      this.widgetGroupsService_.removeGroup(this.id);
    }

    return { widget, replaced, index, groupId: this.id }
  }

  setActiveWidget(widget: IWidget): void {
    const index = this.indexOf(widget);
    if (index === -1) return; // Not found

    if (this.matches(this.activeWidget, widget)) return; // Already active

    this.activeWidget_.set(widget);

    this.setMostRecentlyUsed(widget);

    this.onDidWidgetActivate_.fire(widget);
  }

  private splice(index: number, del: boolean, editor?: IWidget): void {
		const editorToDeleteOrReplace = this.widgets[index];

		const args: (number | IWidget)[] = [index, del ? 1 : 0];
		if (editor) {
			args.push(editor);
		}

		// Perform on editors array
		this.widgets.splice.apply(this.widgets, args);

		// Add
		if (!del && editor) {
			this.mru_.push(editor); // make it LRU editor
			// this.updateResourceMap(editor, false /* add */); // add new to resource map
		}

		// Remove / Replace
		else {
			const indexInMRU = this.indexOf(editorToDeleteOrReplace, this.mru_);

			// Remove
			if (del && !editor) {
				this.mru_.splice(indexInMRU, 1); // remove from MRU
				// this.updateResourceMap(editorToDeleteOrReplace, true /* delete */); // remove from resource map
			}

			// Replace
			else if (del && editor) {
				this.mru_.splice(indexInMRU, 1, editor); // replace MRU at location
				// this.updateResourceMap(editor, false /* add */); // add new to resource map
				// this.updateResourceMap(editorToDeleteOrReplace, true /* delete */); // remove replaced from resource map
			}
		}
  }

	indexOf(candidate: IWidget | null, editors = this.widgets): number {
		if (!candidate) {
			return -1;
		}

		for (let i = 0; i < editors.length; i++) {
			if (this.matches(editors[i], candidate)) {
				return i;
			}
		}

		return -1;
	}

	private setMostRecentlyUsed(editor: IWidget): void {
		const index = this.indexOf(editor);
		if (index === -1) {
			return; // editor not found
		}

		const mruIndex = this.indexOf(editor, this.mru_);

		// Remove old index
		this.mru_.splice(mruIndex, 1);

		// Set editor to front
		this.mru_.unshift(editor);
	}

	private matches(editorA: IWidget | null, editorB: IWidget | null): boolean {
		return !!editorA && !!editorB && editorA.matches(editorB);
	}

  static createFromSerialized(from: ISerializedWidgetGroup, instantiationService: IInstantiationService): IWidgetGroup {
    return instantiationService.createInstance(WidgetGroup, from);
  }

  static create(instantiationService: IInstantiationService): IWidgetGroup {
    return instantiationService.createInstance(WidgetGroup, null);
  }

  setActive(value: boolean) {
    this.active_ = value;
  }

  isEmpty() {
    return !!!this.widgets.length;
  }

  serialize(): ISerializedWidgetGroup {
    // TODO
    let serializeedWidgets: ISerializedWidget[] = [];
    this.widgets.forEach(widget => {
      serializeedWidgets.push(widget.serialize())
    })
    const serializableMru = this.mru_.map(e => this.indexOf(e, this.widgets)).filter(i => i >= 0);

    return {
      id: this.id,
      widgets: serializeedWidgets,
      mru: serializableMru
    }
  }

  private deserialize(serial: ISerializedWidgetGroup): void {
    const registry = Registry.as<IWidgetFactoryRegistry>(WidgetFactoryRegistry.ID);
    console.log('Registry = ',registry);
    this.id_ = serial.id;
    let index = 0;
    serial.widgets.forEach(s => {
      console.log(s);
      const factory = registry.getWidgetFactory(s.serializedWidgetType);
      const widget = factory.deserialize(this.instantiationService, s);
      console.log(s.serializedWidgetType, factory, widget);
      if (widget) this.doOpenWidget(widget, index++);
    })
		this.mru_ = serial.mru.map(i => this.widgets[i]).filter(m => !!m);
		this.activeWidget_.set(this.mru_[0]);
  }

  toJSON() {
    return this.serialize();
  }

}

@observer
class WidgetGroupComponent extends React.Component<{ widgetGroup: WidgetGroup }> {

  constructor(props: any) {
    super(props);
    this.dragEnterHandler = this.dragEnterHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.mouseDownCaptureHandler = this.mouseDownCaptureHandler.bind(this);
  }

  dragEnterHandler(e: React.DragEvent) {
    this.props.widgetGroup.emitDragEnter(e);
  }

  dragLeaveHandler(e: React.DragEvent) {
    this.props.widgetGroup.emitDragLeave(e);
  }

  mouseDownCaptureHandler() {
    this.props.widgetGroup.emitDidFocus();
  }

  render() {
    const view = this.props.widgetGroup;
    return (
    <div className={`widgets-container ${style.component} ${view.active ? 'active' : ''}`}
        style={{width: '100%', height: '100%'}}
        onDragEnter={this.dragEnterHandler}
        onDragLeave={this.dragLeaveHandler}>
      {view.dropTarget.render()}
      <div className='active-border'/>
      <div className='tabs-container'>
        {view.widgetTabView.render()}
      </div>
      <div className='widget-container' onMouseDownCapture={this.mouseDownCaptureHandler}>
        {view.activeWidget && view.activeWidget.render()}
      </div>
    </div>);
  }

}