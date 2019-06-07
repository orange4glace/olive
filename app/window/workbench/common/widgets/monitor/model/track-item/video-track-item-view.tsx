import * as React from 'react'
import { VideoTrackItem } from "internal/timeline/track-item/video-track-item";
import { IMonitorWidgetTrackItemView, MonitorWidgetTrackItemView, MonitorWidgetTrackItemViewComponent, TrackItemViewSelectorRegistry } from "window/workbench/common/widgets/monitor/model/track-item/track-item-view";
import { IMonitorWidgetDrawingView, MonitorWidgetDrawingView, DrawingViewSelectorRegistry } from "window/workbench/common/widgets/monitor/model/drawing/drawing-view";
import { MonitorWidgetSelectableView } from "window/workbench/common/widgets/monitor/model/selectable-view";
import { ITimeline } from "internal/timeline/timeline";
import { observer } from 'window/app-mobx';
import { Registry } from 'platform/registry/common/platform';
import { TrackItemType } from 'internal/timeline/track-item/track-item-type';

export interface IMonitorWidgetVideoTrackItemView
    extends IMonitorWidgetTrackItemView<VideoTrackItem> {

  readonly drawingView: IMonitorWidgetDrawingView<any>;

}

export class MonitorWidgetVideoTrackItemView
    extends MonitorWidgetTrackItemView<VideoTrackItem>
    implements IMonitorWidgetVideoTrackItemView {

  readonly drawingView: MonitorWidgetDrawingView<any>;

  constructor(parent: MonitorWidgetSelectableView, timeline: ITimeline, trackItem: VideoTrackItem) {
    super(parent, timeline, trackItem);

    const drawing = trackItem.drawing;
    const viewCtor = Registry.as<DrawingViewSelectorRegistry>(DrawingViewSelectorRegistry.ID).getView(drawing.type);
    console.log(Registry.as<DrawingViewSelectorRegistry>(DrawingViewSelectorRegistry.ID), drawing, viewCtor);
    if (viewCtor) this.drawingView = new viewCtor(this, timeline, trackItem, drawing);
  }

  __getChildren() {
    return this.drawingView ? [this.drawingView] : [];
  }

  render(): React.ReactNode {
    return <MonitorWidgetVideoTrackItemViewComponent view={this}/>
  }

}

@observer
export class MonitorWidgetVideoTrackItemViewComponent extends
    MonitorWidgetTrackItemViewComponent<MonitorWidgetVideoTrackItemView> {
  
  render() {
    const view = this.props.view;
    if (view.drawingView) return view.drawingView.render();
    return null;
  }

}

Registry.as<TrackItemViewSelectorRegistry>(TrackItemViewSelectorRegistry.ID).registerView(TrackItemType.VIDEO_MEDIA, MonitorWidgetVideoTrackItemView)
Registry.as<TrackItemViewSelectorRegistry>(TrackItemViewSelectorRegistry.ID).registerView(TrackItemType.VIDEO_FIGURE, MonitorWidgetVideoTrackItemView)