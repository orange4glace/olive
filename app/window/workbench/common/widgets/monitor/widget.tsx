import * as style from './widget.scss'
import * as React from 'react'
import { Widget, IWidget, ISerializedWidget } from 'window/workbench/common/editor/widget';
import { observable, observer, action } from 'window/app-mobx';
import { IObservableValue } from 'mobx';
import { IDisposable, dispose } from 'base/common/lifecycle';
import { MonitorWidgetTimelineView } from 'window/workbench/common/widgets/monitor/model/timeline-view';
import { IStorageService } from 'platform/storage/common/storage';
import app from 'internal/app';
import { MenuRegistry, MenuId, SyncActionDescriptor } from 'platform/actions/common/actions';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { IWidgetService } from 'window/workbench/services/editor/common/widget-service';
import { Action } from 'base/common/actions';
import { Registry } from 'platform/registry/common/platform';
import { IWorkbenchActionRegistry, Extensions } from 'window/workbench/common/actions';


//#region DrawingView
import './model/drawing/rectangle-drawing-view'
import './model/drawing/video-media-drawing-view'
//#endregion


//#region TrackItemView
import './model/track-item/video-track-item-view'
import { WidgetFactoryRegistry, IWidgetFactory } from 'window/workbench/common/editor/widget-registry';
import { ITimeline } from 'internal/timeline/base/timeline';
import { IGlobalTimelineService } from 'internal/timeline/base/global-timeline-service';
//#endregion

interface ISerializedMonitorWidget extends ISerializedWidget {

}

export interface IMonitorWidget extends IWidget {

}

export class MonitorWidget extends Widget implements IMonitorWidget {

  static readonly TYPE = 'olive.workbench.widget.Monitor';

  private currentTimeline_: ITimeline;

  @observable private timelineView_: IObservableValue<MonitorWidgetTimelineView>;
  get timelineView(): MonitorWidgetTimelineView { return this.timelineView_.get(); };

  private toDispose_: IDisposable[] = [];

  public get name() { return 'Monitor' }

  constructor(
    @IGlobalTimelineService private readonly globalTimelineService_: IGlobalTimelineService,
    @IStorageService storageService: IStorageService) {
    super('olive.workbench.widget.Monitor', '', storageService);

    this.timelineView_ = observable.box(null);
    
    this.timelineManagerTargetTimelineChangedHandler(globalTimelineService_.targetTimeline);
    this.toDispose_.push(globalTimelineService_.onTargetTimelineChanged(
        e => this.timelineManagerTargetTimelineChangedHandler(globalTimelineService_.targetTimeline), this));
  }

  private timelineManagerTargetTimelineChangedHandler(timeline: ITimeline) {
    if (this.currentTimeline_ == timeline) return;
    if (this.timelineView_.get()) dispose(this.timelineView_.get());
    this.currentTimeline_ = timeline;
    if (timeline == null) this.timelineView_.set(null);
    else this.timelineView_.set(new MonitorWidgetTimelineView(timeline));
  }

  render(): JSX.Element {
    const props: MonitorWidgetViewProps = {
      widget: this
    }
    return React.createElement(MonitorWidgetView, props);
  }

  serialize(): ISerializedMonitorWidget {
    return {
      serializedWidgetType: MonitorWidget.TYPE
    }
  }

  dispose(): void {
    dispose(this.toDispose_);
  }

  matches(obj: unknown) {
    return this === obj;
  }

}



export interface MonitorWidgetViewProps {
  widget: MonitorWidget;
}

@observer
export class MonitorWidgetView extends React.Component<MonitorWidgetViewProps, {}> {

  constructor(props: any) {
    super(props);
  }

  render() {
    const timelineView = this.props.widget.timelineView;
    if (timelineView) {
      return <RendererContentViewWrapper {...this.props}/>
    }
    else {
      return <div>'NO TIMELINE SELECTED'</div>
    }
  }

}

@observer
class RendererContentViewWrapper extends React.Component<MonitorWidgetViewProps, {}> {

