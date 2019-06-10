import * as React from 'react'
import { IDisposable, dispose } from "base/common/lifecycle";
import { observable, action, observer } from "window/app-mobx";
import { mat2d } from "gl-matrix";
import { IMonitorWidgetTrackView, MonitorWidgetTrackView } from "window/workbench/common/widgets/monitor/model/track-view";
import { MonitorWidgetSelectableView, IMonitorWidgetSelectableView } from "window/workbench/common/widgets/monitor/model/selectable-view";
import { MouseUtil } from 'orangeutil';
import { ITrack } from 'internal/timeline/base/track/track';
import { ITimeline } from 'internal/timeline/base/timeline';

export interface IMonitorWidgetTimelineView extends IMonitorWidgetSelectableView {

  readonly timeline: ITimeline;

  /*@observable*/ readonly width: number;
  /*@observable*/ readonly height: number;
  /*@observable*/ readonly screenWidth: number;
  /*@observable*/ readonly screenHeight: number;

  /*@observable*/ readonly trackViews: ReadonlyArray<IMonitorWidgetTrackView | null>;

  updateScreen(width: number, height: number, screenWidth: number, screenHeight: number): void;

  toScreenPosition(x: number, y: number): {x: number, y: number};

}

export class MonitorWidgetTimelineView extends MonitorWidgetSelectableView 
    implements IMonitorWidgetTimelineView {

  @observable trackViews: MonitorWidgetTrackView[];
  private trackViewMap_: Map<ITrack, MonitorWidgetTrackView>;
  private trackDisposables_: Map<MonitorWidgetTrackView, IDisposable[]>;

  @observable width: number;
  @observable height: number;
  @observable screenWidth: number;
  @observable screenHeight: number;

  private timeline_: ITimeline;


  constructor(public readonly timeline: ITimeline) {
    super(null);
    this.timeline_ = timeline;
    this.trackViews = [];
    this.trackViewMap_ = new Map();
    this.trackDisposables_ = new Map();

    this.timeline_.tracks.forEach((track, index) => this.trackAddedHandler(track, index));
    this._register(this.timeline_.onTrackAdded(e => this.trackAddedHandler(e.track, e.index), this));
    this._register(this.timeline_.onTrackWillRemove(e => this.trackWillRemoveHandler(e.track, e.index), this));
  }

  @action
  private trackAddedHandler(track: ITrack, index: number) {
    const tvm = new MonitorWidgetTrackView(this, this.timeline_, track);
    this.trackViewMap_.set(track, tvm);
    this.trackViews.splice(index, 0, tvm);
  }

  @action
  private trackWillRemoveHandler(track: ITrack, index: number) {
    const tvm = this.trackViewMap_.get(track);
    this.trackViews.splice(index, 1);
    dispose(tvm);
  }

  @action
  updateScreen(width: number, height: number, screenWidth: number, screenHeight: number): void {
    this.width = width;
    this.height = height;
    this.screenWidth = screenWidth;
    this.screenHeight = screenHeight;
  }

  toScreenPosition(x: number, y: number): {x: number, y: number} {
    const wr = this.screenWidth / this.width;
    const hr = this.screenHeight / this.height;
    return {
      x: x * wr,
      y: y * hr
    };
  }

  __getLocalTransformMatrix() {
    const wr = this.screenWidth / this.width;
    const hr = this.screenHeight / this.height;
    let mat = mat2d.create();
    mat2d.identity(mat);
    mat2d.scale(mat, mat, [wr, hr]);
    return mat;
  }

  __getLocalInverseTransformMatrix() {
    const wr = this.screenWidth / this.width;
    const hr = this.screenHeight / this.height;
    let mat = mat2d.create();
    mat2d.identity(mat);
    mat2d.scale(mat, mat, [1 / wr, 1 / hr]);
    return mat;
  }

  __getChildren() {
    return [...this.trackViews];
  }

  __select(x: number, y: number): boolean {
    return false;
  }

  render(): React.ReactNode {
    return <MonitorWidgetTimelineViewComponent view={this}/>
  }

}


export interface MonitorWidgetTimelineViewProps {
  view: MonitorWidgetTimelineView;
}

@observer
export class MonitorWidgetTimelineViewComponent extends React.Component<MonitorWidgetTimelineViewProps, {}> {

  ref: React.RefObject<any> = React.createRef();

  constructor(props: MonitorWidgetTimelineViewProps) {
    super(props);
    this.mouseDownHandler = this.mouseDownHandler.bind(this);
  }

  componentDidMount() {

  }

  mouseDownHandler(e: React.MouseEvent) {
    console.log(e)
    const pos = MouseUtil.mousePositionElement(e, this.ref.current);
    this.props.view.fireMouseDown(pos.x, pos.y);
  }

  render() {
    return (
      <div className='timeline' ref={this.ref}
          onMouseDown={this.mouseDownHandler}>
        {this.props.view.trackViews.map(tv => tv.render())}
      </div>
    )
  }

}