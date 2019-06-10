import * as React from 'react'
import { MonitorWidgetSelectableView } from "window/workbench/common/widgets/monitor/model/selectable-view";
import { observable, observer } from "window/app-mobx";
import { dispose } from "base/common/lifecycle";
import { mat2d } from "gl-matrix";
import { IMonitorWidgetTrackItemView, MonitorWidgetTrackItemView, TrackItemViewSelectorRegistry } from "window/workbench/common/widgets/monitor/model/track-item/track-item-view";
import { Registry } from "platform/registry/common/platform";
import { ITrackItem } from 'internal/timeline/base/track-item/track-item';
import { ITimeline } from 'internal/timeline/base/timeline';
import { ITrack } from 'internal/timeline/base/track/track';
import { VideoTrackItem } from 'internal/timeline/base/track-item/video-track-item';


export interface IMonitorWidgetTrackView extends MonitorWidgetSelectableView {

  /*@observable*/ readonly trackItemViews: ReadonlySet<IMonitorWidgetTrackItemView<any>>;
  /*@observable*/ readonly currentTrackItemView: IMonitorWidgetTrackItemView<any> | null;

}
export class MonitorWidgetTrackView extends MonitorWidgetSelectableView
    implements IMonitorWidgetTrackView {

  @observable trackItemViews: Set<MonitorWidgetTrackItemView<any>>;
  trackItemViewMap_: Map<ITrackItem, MonitorWidgetTrackItemView<any>>;

  @observable currentTrackItemView: MonitorWidgetTrackItemView<any> | null;

  constructor(
    parent: MonitorWidgetSelectableView,
    private readonly timeline_: ITimeline,
    private readonly track_: ITrack
  ) {
    super(parent);
    this.trackItemViews = new Set();
    this.trackItemViewMap_ = new Map();
    track_.trackItems.forEach((time, ti) => this.trackItemAddedHandler(ti));
    this._register(track_.onTrackItemAdded(e => this.trackItemAddedHandler(e.trackItem), this));
    this._register(track_.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem), this));
    this._register(track_.onTrackItemTimeChanged(e => this.updateCurrentTrackItemViewModel(), this));
    this._register(timeline_.onSeek(e => this.updateCurrentTrackItemViewModel(), this));
  }

  private trackItemAddedHandler(trackItem: ITrackItem) {
    console.log('trackItemAddedHandler', trackItem);
    let tiVM: MonitorWidgetTrackItemView<any> = null;
    const tiVMCtor = Registry.as<TrackItemViewSelectorRegistry>(TrackItemViewSelectorRegistry.ID).getView(trackItem.type)
    console.log(tiVMCtor, Registry.as<TrackItemViewSelectorRegistry>(TrackItemViewSelectorRegistry.ID), (!tiVMCtor))
    if (!tiVMCtor) return;
    console.log('PASS');
    tiVM = new tiVMCtor(this, this.timeline_, trackItem as VideoTrackItem);
    console.log('TIVM = ',tiVM);
    if (!tiVM) return;
    this.trackItemViews.add(tiVM);
    this.trackItemViewMap_.set(trackItem, tiVM);
    this.updateCurrentTrackItemViewModel();
  }

  private trackItemWillRemoveHandler(trackItem: ITrackItem) {
    let tiVM: MonitorWidgetTrackItemView<any> = this.trackItemViewMap_.get(trackItem);
    this.trackItemViews.delete(tiVM);
    this.trackItemViewMap_.delete(trackItem);
    dispose(tiVM);
    this.updateCurrentTrackItemViewModel();
  }

  private updateCurrentTrackItemViewModel() {
    const timeline = this.timeline_;
    const currentTime = timeline.currentTime;
    const trackItem = this.track_.getTrackItemAt(currentTime);
    if (!trackItem) this.currentTrackItemView = null;
    const tiVM = this.trackItemViewMap_.get(trackItem);
    this.currentTrackItemView = tiVM;
  }

  __getChildren() {
    return [...this.trackItemViews];
  }

  __getLocalTransformMatrix() {
    return mat2d.create();
  }

  __getLocalInverseTransformMatrix() {
    return mat2d.create();
  }

  __select() {
    return false;
  }

  render(): React.ReactNode {
    return <MonitorWidgetTrackViewComponent view={this}/>
  }

}



export interface MonitorWidgetTrackViewProps {
  view: MonitorWidgetTrackView;
}

@observer
export class MonitorWidgetTrackViewComponent extends React.Component<MonitorWidgetTrackViewProps, {}> {

  render() {
    return (
      <div className='track'>
      { this.props.view.currentTrackItemView &&
        this.props.view.currentTrackItemView.render()
      }
      </div>
    )
  }

}