  @observable viewportWidth = 0;
  @observable viewportHeight = 0;
  componentRef: React.RefObject<HTMLDivElement>;
  containerRef: React.RefObject<HTMLDivElement>;

  constructor(props: MonitorWidgetViewProps) {
    super(props);

    this.componentRef = React.createRef();
    this.containerRef = React.createRef();
    this.resizeHandler = this.resizeHandler.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeHandler)
    this.resizeHandler();
  }

  @action
  resizeHandler() {
    const timeline = this.props.widget.timelineView.timeline;
    var width = timeline.videoSetting.screenWidth;
    var height = timeline.videoSetting.screenHeight;
    var ratio = width / height;
    var el = this.componentRef.current;
    var elWidth = Math.min(width, el.clientWidth);
    var elHeight = Math.min(height, el.clientHeight);
    var elRatio = elWidth / elHeight;
    console.log(elWidth, elHeight)
    let w, h;
    if (ratio >= elRatio) {
      // width first
      w = elWidth;
      h = elWidth / ratio;
    }
    else {
      // height first
      w = elHeight * ratio;
      h = elHeight;
    }
    this.viewportWidth = w;
    this.viewportHeight = h;
    if (this.props.widget.timelineView)
      this.props.widget.timelineView.updateScreen(width, height, w, h);
  }

  render() {
    const widget = this.props.widget;
    var containerStyle = {
      width: this.viewportWidth + 'px',
      height: this.viewportHeight + 'px'
    }
    console.log(containerStyle)
    return (
      <div className={style.component} ref={this.componentRef}>
        <div className='container' style={containerStyle} ref={this.containerRef}>
          {widget.timelineView.render()}
          <RendererContentView {...this.props}/>
        </div>
        <div className='controls'>
          {/* <MonitorWidgetControlView {...this.props}/> */}
        </div>
      </div>
    )
  }

}

class RendererContentView extends React.PureComponent<MonitorWidgetViewProps, any> {

  containerRef: React.RefObject<HTMLDivElement> = React.createRef();

  componentDidMount() {
    const canvas: HTMLCanvasElement = app.canvas;
    this.containerRef.current.appendChild(canvas);
  }
  
  render() {
    return (
      <div className='canvas-container' ref={this.containerRef}>
      </div>
    )
  }

}

class MonitorWidgetFactory implements IWidgetFactory<MonitorWidget> {

  serialize(widget: MonitorWidget) {
    return widget.serialize();
  }

  deserialize(instantiationService: IInstantiationService, serializedWidget: ISerializedWidget) {
    if (serializedWidget.serializedWidgetType !== MonitorWidget.TYPE) return null;
    const serial = serializedWidget as ISerializedMonitorWidget;
    let widget: MonitorWidget = null;
    return instantiationService.createInstance(MonitorWidget);
  }
}

Registry.as<WidgetFactoryRegistry>(WidgetFactoryRegistry.ID).registerWidgetFactory(MonitorWidget.TYPE, MonitorWidgetFactory);

class OpenMonitorWidgetAction extends Action {

  static ID = 'olive.workbench.action.OpenMonitorWidget';
  static LABEL = 'Open: Monitor'

  constructor(
    id: string,
    label: string,
    @IInstantiationService private readonly instantiationService: IInstantiationService,
    @IWidgetService private readonly widgetService: IWidgetService
  ) {
    super(id, label);
  }

  run() {
    const widget = this.instantiationService.createInstance(MonitorWidget);
    this.widgetService.openWidget(widget);
    return Promise.resolve();
  }

}

MenuRegistry.appendMenuItem(
  MenuId.MenubarViewMenu, {
    group: '3_views',
    command: {
      id: OpenMonitorWidgetAction.ID,
      title: 'Monitor'
    }
  }
);

Registry.as<IWorkbenchActionRegistry>(Extensions.WorkbenchActions).registerWorkbenchAction(
  new SyncActionDescriptor(OpenMonitorWidgetAction, OpenMonitorWidgetAction.ID, OpenMonitorWidgetAction.LABEL),
  'Open: Monitor');