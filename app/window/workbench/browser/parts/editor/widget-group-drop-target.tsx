import * as style from './widget-group-drop-target.scss';
import * as React from 'react'
import { IWidgetGroup } from "window/workbench/browser/parts/editor/widget-group";
import { StaticDND } from "base/browser/dnd";
import { RunOnceScheduler } from "base/common/async";
import { Disposable } from "base/common/lifecycle";
import { DragAndDropObserver, DraggedWidgetIdentifier } from 'window/workbench/browser/dnd';
import { EventHelper, addDisposableListener, EventType } from 'base/browser/dom';
import { WidgetGroupDirection, IWidgetGroupsService } from 'window/workbench/services/editor/common/widget-groups-service';
import { observable, observer } from 'window/app-mobx';
import { IObservableValue } from 'mobx';

interface IDropOperation {
	splitDirection?: WidgetGroupDirection;
}

class DropOverlay extends Disposable {

	@observable private currentDropOperation_: IDropOperation = { splitDirection: undefined };
  public get currentDropOperation() { return this.currentDropOperation_; }
  @observable private disposed_: boolean;

  private cleanupOverlayScheduler_: RunOnceScheduler;

  constructor(
    private readonly widgetGroup_: IWidgetGroup,
    @IWidgetGroupsService private readonly widgetGroupsService_: IWidgetGroupsService) {
    super();
    this.cleanupOverlayScheduler_ = this._register(new RunOnceScheduler(() => this.dispose(), 300));

    this.dragOverHandler = this.dragOverHandler.bind(this);
    this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
    this.dragEndHandler = this.dragEndHandler.bind(this);
    this.dropHandler = this.dropHandler.bind(this);
  }

	get disposed(): boolean {
		return this.disposed_;
	}

  dragOverHandler(direction: WidgetGroupDirection, e: React.DragEvent) {
    console.log('drag over', direction);
    this.currentDropOperation_.splitDirection = direction;
  }

  dragLeaveHandler(e: React.DragEvent) {
    console.log('dispose by leave');
    this.dispose();
  }

  dragEndHandler(e: React.DragEvent) {
    console.log('dispose by end');
    this.dispose();
  }

  dropHandler(direction: WidgetGroupDirection, e: React.DragEvent) {
    console.log('dispose by drop');
    EventHelper.stop(e, true);

    this.dispose();

    const targetGroup = this.widgetGroupsService_.addGroup(this.widgetGroup_, direction);
    if (StaticDND.CurrentDragAndDropData && (StaticDND.CurrentDragAndDropData.getData() instanceof DraggedWidgetIdentifier)) {
      const data: DraggedWidgetIdentifier = StaticDND.CurrentDragAndDropData.getData();
      const sourceGroup = this.widgetGroupsService_.getGroup(data.identifier.groupId);
      const sourceWidget = data.identifier.widget;
      if (sourceGroup && sourceWidget) {
        console.log(sourceGroup, sourceWidget);
        sourceGroup.closeWidget(sourceWidget, true);
        targetGroup.openWidget(sourceWidget);
      }
    }

    StaticDND.CurrentDragAndDropData = null;
  }

  render(): React.ReactNode {
    return <DropOverlayComponent view={this}/>
  }

  dispose() {
    super.dispose();
    this.disposed_ = true;
  }

}

@observer
class DropOverlayComponent extends React.Component<{view: DropOverlay}> {

