import { LayoutDirection, LayoutViewDirection } from 'layout/layout-direction';
import Layout from './layout';

class LayoutData {
  direction = null;
  parent = null;
  @mobx.observable children = [];
  @mobx.observable views = [];

  constructor(parent, direction) {
    this.direction = direction;
    this.parent = parent;
    this.children = [];
    this.views = [];
    this.id = parseInt(Math.random() * 1000);
  }

  insertWindow(viewDirection) {
    console.assert(this.direction == LayoutDirection.VIEW,
      "[LayoutData] insertWindow : layout must be a view");
    if (viewDirection == LayoutViewDirection.CENTER) return;
    console.log('insert window', viewDirection, this.parent.direction);
    if (LayoutViewDirection.isOrthogonalToLayoutDirection(viewDirection, this.parent.direction)) {
      
    }
    else {
      var index = this.parent.indexOfChildLayout(this);
      var layout = new LayoutData(this.parent, LayoutDirection.VIEW);
      this.parent.children.splice(index, 0, layout);
    }
  }

  removeWindow(window) {
    console.log('remove window', this, window);
    console.log(this, this.views.slice(0));
    console.assert(this.direction == LayoutDirection.VIEW,
      "[LayoutData] removeWindow : layout must be a view");
    var idx = this.views.indexOf(window);
    console.assert(idx >= 0,
      "[LayoutData] removeWindow : window not exists", window);
    this.views.splice(idx, 1);
    if (this.views.length == 0) this.remove();
  }

  remove() {
    this.parent.removeLayout(this);
    return this;
  }

  removeLayout(layout) {
    console.log('remove layout', this, layout)
    var index = this.indexOfChildLayout(layout);
    var child = this.children.splice(index, 1)[0];
    if (this.children.length == 1) {
      var replacer = this.children[0];
      var thisIndex = this.parent.indexOfChildLayout(this);
      console.log('replace with',this.parent, thisIndex, replacer)
      this.parent.children[thisIndex] = replacer;
      replacer.parent = this.parent;
    }
    return child;
  }

  indexOfChildLayout(childLayout) {
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