import { Drawing } from "internal/rendering/drawing/drawing";
import { MonitorWidgetSelectableViewModel, MonitorWidgetSelectableViewModelImpl, MonitorWidgetSelectableViewModelEvent } from "window/view/monitor/model/selectable-view-model";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item";
import { observable } from "window/app-mobx";
import { Event, Emitter } from "base/common/event";

export interface MonitorWidgetDrawingViewModel<T extends Drawing>
    extends MonitorWidgetSelectableViewModel {

  readonly onFocused: Event<MonitorWidgetSelectableViewModel>;
  readonly onBlured: Event<MonitorWidgetSelectableViewModel>;

  readonly drawing: T;

  /*@observable*/ readonly focused: boolean;

}

export abstract class MonitorWidgetDrawingViewModelImpl<T extends Drawing>
    extends MonitorWidgetSelectableViewModelImpl
    implements MonitorWidgetDrawingViewModel<T> {

  private onFocused_: Emitter<MonitorWidgetSelectableViewModel> = new Emitter();
  readonly onFocused: Event<MonitorWidgetSelectableViewModel> = this.onFocused_.event;
  private onBlured_: Emitter<MonitorWidgetSelectableViewModel> = new Emitter();
  readonly onBlured: Event<MonitorWidgetSelectableViewModel> = this.onBlured_.event;

  @observable protected focused_ = false;
  get focused() { return this.focused_; }

  constructor(
      parent: MonitorWidgetSelectableViewModelImpl,
      protected readonly timeline_: Timeline,
      protected readonly trackItem_: TrackItem,
      readonly drawing: T) {
    super(parent);

    this._register(this.onMouseDownFailed(this.onMouseDownFailedHandler, this));
  }

  private onMouseDownFailedHandler(e: MonitorWidgetSelectableViewModelEvent) {
    this.__setFocused(false);
  }

  protected __setFocused(value: boolean) {
    this.focused_ = value;
    if (value) this.onFocused_.fire(this);
    else this.onBlured_.fire(this);
  }

}