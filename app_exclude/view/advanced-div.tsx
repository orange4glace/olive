import * as React from 'react'

import { EventEmitter2 } from 'eventemitter2'

import * as DragAndDrop from 'window/dragndrop'

const __emitter = new EventEmitter2();

export interface ADivProps extends React.HTMLAttributes<Element> {
  onDocumentMouseMoveStart?: (e: MouseEvent) => boolean | void;
  onDocumentMouseMoveEnd?: EventListener;
  onDocumentMouseMove?: EventListener;
  onDocumentDragStart?: (e: React.DragEvent<Element>, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDragEnd?: (e: React.DragEvent<Element>, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDragEnter?: (e: React.DragEvent<Element>, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDragLeave?: (e: React.DragEvent<Element>, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDragOver?: (e: React.DragEvent<Element>, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDrop?: (e: React.DragEvent<Element>, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDragDataChange?: (data: any, dnd: DragAndDrop.DragAndDrop) => void;
  onDocumentDragTypeChange?: (type: string, dnd: DragAndDrop.DragAndDrop) => void;
  listenEvent?: Array<string>;
  elementGroup?: string;
  onGlobalMouseDown?: (event: React.MouseEvent, group?: string) => void;
}

interface _Props extends ADivProps {
  ref?: any;
  forwardedRef: any;
}

class AdvancedDiv extends React.PureComponent<_Props, any> {

  GLOBAL_HANDLER: any;

  constructor(props: any) {
    super(props);

    this.mouseDownHandler = this.mouseDownHandler.bind(this);
    this.documentMouseMoveStartHandler = this.documentMouseMoveStartHandler.bind(this);
    this.documentMouseMoveHandler = this.documentMouseMoveHandler.bind(this);
    this.documentMouseUpHandler = this.documentMouseUpHandler.bind(this);

    this.GLOBAL_HANDLER = {
      'mousedown': this.props.onGlobalMouseDown
    }
  }

  componentDidMount() {
    /* !!! Possible memory leak if props.listenEvent changes */
    const listen = this.props.listenEvent || [];
    listen.forEach(eventName => {
      __emitter.addListener(eventName, this.GLOBAL_HANDLER);
    })
  }

  componentWillUnmount() {
    const listen = this.props.listenEvent || [];
    listen.forEach(eventName => {
      __emitter.removeListener(eventName, this.GLOBAL_HANDLER);
    })
  }

  mouseDownHandler(e: React.MouseEvent) {
    if (this.props.onMouseDown) {
      this.props.onMouseDown(e);
    }
    __emitter.emit('mousedown', e, this.props.elementGroup);

    const remover1 = (e: MouseEvent) => {
      this.documentMouseMoveStartHandler(e);
      document.removeEventListener('mousemove', remover1);
      document.removeEventListener('mouseup', remover2);
    }
    document.addEventListener('mousemove', remover1);
    
    const remover2 = (e: MouseEvent) => {
      document.removeEventListener('mousemove', remover1);
      document.removeEventListener('mouseup', remover2);
    }
    document.addEventListener('mouseup', remover2);
  }

  documentMouseMoveStartHandler(e: MouseEvent) {
    if (this.props.onDocumentMouseMoveStart) {
      const result = this.props.onDocumentMouseMoveStart(e);
      if (result) {
        const remover = (e: MouseEvent) => {
          this.documentMouseUpHandler(e);
          document.removeEventListener('mousemove', this.documentMouseMoveHandler);
          document.removeEventListener('mouseup', remover);
        }
        document.addEventListener('mousemove', this.documentMouseMoveHandler);
        document.addEventListener('mouseup', remover);
        this.documentMouseMoveHandler(e);
      }
    }
  }

  documentMouseMoveHandler(e: MouseEvent) {
    if (this.props.onDocumentMouseMove) this.props.onDocumentMouseMove(e);
  }

  documentMouseUpHandler(e: MouseEvent) {
    if (this.props.onDocumentMouseMoveEnd) this.props.onDocumentMouseMoveEnd(e);
  }

  render() {
    let props = { ... this.props };
    delete props.onDocumentMouseMove;
    delete props.onDocumentMouseMoveStart;
    delete props.onDocumentMouseMoveEnd;
    delete props.onDocumentDragStart;
    delete props.onDocumentDragEnter;
    delete props.onDocumentDragLeave;
    delete props.onDocumentDragOver;
    delete props.onDocumentDrop;
    delete props.onDocumentDragDataChange;
    delete props.onDocumentDragTypeChange;
    delete props.onGlobalMouseDown;
    delete props.forwardedRef;
    delete props.elementGroup;
    props.onMouseDown = this.mouseDownHandler;
    props.ref = this.props.forwardedRef;
    return React.cloneElement(<div/>, props);
  }

}

export type Ref = HTMLDivElement;

const ADiv = React.forwardRef<Ref, ADivProps>((props, ref) => <AdvancedDiv {...props} forwardedRef={ref}></AdvancedDiv>)
export default ADiv;