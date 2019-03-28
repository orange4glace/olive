import * as React from 'react';
import app from 'internal/app'

import mouseEvent from 'util/mouse_event';
import { LayoutDirection, LayoutDirectionUtil } from './layout-direction';
import View from 'window/layout/view';
 
const style = require('./layout.scss');

interface LayoutProps {
  data: any;
  index: number;
}

interface LayoutState {
  dnd?: any;
}

@app.mobx.observer
class Layout extends React.Component<LayoutProps, LayoutState> {

  data: any;
  componentRef: any;
  layoutEventListener: any;

  lastFlex: number;
  flex: number;
  lastMousePosition: any;

  constructor(props: any) {
    super(props);
    this.data = this.props.data;
    this.componentRef = React.createRef();

    this.state = {}
    this.layoutEventListener = {
      resize: null
    };
  }

  componentDidMount() {
    this.data.component = this;
    this.evaluateDndSize();

    setTimeout(()=>this._evaluateFlex());
  }

  _evaluateFlex() {
    if (this.data.direction == LayoutDirection.VIEW) return;
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      (this.data.direction == LayoutDirection.VERTICAL) ?
          child.component.flex = child.component.componentRef.current.offsetHeight :
          child.component.flex = child.component.componentRef.current.offsetWidth
      child.component.lastFlex = child.component.flex;
      child.component._evaluateFlex();
    }
  }

  _applyFlex() {
    if (this.data.direction == LayoutDirection.VIEW) {
      if (this.lastFlex != this.flex) this.layoutEventListener.resize && this.layoutEventListener.resize();
      return;
    }
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      child.component.componentRef.current.parentElement.style.flexBasis = child.component.flex + 'px';
      child.component._applyFlex();
    }
  }

  handleMouseDownHandler(index: number, type: any, e: MouseEvent) {
    this.lastMousePosition = mouseEvent.mousePositionDocument(e);
    var bound = this.handleMouseMoveHandler.bind(this, index, type)
    var mouseup = ()=> {
      this.evaluateDndSize();
      document.removeEventListener('mousemove', bound);
      document.removeEventListener('mouseup', mouseup);
    }
    document.addEventListener('mousemove', bound);
    document.addEventListener('mouseup', mouseup);
    e.stopPropagation();
  }

  handleMouseMoveHandler(index: number, type: any, e: MouseEvent) {
    var position = mouseEvent.mousePositionDocument(e);
    var delta = (this.data.direction == LayoutDirection.VERTICAL) ?
        position.y - this.lastMousePosition.y :
        position.x - this.lastMousePosition.x;
    this.lastMousePosition = position;
    if (delta > 0) this.shrinkVertical(this.data.direction, delta, index + 1, true);
    else if (delta < 0) this.shrinkVertical(this.data.direction, -delta, index, false);
    e.stopPropagation();
  }

  evaluateDndSize() {
    if (this.data.direction == LayoutDirection.VIEW) {
      var minOne = Math.min(this.componentRef.current.offsetWidth, this.componentRef.current.offsetHeight - 20);
      var dndSideSize = Math.min(40, minOne * 0.25);
      var dndCenterWidth = this.componentRef.current.offsetWidth - dndSideSize * 2;
      var dndCenterHeight = this.componentRef.current.offsetHeight - 20 - dndSideSize * 2;
      this.setState({
        dnd: {
          side: dndSideSize,
          width: dndCenterWidth,
          height: dndCenterHeight
        }
      })
      return;
    }
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      child.component.evaluateDndSize();
    }
  }

  shrinkVertical(direction: LayoutDirection, value: number, indexOffset: number, downside: boolean) {
    this._evaluateFlex();
    var shrinked = this._shrinkVertical(direction, value, indexOffset, downside);
    if (downside) {
      var shrinkTarget = this.data.children[indexOffset];
      var growTarget = this.data.children[indexOffset - 1];
      this.growVertical(direction, shrinked, indexOffset - 1, true);
    }
    else {
      var shrinkTarget = this.data.children[indexOffset];
      var growTarget = this.data.children[indexOffset + 1];
      this.growVertical(direction, shrinked, indexOffset + 1, false);
    }
    this._applyFlex();
    // window.dispatchEvent(new Event('resize'));
    console.log('resiz')
  }

  _shrinkVertical(direction: LayoutDirection, value: number, indexOffset: number, downside: boolean) {
    indexOffset = indexOffset == null ? (downside ? 0 : this.data.children.length - 1) : indexOffset;
    var actualValue = this._shrinkVerticalMeasure(direction, value, indexOffset, downside);
    if (this.data.direction == LayoutDirection.VIEW) return actualValue;
    if (this.data.direction == direction) {
      var v = actualValue;
      if (downside) {
        for (var i = indexOffset; i < this.data.children.length; i ++) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVertical(direction, v, null, downside);
          child.component.flex -= shrinked;
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVertical(direction, v, null, downside);
          child.component.flex -= shrinked;
          v -= shrinked;
          if (v <= 0) break;
        }
      }
    }
    else {
      if (downside) {
        for (var i = indexOffset; i < this.data.children.length; i ++) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          child.component._shrinkVertical(direction, actualValue, null, downside);
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          child.component._shrinkVertical(direction, actualValue, null, downside);
        }
      }
    }
    return actualValue;
  }

  _shrinkVerticalMeasure(direction: LayoutDirection, value: number, indexOffset: number, downside: boolean) {
    indexOffset = indexOffset == null ? (downside ? 0 : this.data.children.length - 1) : indexOffset;
    if (this.data.direction == LayoutDirection.VIEW) {
      var size = (direction == LayoutDirection.VERTICAL) ?
          this.componentRef.current.offsetHeight : this.componentRef.current.offsetWidth;
      var shrinked = Math.max(20, size - value)
      var shrink = size - shrinked;
      return shrink;
    }
    if (this.data.direction == direction) {
      var v = value;
      if (downside) {
        for (var i = indexOffset; i < this.data.children.length; i ++) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked: number = child.component._shrinkVerticalMeasure(direction, v, null, downside);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked: number = child.component._shrinkVerticalMeasure(direction, v, null, downside);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      return value - v;
    }
    else {
      var v = value;
      if (downside) {
        for (var i = indexOffset; i < this.data.children.length; i ++) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked: number = child.component._shrinkVerticalMeasure(direction, v, null, downside);
          v = Math.min(v, shrinked);
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked: number = child.component._shrinkVerticalMeasure(direction, v, null, downside);
          v = Math.min(v, shrinked);
        }
      }
      return v;
    }
  }

  growVertical(direction: LayoutDirection, value: number, indexOffset: number, downside: boolean) {
    indexOffset = indexOffset == null ? (!downside ? 0 : this.data.children.length - 1) : indexOffset;
    
    if (this.data.direction == LayoutDirection.VIEW) return;
    if (this.data.direction == direction) {
      var targetChild = this.data.children[indexOffset];
      targetChild.component.flex += value;
      console.assert(targetChild.component, '[Layout] component assert');
      targetChild.component.growVertical(direction, value, null, downside);
    }
    else {
      for (var i = 0; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        child.component.growVertical(direction, value, null, downside);
      }
    }
  }
 
  render() {
    var childIndex = 0;
    return (
      <div className={`${style.component} ${LayoutDirectionUtil.toString(this.data.direction)}
           ${this.data.id} layout`} ref={this.componentRef}>
        {/*
          I don't know the exact reason but if border is directly applied to component,
          Jittering problem occurs on resizing. (offsetWidth can't measure its size properly.)
          To solve that, border is separated.
        */}
        <div className='border'/>
        {
          this.data.direction == LayoutDirection.VIEW ?
          <View dnd={this.state.dnd} windows={this.data.views}
                layout={this.data} layoutEventListener={this.layoutEventListener}/> :
          this.data.children.map((child: any) => {
            var el = null;
            var last = (childIndex == this.data.children.length - 1);
            if (!last) {
              var boundedHandle = this.handleMouseDownHandler.bind(this, childIndex, this.data.direction);
              el = <div className={'layout-container'} key={child.id}>
                       <div className='handle'
                          onMouseDown={boundedHandle}></div>
                       <Layout data={child} index={childIndex}/>
                    </div>
            } else {
              el = <div className='layout-container' key={child.id}>
                      <Layout data={child} index={childIndex}/>
                    </div>
            }
            childIndex++;
            return el;
          })
        }
      </div>
    )
  }
 
}

export default Layout