  private containerRef: React.RefObject<HTMLDivElement> = React.createRef();
  @observable private mounted = false;

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    this.mounted = true;
  }

  generateSide(direction: WidgetGroupDirection, className: string, wrapperStyle: any, overlayStyle: any, edgeStyle: any, skinStyle: any) {
    const view = this.props.view;
    return (
      <DragAndDropObserver className={'place side ' + className + (view.currentDropOperation.splitDirection === direction ? 'focus':'')}
          style={wrapperStyle}
          onDragOver={view.dragOverHandler.bind(this, direction)}
          onDrop={view.dropHandler.bind(this, direction)}>
        <div className='overlay' style={overlayStyle} onClick={()=>console.log(123)}>
          <div className='corner1' style={edgeStyle}/>
          <div className='corner2' style={edgeStyle}/>
        </div>
        <div className='skin' style={skinStyle}></div>
      </DragAndDropObserver>
    )
  }
  generateCenter(dndCenterStyle: any) {
    return (
      <div className='place center' style={dndCenterStyle}>
        <div className='overlay'/>
        <div className='skin'/>
      </div>
    )
  }

  evaluateDndSize(): {
    side: number,
    width: number,
    height: number} {
    var minOne = Math.min(this.containerRef.current.offsetWidth, this.containerRef.current.offsetHeight - 20);
    var dndSideSize = Math.min(40, minOne * 0.25);
    var dndCenterWidth = this.containerRef.current.offsetWidth - dndSideSize * 2;
    var dndCenterHeight = this.containerRef.current.offsetHeight - dndSideSize * 2;
    return {
      side: dndSideSize,
      width: dndCenterWidth,
      height: dndCenterHeight
    }
  }

  render() {
    const view = this.props.view;
    if (view.disposed) return null;

    var dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle,
        dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle,
        dndTopSkinBorderStyle, dndTopSkinStyle, dndBottomSkinStyle,
        dndLeftSkinStyle, dndRightSkinStyle,
        dndCenterStyle, dndCenterSkinStyle;
    var dndWidth = 0;
    var dndHeight = 0;
    var sideSize = 0;
    if (this.mounted) {
      const { side, width, height } = this.evaluateDndSize();
      dndWidth = width;
      dndHeight = height;
      sideSize = side;
    }
    dndHorizontalWrapStyle = {
      height: sideSize + 'px'
    }
    dndHorizontalStyle = {
      left: sideSize + 'px',
      right: sideSize + 'px',
      height: sideSize + 'px'
    }
    dndVerticalWrapStyle = {
      width: sideSize + 'px'
    }
    dndVerticalStyle = {
      top: sideSize + 'px',
      bottom: sideSize + 'px',
      width: sideSize + 'px'
    }
    dndEdgeStyle = {
      width: sideSize * 1.414 + 'px',
      height: sideSize * 1.414 + 'px',
    }
    dndTopSkinStyle = {
      borderTopWidth: `${sideSize}px`,
      borderLeftWidth: `${sideSize}px`,
      borderRightWidth: `${sideSize}px`,
      width: dndWidth + 'px',
      height: 0
    }
    dndTopSkinBorderStyle = {
      borderTopWidth: `${sideSize + 1}px`,
      borderLeftWidth: `${sideSize + 1}px`,
      borderRightWidth: `${sideSize + 1}px`,
      width: dndWidth + 'px',
      height: 0
    }
    dndBottomSkinStyle = {
      borderBottomWidth: `${sideSize}px`,
      borderLeftWidth: `${sideSize}px`,
      borderRightWidth: `${sideSize}px`,
      width: dndWidth + 'px',
      height: 0
    }
    dndLeftSkinStyle = {
      borderLeftWidth: `${sideSize}px`,
      borderTopWidth: `${sideSize}px`,
      borderBottomWidth: `${sideSize}px`,
      width: 0,
      height: dndHeight + 'px',
    }
    dndRightSkinStyle = {
      borderRightWidth: `${sideSize}px`,
      borderTopWidth: `${sideSize}px`,
      borderBottomWidth: `${sideSize}px`,
      width: 0,
      height: dndHeight + 'px',
    }
    dndCenterStyle = {
      left: sideSize + 'px',
      right: sideSize + 'px',
      top: sideSize + 'px',
      bottom: sideSize + 'px'
    }

    return (
      <DragAndDropObserver forwardRef={this.containerRef}
          className={`component ${style.component}`}
          onDragLeave={view.dragLeaveHandler}
          onDragEnd={view.dragEndHandler}>
          {this.generateSide(WidgetGroupDirection.UP, 'top', dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle, dndTopSkinStyle)}
          {this.generateSide(WidgetGroupDirection.DOWN, 'bottom', dndHorizontalWrapStyle, dndHorizontalStyle, dndEdgeStyle, dndBottomSkinStyle)}
          {this.generateSide(WidgetGroupDirection.LEFT, 'left', dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle, dndLeftSkinStyle)}
          {this.generateSide(WidgetGroupDirection.RIGHT, 'right', dndVerticalWrapStyle, dndVerticalStyle, dndEdgeStyle, dndRightSkinStyle)}
      </DragAndDropObserver>
    )
  }

}

class DropOverlaySide extends React.PureComponent<{
  view: DropOverlay,
  direction: WidgetGroupDirection,
  className: string,
  wrapperStyle: any,
  overlayStyle: any,
  edgeStyle: any,
  skinStyle: any,
  focused: any,
}> {
  
  render() {
    const { view, direction, className, wrapperStyle, overlayStyle, edgeStyle, skinStyle, focused } = this.props;
    return (
      <DragAndDropObserver className={'place side ' + className} style={wrapperStyle}
          onDragOver={view.dragOverHandler.bind(this, direction)}
          onDrop={view.dropHandler.bind(this, direction)}>
        <div className='overlay' style={overlayStyle} onClick={()=>console.log(123)}>
          <div className='corner1' style={edgeStyle}/>
          <div className='corner2' style={edgeStyle}/>
        </div>
        <div className='skin' style={skinStyle}></div>
      </DragAndDropObserver>
    )
  }

}

export class WidgetGroupDropTarget extends Disposable {

  private overlay_?: IObservableValue<DropOverlay> = observable.box(null);
  public get overlay() { 
    const o = this.overlay_.get();
    if (o && !o.disposed) return o;
    return null;
  }

  private counter_ = 0;

  constructor(
    private readonly widgetGroup_: IWidgetGroup,
    @IWidgetGroupsService private readonly widgetGroupsService_: IWidgetGroupsService,
  ) {
    super();

    this.registerListeners();
  }

  private registerListeners() {
    this._register(this.widgetGroup_.onDragEnter(this.dragEnterHandler, this));
    this._register(this.widgetGroup_.onDragLeave(this.dragLeaveHandler, this));
    this._register(addDisposableListener(window, EventType.DRAG_END, () => this.dragEndHandler()));
  }

  private dragEnterHandler(e: React.DragEvent) {
		this.counter_++;
    console.log('enter', this.counter_, e.target);
    if (!StaticDND.CurrentDragAndDropData || !(StaticDND.CurrentDragAndDropData.getData() instanceof DraggedWidgetIdentifier)) {
      return;
    }

    if (!this.overlay) {
      this.overlay_.set(new DropOverlay(this.widgetGroup_, this.widgetGroupsService_));
    }
  }

  private dragLeaveHandler(e: React.DragEvent) {
		this.counter_--;
    console.log('leave', this.counter_, e.target);
  }

  private dragEndHandler() {
    this.counter_ = 0;
    console.log('end', this.counter_);

    this.disposeOverlay();
  }

	private disposeOverlay(): void {
		if (this.overlay) {
			this.overlay.dispose();
			this.overlay_.set(null);
		}
	}

  render(): React.ReactNode {
    if (this.overlay) return this.overlay.render();
    return null;
  }

}