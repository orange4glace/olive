import * as style from './widget-tab-view.scss';
import * as React from 'react'
import { IWidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
import { IWidget } from "window/workbench/common/editor/widget";
import { Disposable, IDisposable, dispose } from "base/common/lifecycle";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IWidgetOpenCloseEvent } from "window/workbench/common/editor";
import { observable, observer } from 'window/app-mobx';
import { Emitter, Event } from 'base/common/event';
import { StaticDND, DragAndDropData } from 'base/browser/dnd';
import { DraggedWidgetGroupIdentifier, DraggedWidgetIdentifier } from 'window/workbench/browser/dnd';

export class WidgetTabView extends Disposable {

  @observable private widgetTabItemViews_: WidgetTabItemView[] = [];
  public get widgetTabItemViews() { return this.widgetTabItemViews_; }
  private widgetTabItemViewMap_: Map<IWidget, WidgetTabItemView> = new Map();
  private widgetTabItemViewDisposables_: Map<IWidget, IDisposable[]> = new Map();

  private activeWidgetTabView_: WidgetTabItemView | null;

  constructor(private readonly widgetGroup_: IWidgetGroup,
    @IInstantiationService private readonly instantiationService_: IInstantiationService) {
    super();

    widgetGroup_.widgets.forEach((widget, index) => {
      this.doCreateWidgetTabItemView(widget, index);
    })
    this.doActivateWidgetTabItemView(widgetGroup_.activeWidget);
    this.registerWidgetGroupListeners(widgetGroup_);
  }

  private registerWidgetGroupListeners(widgetGroup: IWidgetGroup) {
    this._register(widgetGroup.onDidWidgetOpen(this.onDidWidgetOpen, this));
    this._register(widgetGroup.onDidWidgetClose(this.onDidWidgetClose, this));
    this._register(widgetGroup.onDidWidgetActivate(widget => this.doActivateWidgetTabItemView(widget), this));
  }

  private onDidWidgetOpen(e: IWidgetOpenCloseEvent) {
    this.doCreateWidgetTabItemView(e.widget, e.index);
  }

  private onDidWidgetClose(e: IWidgetOpenCloseEvent) {
    this.doRemoveWidgetTabItemView(e.widget);
  }

  private doCreateWidgetTabItemView(widget: IWidget, index: number): WidgetTabItemView {
    const view = this.instantiationService_.createInstance(WidgetTabItemView, widget);
    this.widgetTabItemViews_.splice(index, 0, view);
    this.widgetTabItemViewMap_.set(widget, view);
    this.registerWidgetTabItemViewListeners(view, widget);
    return view;
  }

  private registerWidgetTabItemViewListeners(itemView: WidgetTabItemView, widget: IWidget) {
    const disposables: IDisposable[] = [];
    disposables.push(itemView.onDragStart(e => {
      StaticDND.CurrentDragAndDropData = new DragAndDropData<DraggedWidgetIdentifier>(
        new DraggedWidgetIdentifier({ widget, groupId: this.widgetGroup_.id }));
    }));
    this.widgetTabItemViewDisposables_.set(widget, disposables);
  }

  private doRemoveWidgetTabItemView(widget: IWidget) {
    const disposables = this.widgetTabItemViewDisposables_.get(widget);
    this.widgetTabItemViewDisposables_.delete(widget);
    const itemView = this.widgetTabItemViewMap_.get(widget);
    this.widgetTabItemViewMap_.delete(widget);
    const index = this.widgetTabItemViews_.indexOf(itemView);
    this.widgetTabItemViews_.splice(index, 1);
    if (this.activeWidgetTabView_ == itemView) this.doActivateWidgetTabItemView(null);
    dispose(disposables);
  }

  private doActivateWidgetTabItemView(widget: IWidget) {
    let itemView: WidgetTabItemView = null;
    if (widget != null) {
      itemView = this.widgetTabItemViewMap_.get(widget);
      if (!itemView) throw new Error('No TabItemView found! ' + widget.id);
    }
    const lastActive = this.activeWidgetTabView_;
    if (lastActive) lastActive.setActive(false);
    this.activeWidgetTabView_ = itemView;
    if (itemView) itemView.setActive(true);
  }

  render(): React.ReactNode {
    return (<WidgetTabViewComponent view={this}/>)
  }

}

@observer
class WidgetTabViewComponent extends React.Component<{view: WidgetTabView}> {

  render() {
    const view = this.props.view;
    return (
      <div className={`tabs ${style.component}`}>
        {view.widgetTabItemViews.map(tabView => (
          <div className='tab-container' key={tabView.id}>
            {tabView.render()}
          </div>
        ))}
      </div>
    )
  }

}

export class WidgetTabItemView {

  private readonly onDragStart_: Emitter<React.DragEvent> = new Emitter();
  readonly onDragStart: Event<React.DragEvent> = this.onDragStart_.event;

  fireDragStart(e: React.DragEvent) { this.onDragStart_.fire(e); }

  readonly id: string;
  @observable name: string;
  @observable active: boolean;

  private readonly widget_: IWidget;

  constructor(widget: IWidget) {
    this.widget_ = widget;
    this.id = widget.id;
    this.name = this.widget_.name;
  }

  setActive(val: boolean) {
    this.active = val;
  }

  render(): React.ReactNode {
    return <WidgetTabItemViewComponent view={this}/>
  }

}

@observer
class WidgetTabItemViewComponent extends React.Component<{view: WidgetTabItemView}> {

  constructor(props: any) {
    super(props);

    this.dragStartHandler = this.dragStartHandler.bind(this);
  }

  dragStartHandler(e: React.DragEvent) {
    this.props.view.fireDragStart(e);
  }

  render(): React.ReactNode {
    const view = this.props.view;
    return (
      <div draggable className={`tab ${view.active ? 'active' : ''}`}
        onDragStart={this.dragStartHandler}>
        <div className='label'>{view.name}</div>
      </div>
    )
  }

}