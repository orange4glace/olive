import React from 'react';

import mouseEvent from 'util/mouse_event';

import style from './layout.scss';
 
const LayoutDirection = {
  VIEW: "VIEW",
  HORIZONTAL: "HORIZONTAL",
  VERTICAL: "VERTICAL"
}
 
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
    var dy = position.y - this.lastMousePosition.y;
    console.log(dy);
    this.lastMousePosition = position;
    if (dy > 0) {
      this.shrinkVertical(dy, index + 1, true);
    }
  }

  shrinkVertical(value, indexOffset, downside) {
    this._evaluateFlex();
    var shrinked = this._shrinkVertical(value, indexOffset, downside);
    console.log('shrinked ',shrinked);
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

  _evaluateFlex() {
    if (this.data.direction == LayoutDirection.VIEW) return;
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      (this.data.direction == LayoutDirection.VERTICAL) ?
          child.component.flex = child.component.componentRef.current.clientHeight :
          child.component.flex = child.component.componentRef.current.clientWidth
      console.log(`evaluated flex ${child.component.data.id} ${child.component.flex}`);
      child.component._evaluateFlex();
    }
  }

  _applyFlex() {
    if (this.data.direction == LayoutDirection.VIEW) return;
    for (var i = 0; i < this.data.children.length; i ++) {
      var child = this.data.children[i];
      child.component.componentRef.current.style.flex = child.component.flex;
      child.component._applyFlex();
    }
  }

  _shrinkVertical(value, indexOffset, downside) {
    indexOffset = indexOffset || (downside ? 0 : this.data.children.length - 1);
    var actualValue = this._shrinkVerticalMeasure(value, indexOffset, downside);
    this.flex -= actualValue;
    console.log(`shrink_vertical ${this.data.id} ${this.flex}`)
    if (this.data.direction == LayoutDirection.VERTICAL) {
      var v = actualValue;
      if (downside) {
        for (var i = indexOffset; i < this.data.children.length; i ++) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVertical(v, null, downside);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVertical(v, null, downside);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
    }
    if (this.data.direction == LayoutDirection.HORIZONTAL) {
      for (var i = indexOffset; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        child.component._shrinkVertical(actualValue, null, downside);
      }
    }
    return actualValue;
  }

  _shrinkVerticalMeasure(value, indexOffset, downside) {
    indexOffset = indexOffset || (downside ? 0 : this.data.children.length - 1);
    if (this.data.direction == LayoutDirection.VERTICAL) {
      var v = value;
      if (downside) {
        for (var i = indexOffset; i < this.data.children.length; i ++) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVerticalMeasure(v);
          v -= shrinked;
          if (v <= 0) break;
        }
      }
      else {
        for (var i = indexOffset; i >= 0; i --) {
          var child = this.data.children[i];
          console.assert(child.component, '[Layout] Propagation assert');
          var shrinked = child.component._shrinkVerticalMeasure(v);
        }
      }
      return value - v;
    }
    if (this.data.direction == LayoutDirection.HORIZONTAL) {
      var v = Number.MAX_SAFE_INTEGER;
      for (var i = indexOffset; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        var shrinked = child.component._shrinkVerticalMeasure(v);
        v = Math.min(v, shrinked);
      }
      return v;
    }
    if (this.data.direction == LayoutDirection.VIEW) {
      var size = this.componentRef.current.clientHeight;
      var shrinked = Math.max(20, size - value)
      var shrink = size - shrinked;
      return shrink;
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
      for (var i = indexOffset; i < this.data.children.length; i ++) {
        var child = this.data.children[i];
        console.assert(child.component, '[Layout] Propagation assert');
        child.component.growVertical(value);
      }
    }
  }
 
  render() {
    console.log(this.data);
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
              var boundedHandle = this.handleMouseDownHandler.bind(this, childIndex, LayoutDirection.VERTICAL);
              el = <div className='layout-container vertical'>
                       <div className='handle vertical'
                          onMouseDown={boundedHandle}></div>
                       <Layout data={child} index={childIndex}/>
                    </div>
            } else {
              el = <div className='layout-container vertical'>
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