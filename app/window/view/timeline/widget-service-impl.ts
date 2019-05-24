import { ITimelineWidgetService } from "window/view/timeline/widget-service";
import { Emitter, Event } from "base/common/event";
import { TimelineWidget } from "window/view/timeline/widget";
import { IDisposable, dispose } from "base/common/lifecycle";

export class TimelineWidgetService implements ITimelineWidgetService {

  private onWidgetAdded_: Emitter<TimelineWidget> = new Emitter();
  onWidgetAdded: Event<TimelineWidget> = this.onWidgetAdded_.event;

  private onWidgetWillRemove_: Emitter<TimelineWidget> = new Emitter();
  onWidgetWillRemove: Event<TimelineWidget> = this.onWidgetWillRemove_.event;

  private onActiveWidgetChanged_: Emitter<TimelineWidget> = new Emitter();
  onActiveWidgetChanged: Event<TimelineWidget> = this.onActiveWidgetChanged_.event;

  private widgets_: Set<TimelineWidget>;
  private widgetDisposables_: Map<TimelineWidget, IDisposable[]>;
  private activeWidget_: TimelineWidget;

  get activeWidget() { return this.activeWidget_; }

  constructor() {
    this.widgets_ = new Set();
    this.widgetDisposables_ = new Map();
  }

  addWidget(widget: TimelineWidget) {
    if (this.widgets_.has(widget)) return;
    this.widgets_.add(widget);
    let disposables: IDisposable[] = [];
    disposables.push(widget.onFocused(() => {
      this.activateWidget(widget);
    }, this));
    this.widgetDisposables_.set(widget, disposables);
    this.onWidgetAdded_.fire(widget);

    if (!this.activeWidget_) this.activateWidget(widget);
  }

  removeWidget(widget: TimelineWidget) {
    if (!this.widgets_.has(widget)) return;
    this.onWidgetWillRemove_.fire(widget);
    dispose(this.widgetDisposables_.get(widget));
    this.widgetDisposables_.delete(widget);
    this.widgets_.delete(widget);
  }

  activateWidget(widget: TimelineWidget) {
    if (this.activeWidget_ == widget) return;
    const prevActiveWidget = this.activeWidget_;
    this.activeWidget_ = widget;
    if (prevActiveWidget) prevActiveWidget.setActive(false);
    widget.setActive(true);

    this.onActiveWidgetChanged_.fire(widget);
  }

}