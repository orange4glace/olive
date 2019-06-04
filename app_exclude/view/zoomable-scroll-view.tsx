import * as React from 'react'
import { observable, action } from 'window/app-mobx';
import { observer } from 'window/app-mobx';
import { EventEmitter2 } from 'eventemitter2'

import hotkeys from 'hotkeys-js';
import { MouseUtil } from 'orangeutil'

import * as style from './zoomable-scroll-view.scss'


const ZOOM_THRESHOLD = 0.03;

export class ZoomableScrollViewController {

  @observable start: number;
  @observable end: number;
  @observable scrollWidth: number = NaN;
  elementRef: React.RefObject<HTMLDivElement>;

  ee: EventEmitter2;

  scrollTo(value: number) {

  }

  constructor() {
    this.start = 0;
    this.end = 1;
    this.ee = new EventEmitter2();
  }
}

interface Props {
  controller: ZoomableScrollViewController
}

@observer
class ScrollBar extends React.Component<Props, {}> {

  spaceRef: React.RefObject<HTMLDivElement>;

  onHandleMouseDownHandler: any;
  onThumbMouseDownHandlerLeft: any;
  onThumbMouseDownHandlerRight: any;

  lastMousePageX: number;

  constructor(props: any) {
    super(props);
    this.spaceRef = React.createRef();
    this.resizeHandler = this.resizeHandler.bind(this);
    this.onHandleMouseDownHandler = this.onThumbMouseDownHandler.bind(this, 'center');
    this.onThumbMouseDownHandlerLeft = this.onThumbMouseDownHandler.bind(this, 'left');
    this.onThumbMouseDownHandlerRight = this.onThumbMouseDownHandler.bind(this, 'right');
    this.onThumbLeftMouseMoveHandler = this.onThumbLeftMouseMoveHandler.bind(this);
    this.onThumbRightMouseMoveHandler = this.onThumbRightMouseMoveHandler.bind(this);
    this.onHandleMouseMoveHandler = this.onHandleMouseMoveHandler.bind(this);
  }

  componentDidMount() {
    this.props.controller.elementRef = this.spaceRef;
    this.props.controller.scrollWidth = this.spaceRef.current.offsetWidth;
    this.props.controller.ee.emit('update');
    setTimeout(()=>
    this.props.controller.ee.emit('update'),500)
    
    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  resizeHandler() {
    this.props.controller.elementRef = this.spaceRef;
    this.props.controller.scrollWidth = this.spaceRef.current.offsetWidth;
    this.props.controller.ee.emit('update');
  }

  onThumbMouseDownHandler(target: string, e: React.MouseEvent) {
    this.updateMouseEventDelta(e);
    var handler = 
      target == 'center' ? this.onHandleMouseMoveHandler : 
      target == 'left'   ? this.onThumbLeftMouseMoveHandler :
                           this.onThumbRightMouseMoveHandler;
    document.addEventListener('mousemove', handler);
    var remover = () => {
      document.removeEventListener('mouseup', remover);
      document.removeEventListener('mousemove', handler);
    }
    document.addEventListener('mouseup', remover);
  }

  @action
  onThumbLeftMouseMoveHandler(e: MouseEvent) {
    var rdx = this.updateMouseEventDelta(e) / this.spaceRef.current.offsetWidth;
    const controller = this.props.controller;
    controller.start = Math.max(controller.start + rdx, 0.0);
    if (controller.end - controller.start < ZOOM_THRESHOLD)
      controller.start = controller.end - ZOOM_THRESHOLD;
    controller.ee.emit('update');
  }

  @action
  onThumbRightMouseMoveHandler(e: MouseEvent) {
    const controller = this.props.controller;
    var rdx = this.updateMouseEventDelta(e) / this.spaceRef.current.offsetWidth;
    controller.end = Math.min(controller.end + rdx, 1.0);
    if (controller.end - controller.start < ZOOM_THRESHOLD)
      controller.end = controller.start + ZOOM_THRESHOLD;
    controller.ee.emit('update');
  }

  @action
  onHandleMouseMoveHandler(e: MouseEvent) {
    const controller = this.props.controller;
    var rdx = this.updateMouseEventDelta(e) / this.spaceRef.current.offsetWidth;
    var expected = rdx;
    if (controller.start + expected <= 0) expected = -controller.start;
    if (controller.end + expected >= 1) expected = 1 - controller.end;
    controller.start += expected;
    controller.end += expected;
    controller.ee.emit('update');
  }

  private updateMouseEventDelta(e: (React.MouseEvent | MouseEvent) ) {
    var dx = e.pageX - this.lastMousePageX;
    this.lastMousePageX = e.pageX;
    return dx;
  }

  render() {
    const controller = this.props.controller;
    var style = {
      left: controller.start * 100 + '%',
      right: (1 - controller.end) * 100 + '%'
    }

    return (
      <div className='scroll-bar' ref={this.spaceRef}>
        <div className='bar' style={style}>
          <div className='handle' onMouseDown={this.onHandleMouseDownHandler}></div>
          <div className='thumb left' onMouseDown={this.onThumbMouseDownHandlerLeft}></div>
          <div className='thumb right' onMouseDown={this.onThumbMouseDownHandlerRight}></div>
        </div>
      </div>
    )
  }
}

@observer
export default class ZoomableScrollView extends React.Component<Props, {}> {

  constructor(props: any) {
    super(props);

    this.wheelHandler = this.wheelHandler.bind(this);
  }

  @action
  wheelHandler(e: React.WheelEvent) {
    var isMac = navigator.platform.toUpperCase().indexOf('MAC')>=0;
    const CONTROL_KEY = (isMac ? hotkeys.command : hotkeys.control);
    if (CONTROL_KEY) {
      const controller = this.props.controller;
      const amount = e.deltaY > 0 ? 1 : -1
      const pivot = MouseUtil.mousePositionElement(e, controller.elementRef.current).x
                    / controller.elementRef.current.offsetWidth;
      const zoom = 0.02;
      const left = zoom * pivot;
      const right = zoom * (1 - pivot);
      const mid = controller.start + (controller.end - controller.start) * pivot;
      let nextStart = Math.max(0, controller.start += amount * left);
      let nextEnd = Math.min(1, controller.end -= amount * right);
      if (nextEnd - nextStart < ZOOM_THRESHOLD) {
        nextStart = mid - ZOOM_THRESHOLD * pivot
        nextEnd = mid + ZOOM_THRESHOLD * (1 - pivot);
      }
      controller.start = nextStart;
      controller.end = nextEnd;
      controller.ee.emit('update');
      e.preventDefault();
    }
  }

  render() {

    return (
      <div className={`zoomable-scroll-view ${style.component}`}
           onWheel={this.wheelHandler}>
        <div className='zoomable-scroll-view-content'>
        {
          isNaN(this.props.controller.scrollWidth) ? <></> :
          React.Children.map(this.props.children, child =>
            React.cloneElement((child as React.ReactElement<any>), {
              scrollViewController: this.props.controller
            })
          )
        }
        </div>
        <ScrollBar controller={this.props.controller}/>
      </div>
    );
  }

}