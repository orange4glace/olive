import React from 'react';

import mouseEvent from 'util/mouse_event';

import style from './layout.scss';
 
import LayoutDirection from './layout_direction';
 
class Layout extends React.Component {

  constructor(props) {
    super(props);
    this.data = this.props.data;
    this.componentRef = React.createRef();

    var id = parseInt(Math.random() * 10000);
    this.data.id = id;
  }

  componentDidMount() {
    this.data.component = this;
  }

  _evaluateFlex() {
    if (this.data.direction == LayoutDirection.VIEW) return;
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      (this.data.direction == LayoutDirection.VERTICAL) ?
          child.component.flex = child.component.componentRef.current.clientHeight :
          child.component.flex = child.component.componentRef.current.clientWidth
      child.component._evaluateFlex();
    }
  }

  _applyFlex() {
    if (this.data.direction == LayoutDirection.VIEW) return;
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      child.component.componentRef.current.parentElement.style.flexBasis = child.component.flex + 'px';
      child.component._applyFlex();
    }
  }

  handleMouseDownHandler(index, type, e) {
    console.log(e,index,type)
    this.lastMousePosition = mouseEvent.mousePositionDocument(e);
    var bound = this.handleMouseMoveHandler.bind(this, index, type)
    document.addEventListener('mousemove', bound);
    document.addEventListener('mouseup',
        ()=>document.removeEventListener('mousemove', bound));
  }

  handleMouseMoveHandler(index, type, e) {
    var position = mouseEvent.mousePositionDocument(e);
    var delta = (this.data.direction == LayoutDirection.VERTICAL) ?
        position.y - this.lastMousePosition.y :
        position.x - this.lastMousePosition.x;
    this.lastMousePosition = position;
    if (delta > 0) this.shrinkVertical(this.data.direction, delta, index + 1, true);
    else if (delta < 0) this.shrinkVertical(this.data.direction, -delta, index, false);
  }

  shrinkVertical(direction, value, indexOffset, downside) {
    this._evaluateFlex();
    var shrinked = this._shrinkVertical(this.data.direction, value, indexOffset, downside);
    if (downside) {
      var growTarget = this.data.children[indexOffset - 1];
      growTarget.component.growVertical(shrinked, true);
    }
    else {
      var growTarget = this.data.children[indexOffset + 1];
      growTarget.component.growVertical(shrinked, false);
    }
    this._applyFlex();
  }

  _shrinkVertical(direction, value, indexOffset, downside) {
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
      for (var i = indexOffset; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        child.component._shrinkVertical(direction, actualValue, null, downside);
      }
    }
    return actualValue;
  }

  _shrinkVerticalMeasure(direction, value, indexOffset, downside) {
    indexOffset = indexOffset == null ? (downside ? 0 : this.data.children.length - 1) : indexOffset;
    if (this.data.direction == LayoutDirection.VIEW) {
      var size = (direction == LayoutDirection.VERTICAL) ?
          this.componentRef.current.clientHeight : this.componentRef.current.clientWidth;
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
          var shrinked = child.component._shrinkVerticalMeasure(direction, v, null, downside);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVerticalMeasure(direction, v, null, downside);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      return value - v;
    }
    else {
      var v = value;
      for (var i = indexOffset; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        var shrinked = child.component._shrinkVerticalMeasure(direction, v, null, downside);
        v = Math.min(v, shrinked);
      }
      return v;
    }
  }

  growVertical(value, downside) {
    this.flex += value;
    if (this.data.direction == LayoutDirection.VERTICAL) {
      var targetChild;
      if (downside) targetChild = this.data.children[this.data.children.length - 1];
      else targetChild = this.data.children[0];
      console.assert(targetChild.component, '[Layout] component assert');
      targetChild.component.growVertical(value);
    }
    if (this.data.direction == LayoutDirection.HORIZONTAL) {
      for (var i = 0; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        child.component.growVertical(value);
      }
    }
  }
 
  render() {
    var childIndex = 0;
    return (
      <div className={`${style.component} ${this.data.direction} ${this.data.id} layout`} ref={this.componentRef}>
        {
          this.data.direction == LayoutDirection.VIEW ?
          this.data.views.map(view => view) :
          this.data.children.map(child => {
            var el = null;
            var last = (childIndex == this.data.children.length - 1);
            if (!last) {
              var boundedHandle = this.handleMouseDownHandler.bind(this, childIndex, this.data.direction);
              el = <div className={'layout-container'}>
                       <div className='handle'
                          onMouseDown={boundedHandle}></div>
                       <Layout data={child} index={childIndex}/>
                    </div>
            } else {
              el = <div className='layout-container'>
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