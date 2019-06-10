import { ITimelineWidgetService } from "window/workbench/common/widgets/timeline/widget-service";
import { Emitter, Event } from "base/common/event";
import { ITimelineWidget } from "window/workbench/common/widgets/timeline/widget";
import { IDisposable, dispose } from "base/common/lifecycle";
import { registerSingleton } from "platform/instantiation/common/extensions";
import { IGlobalTimelineService } from "internal/timeline/base/global-timeline-service";

export class TimelineWidgetService implements ITimelineWidgetService {

  _serviceBrand: any;

  private onWidgetAdded_: Emitter<ITimelineWidget> = new Emitter();
  onWidgetAdded: Event<ITimelineWidget> = this.onWidgetAdded_.event;

  private onWidgetWillRemove_: Emitter<ITimelineWidget> = new Emitter();
  onWidgetWillRemove: Event<ITimelineWidget> = this.onWidgetWillRemove_.event;

  private onActiveWidgetChanged_: Emitter<ITimelineWidget> = new Emitter();
  onActiveWidgetChanged: Event<ITimelineWidget> = this.onActiveWidgetChanged_.event;

  private widgets_: Set<ITimelineWidget>;
  private widgetDisposables_: Map<ITimelineWidget, IDisposable[]>;
  private activateWidgetDisposables_: IDisposable[] = [];
  private activeWidget_: ITimelineWidget;

  get activeWidget() { return this.activeWidget_; }

  constructor(
    @IGlobalTimelineService private readonly globalTimelineSevice_: IGlobalTimelineService) {
    this.widgets_ = new Set();
    this.widgetDisposables_ = new Map();
  }

  addWidget(widget: ITimelineWidget) {
    if (this.widgets_.has(widget)) return;
    this.widgets_.add(widget);
    let disposables: IDisposable[] = [];
    widget.onFocused(() => this.activateWidget(widget), this, disposables);
    this.widgetDisposables_.set(widget, disposables);
    this.onWidgetAdded_.fire(widget);

    if (!this.activeWidget_) this.activateWidget(widget);
  }

  removeWidget(widget: ITimelineWidget) {
    if (!this.widgets_.has(widget)) return;
    this.onWidgetWillRemove_.fire(widget);
    dispose(this.widgetDisposables_.get(widget));
    this.widgetDisposables_.delete(widget);
    this.widgets_.delete(widget);
  }

  activateWidget(widget: ITimelineWidget) {
    if (this.activeWidget_ == widget) return;
    this.activateWidgetDisposables_ = dispose(this.activateWidgetDisposables_);
    const prevActiveWidget = this.activeWidget_;
    this.activeWidget_ = widget;
    if (prevActiveWidget) prevActiveWidget.setActive(false);
    widget.setActive(true);

    this.globalTimelineSevice_.setTargetTimeline(widget.timeline);
    widget.onTimelineChanged(e => {
      this.globalTimelineSevice_.setTargetTimeline(widget.timeline);
    }, this, this.activateWidgetDisposables_);

    this.onActiveWidgetChanged_.fire(widget);
  }

}

registerSingleton(ITimelineWidgetService, TimelineWidgetService);