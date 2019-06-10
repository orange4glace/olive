import * as React from 'react'
import { observable, observer } from "window/app-mobx";
import { Event, Emitter } from "base/common/event";
import { IMonitorWidgetSelectableView, MonitorWidgetSelectableView, MonitorWidgetSelectableViewEvent } from "window/workbench/common/widgets/monitor/model/selectable-view";
import { ViewSelectorRegistry } from 'window/workbench/common/widgets/common/selector-registry';
import { IConstructorSignature4 } from 'platform/instantiation/common/instantiation';
import { Registry } from 'platform/registry/common/platform';
import { Drawing } from 'internal/rendering/drawing/base/drawing';
import { ITimeline } from 'internal/timeline/base/timeline';
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';

export interface IMonitorWidgetDrawingView<T extends Drawing>
    extends IMonitorWidgetSelectableView {

  readonly onFocused: Event<IMonitorWidgetSelectableView>;
  readonly onBlured: Event<IMonitorWidgetSelectableView>;

  readonly drawing: T;

  /*@observable*/ readonly focused: boolean;

}

export abstract class MonitorWidgetDrawingView<T extends Drawing>
    extends MonitorWidgetSelectableView
    implements IMonitorWidgetDrawingView<T> {

  private onFocused_: Emitter<IMonitorWidgetSelectableView> = new Emitter();
  readonly onFocused: Event<IMonitorWidgetSelectableView> = this.onFocused_.event;
  private onBlured_: Emitter<IMonitorWidgetSelectableView> = new Emitter();
  readonly onBlured: Event<IMonitorWidgetSelectableView> = this.onBlured_.event;

  @observable protected focused_ = false;
  get focused() { return this.focused_; }

  constructor(
      parent: MonitorWidgetSelectableView,
      protected readonly timeline_: ITimeline,
      protected readonly trackItem_: ITrackItem,
      readonly drawing: T) {
    super(parent);

    this._register(this.onMouseDownFailed(this.onMouseDownFailedHandler, this));
  }

  private onMouseDownFailedHandler(e: MonitorWidgetSelectableViewEvent) {
    this.__setFocused(false);
  }
  protected __setFocused(value: boolean) {
    this.focused_ = value;
    if (value) this.onFocused_.fire(this);
    else this.onBlured_.fire(this);
  }

  abstract render(): React.ReactNode;

}



export interface MonitorWidgetDrawingProps<T extends MonitorWidgetDrawingView<any>> {
  view: T;
}

export abstract class MonitorWidgetDrawingViewComponent<T extends MonitorWidgetDrawingView<any>>
    extends React.Component<MonitorWidgetDrawingProps<T>> {

}

export class DrawingViewSelectorRegistry extends ViewSelectorRegistry
  <string, IConstructorSignature4<MonitorWidgetSelectableView, ITimeline, ITrackItem, Drawing, MonitorWidgetDrawingView<any>>> {
  static readonly ID = 'olive.workbench.registry.DrawingViewSelectorRegistry'
}

Registry.add(DrawingViewSelectorRegistry.ID, new DrawingViewSelectorRegistry());