import { observable, computed } from "window/app-mobx";
import { ViewModelImpl, ViewModel } from "window/view/view-model";
import { Event, Emitter } from "base/common/event";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";

export interface TimelineWidgetTrackItemViewModel extends ViewModel {

  readonly onFocused: Event<void>;
  readonly onBlured: Event<void>;

  readonly trackItem: ITrackItem;
  /*@observable*/ readonly focused: boolean;
  /*@observable*/ readonly start: number;
  /*@observable*/ readonly end: number;

  focus(): void;
  blur(): void;

}

export class TimelineWidgetTrackItemViewModelImpl
    extends ViewModelImpl
    implements TimelineWidgetTrackItemViewModel {

  private readonly onFocused_: Emitter<void> = new Emitter();
  readonly onFocused: Event<void> = this.onFocused_.event;

  private readonly onBlured_: Emitter<void> = new Emitter();
  readonly onBlured: Event<void> = this.onBlured_.event;

  readonly trackItem: ITrackItem;
  @observable focused: boolean;
  @computed get start(): number { return this.trackItem.time.start; }
  @computed get end(): number { return this.trackItem.time.end; }


  constructor(trackItem: ITrackItem) {
    super();
    this.trackItem = trackItem;
  }

  focus(): void {
    if (this.focused) return;
    this.focused = true;
    this.onFocused_.fire();
  }
  blur(): void {
    if (!this.focused) return;
    this.focused = false;
    this.onBlured_.fire();
  }

  dispose(): void {}

}