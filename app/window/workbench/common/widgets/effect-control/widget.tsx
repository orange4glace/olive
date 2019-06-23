import * as React from 'react'
import { Widget, ISerializedWidget } from "window/workbench/common/editor/widget";
import { IStorageService } from "platform/storage/common/storage";
import { ITimelineWidgetService } from "window/workbench/common/widgets/timeline/widget-service";
import { TimelineWidget } from "window/workbench/common/widgets/timeline/widget-impl";
import { IDisposable, dispose } from "base/common/lifecycle";
import { observable, IObservableValue, action } from "mobx";
import { EffectControlView } from 'window/workbench/common/widgets/effect-control/view/widget-view';
import { EffectControlViewOutgoingEvents } from 'window/workbench/common/widgets/effect-control/view-outgoing-events';
import { IWidgetFactory, WidgetFactoryRegistry } from 'window/workbench/common/editor/widget-registry';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';
import { Action } from 'base/common/actions';
import { IWidgetService } from 'window/workbench/services/editor/common/widget-service';
import { MenuRegistry, MenuId, SyncActionDescriptor } from 'platform/actions/common/actions';
import { Extensions, IWorkbenchActionRegistry } from 'window/workbench/common/actions';

/*#region VideoTrackItem*/
import "./view/track-item/video-media-track-item-view"
import "./view/drawing/video-media-drawing-view"
import "./view/effect/transform-effect-view"
import { observer } from 'mobx-react';
/*#endregion*/

enum EffectControlState {
  NoTimelineSelected,
  NoTrackItemSelected,
  MultipleTrackItemSelected,
  Valid
}

export interface SerializedEffectControlWidget extends ISerializedWidget{

}

export class EffectControlWidget extends Widget {

  static readonly TYPE = 'olive.widget.EffectControl'

  public get name() { return 'Effect Control' }

  private timelineWidgetServiceDisposable_: IDisposable;
  private timelineWidgetViewDisposable_: IDisposable;

  private readonly viewOutgoingEvents_: EffectControlViewOutgoingEvents;
  public get viewOutgoingEvents() { return this.viewOutgoingEvents_; }

  @observable private state_: EffectControlState;
  public get state() { return this.state_; }

  private view_: IObservableValue<EffectControlView> = observable.box(null);
  public get view() { return this.view_.get(); }

  constructor(
    @IStorageService storageService: IStorageService,
    @ITimelineWidgetService private readonly timelineWidgetService_: ITimelineWidgetService
  ) {
    super(EffectControlWidget.TYPE, '', storageService);
    this.viewOutgoingEvents_ = new EffectControlViewOutgoingEvents();
    this.state_ = EffectControlState.NoTimelineSelected;

    this.handleActiveWidgetChanged(timelineWidgetService_.activeWidget);
    this._register(timelineWidgetService_.onActiveWidgetChanged(this.handleActiveWidgetChanged, this));
  }

  @action
  private handleActiveWidgetChanged(widget: TimelineWidget) {
    dispose(this.timelineWidgetServiceDisposable_);
    if (!widget) {
      this.state_ = EffectControlState.NoTimelineSelected;
      this.view_.set(null);
      return;
    }
    this.handleTimelineWidgetTimelineChanged();
    this.timelineWidgetServiceDisposable_ = widget.onTimelineChanged(this.handleTimelineWidgetTimelineChanged, this);
  }

  @action
  private handleTimelineWidgetTimelineChanged() {
    dispose(this.timelineWidgetViewDisposable_);
    const widget = this.timelineWidgetService_.activeWidget;
    if (!widget.timeline) {
      this.state_ = EffectControlState.NoTimelineSelected;
      this.view_.set(null);
      return;
    }
    this.handleDidChangeFocusedTrackItems();
    this.timelineWidgetViewDisposable_ =
        widget.view.timelineView.onDidChangeFocusedItems(this.handleDidChangeFocusedTrackItems, this);
  }

  @action
  private handleDidChangeFocusedTrackItems() {
    const widget = this.timelineWidgetService_.activeWidget;
    const focusedTrackItems = widget.view.timelineView.focusedTrackItems;
    console.log('handleDidChangeFocusedTrackItems',focusedTrackItems)
    if (focusedTrackItems.size == 0) {
      this.state_ = EffectControlState.NoTrackItemSelected;
      this.view_.set(null);
      return;
    }
    if (focusedTrackItems.size > 1) {
      this.state_ = EffectControlState.MultipleTrackItemSelected;
      this.view_.set(null);
      return;
    }
    this.state_ = EffectControlState.Valid;
    const timeline = widget.timeline;
    const trackItem = focusedTrackItems.values().next().value;
    const view = new EffectControlView(timeline, trackItem, this.viewOutgoingEvents);
    this.view_.set(view);
  }
  
  matches(obj: unknown) {
    return obj === this;
  }

  render() {
    return <WidgetComponent view={this}/>
  }

  serialize(): SerializedEffectControlWidget {
    return {
      serializedWidgetType: EffectControlWidget.TYPE
    }
  }

  dispose() {
    super.dispose();
    dispose(this.timelineWidgetServiceDisposable_);
  }

}

@observer
class WidgetComponent extends React.Component<{view: EffectControlWidget}> {

  render() {
    const view = this.props.view;
    if (view.state == EffectControlState.NoTimelineSelected) {
      return <div>No Timeline Selected</div>
    }
    if (view.state == EffectControlState.NoTrackItemSelected) {
      return <div>No Track Item Selected</div>
    }
    if (view.state == EffectControlState.MultipleTrackItemSelected) {
      return <div>Multiple Track Item Selected</div>
    }
    return view.view.render();
  }

}

class EffectControlWidgetFactory implements IWidgetFactory<EffectControlWidget> {

  serialize(widget: EffectControlWidget) {
    return widget.serialize();
  }

  deserialize(instantiationService: IInstantiationService, serializedWidget: ISerializedWidget) {
    if (serializedWidget.serializedWidgetType !== EffectControlWidget.TYPE) return null;
    const serial = serializedWidget as SerializedEffectControlWidget;
    let widget: EffectControlWidget = null;
    return instantiationService.createInstance(EffectControlWidget);
  }
}

Registry.as<WidgetFactoryRegistry>(WidgetFactoryRegistry.ID).registerWidgetFactory(EffectControlWidget.TYPE, EffectControlWidgetFactory);

class OpenEffectControlWidgetAction extends Action {

  static ID = 'olive.workbench.action.OpenEffectControlWidget';
  static LABEL = 'Open: Effect Control'

  constructor(
    id: string,
    label: string,
    @IInstantiationService private readonly instantiationService: IInstantiationService,
    @IWidgetService private readonly widgetService: IWidgetService
  ) {
    super(id, label);
  }

  run() {
    const widget = this.instantiationService.createInstance(EffectControlWidget);
    this.widgetService.openWidget(widget);
    return Promise.resolve();
  }

}

MenuRegistry.appendMenuItem(
  MenuId.MenubarViewMenu, {
    group: '3_views',
    command: {
      id: OpenEffectControlWidgetAction.ID,
      title: 'Effect Control'
    }
  }
);

Registry.as<IWorkbenchActionRegistry>(Extensions.WorkbenchActions).registerWorkbenchAction(
  new SyncActionDescriptor(OpenEffectControlWidgetAction, OpenEffectControlWidgetAction.ID, OpenEffectControlWidgetAction.LABEL),
  'Open: Effect Control');