import WindowFactory from 'windows/window_factory';

import { LayoutDirection, LayoutViewDirection } from 'layout/layout_direction';
import Layout from './layout';

class LayoutData {
  direction = null;
  parent = null;
  children = [];
  views = [];

  constructor(parent, direction) {
    this.direction = direction;
    this.parent = parent;
    this.children = [];
    this.views = [];
  }

  insertWindow(viewDirection) {
    console.assert(this.direction == LayoutDirection.VIEW,
      "[LayoutData] insertWindow : layout must be a view");
    if (viewDirection == LayoutViewDirection.CENTER) return;
    if (LayoutViewDirection.isOrthogonalToLayoutDirection(viewDirection, this.parent.direction)) {
      
    }
    else {
      var index = this.parent.indexOf(this);
      var layout = new LayoutData(this.parent, LayoutDirection.VIEW);
      this.parent.children.splice(index, 0, layout);
    }
  }

  detach() {
    var index = this.parent.indexOf(this);
    this.parent.detachChild(index);
    return this;
  }

  detachChild(index) {
    var child = this.children.splice(index, 1)[0];
    if (this.children.length == 1) {
      var replacer = this.children[0];
      var thisIndex = this.parent.indexOf(this);
      this.parent.children = replacer;
    }
    return child;
  }

  indexOf(childLayout) {
    for (var i = 0; i < this.children.length; i ++) {
      var child = this.children[i];
      if (childLayout == child) return i;
    }
    return -1;
  }
 
  AddChild(view, index, direction) {
    // Only view can add child except root layout
    if (this.direction != LayoutDirection.VIEW) return console.error("[Layout] Only LayoutDirection.VIEW can add child.", this);
    if (this.parent.direction == direction) {
      this.views.splice(Math.max(0, index), 0, view);
    }
    else {
      // Transform itself into child view
      let itself = new LayoutData(LayoutDirection.VIEW, this);
      itself.views = this.views;

      // Clean itself
      this.direction = direction;
      this.views = [];

      // New view
      let newee = new LayoutData(LayoutDirection.VIEW, this);
      newee.views = [newee];

      this.children.push(itself);
      this.children.splice(Math.max(0, index), 0, newee);
    }
  }
}

function parse(json) {
  return _parse(null, json);
}

function _parse(par, obj) {
  var layout = new LayoutData(par, LayoutDirection.fromString(obj.direction))
  for (let key in obj.views) {
    let view = obj.views[key];
    layout.views.push(view);
  }
  for (let key in obj.children) {
    let child = obj.children[key];
    layout.children.push(_parse(layout, child));
  }
  return layout;
}

export default parse;