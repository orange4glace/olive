import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Emitter, Event, Relay } from "base/common/event";
import { IWidget, ISerializedWidget, isSerializedWidget } from "window/workbench/common/editor/widget";
import { IWidgetCloseEvent } from "window/workbench/common/editor";
import { IDisposable, Disposable } from "base/common/lifecycle";
import { WidgetGroupIdentifier } from "window/workbench/common/editor/editor";
import { Registry } from "platform/registry/common/platform";
import { IWidgetFactoryRegistry, Extensions, IWidgetFactory } from "window/workbench/common/editor/widget-registry";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IView } from "base/browser/ui/grid/gridview";
import { ISerializableView } from "base/browser/ui/grid/grid";
import { observable, observer } from 'window/app-mobx';

export function isSerializedWidgetGroup(obj: any): obj is ISerializedWidgetGroup {
	const group: ISerializedWidgetGroup = obj;

	return obj && typeof obj === 'object' && Array.isArray(group.widgets) && Array.isArray(group.mru);
}

export interface WidgetCloseEvent extends IWidgetCloseEvent {
  widget: IWidget;
}

export interface ISerializedWidgetGroup {
  widgets: ISerializedWidget[];
  mru: number[];
}

export interface IWidgetGroup extends ISerializableView {

  openWidget(widget: IWidget /*TODO: IWidgetOpenOptions*/): void
  openWidget(widget: ISerializedWidget): void
  openWidget(widget: IWidget | ISerializedWidget): void;

  closeWidget(widget: IWidget, openNext: boolean): number | undefined;

  setActive(value: boolean): void;

}

export class WidgetGroup extends Disposable implements IWidgetGroup {
  
  private readonly onDidWidgetOpen_: Emitter<IWidget> = new Emitter();
  public readonly onDidWidgetOpen = this.onDidWidgetOpen_.event;
  private readonly onDidWidgetClose_: Emitter<WidgetCloseEvent> = new Emitter();
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

  widgets: IWidget[] = observable.array([], {deep: false});
  private mru_: IWidget[] = [];
  private active_: IWidget | null;

  constructor(
    from: ISerializedWidgetGroup,
    @IInstantiationService private readonly instantiationService: IInstantiationService
  ) {
    super();

    this.element = document.createElement('div');
    ReactDOM.render(<WidgetGroupComponent widgetGroup={this}/>, this.element);

    if (isSerializedWidgetGroup(from))
      this.deserialize(from);
  }

  openWidget(widget: IWidget /*TODO: IWidgetOpenOptions*/): void
  openWidget(widget: ISerializedWidget): void
  openWidget(widget: IWidget | ISerializedWidget): void {
    let widgetInstance: IWidget;
    if (isSerializedWidget(widget)) {
      const widgetFactory = 
        Registry.as<IWidgetFactoryRegistry>(Extensions.WidgetFactoryRegistry).getWidgetFactory(widget.serializedWidgetType);
      widgetInstance = widgetFactory.deserialize(this.instantiationService, widget);
    }
    else widgetInstance = widget;

    let targetIndex: number;
    const indexOfActive = this.indexOf(this.active_);

    // Insert to the END
    targetIndex = this.widgets.length;

    this.doOpenWidget(widgetInstance, targetIndex);

  }

  private doOpenWidget(widget: IWidget, index: number): void {
    this.splice(index, false, widget);
    this.registerWidgetListeners(widget);
    this.onDidWidgetOpen_.fire(widget);
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

  private doCloseWidget(widget: IWidget, openNext: boolean, replaced: boolean): WidgetCloseEvent | null {
    const index = this.indexOf(widget);
    if (index == -1) return null; // Not found

    if (openNext && this.matches(this.active_, widget)) {
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
        this.active_ = null;
    }

    this.splice(index, true);

    return { widget, replaced, index, groupId: this.id }
  }

  setActiveWidget(widget: IWidget): void {
    const index = this.indexOf(widget);
    if (index === -1) return; // Not found

    if (this.matches(this.active_, widget)) return; // Already active

    this.active_ = widget;

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
    return new WidgetGroup(from, instantiationService);
  }

  static create(instantiationService: IInstantiationService): IWidgetGroup {
    return new WidgetGroup(null, instantiationService);
  }

  setActive(value: boolean) {

  }

  serialize(): ISerializedWidgetGroup {
    // TODO
    return null;
  }

  private deserialize(serial: ISerializedWidgetGroup): void {
    const registry = Registry.as<IWidgetFactoryRegistry>(Extensions.WidgetFactoryRegistry);

    let index = 0;
    serial.widgets.forEach(s => {
      const factory = registry.getWidgetFactory(s.serializedWidgetType);
      const widget = factory.deserialize(this.instantiationService, s);
      this.doOpenWidget(widget, index++);
    })
		this.mru_ = serial.mru.map(i => this.widgets[i]);
		this.active_ = this.mru_[0];
  }

  toJSON() {
    return this.serialize();
  }

}

@observer
class WidgetGroupComponent extends React.Component<{ widgetGroup: WidgetGroup }> {

  render() {
    const widgetGroup = this.props.widgetGroup;
    return (
    <div className='widgets-container'>
      {widgetGroup.widgets.map(widget => (
        widget.render())
      )}
    </div>);
  }

}