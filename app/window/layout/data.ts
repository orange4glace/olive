import app from 'internal/app';
import { LayoutDirection, LayoutDirectionUtil, LayoutViewDirection, LayoutViewDirectionUtil } from 'window/layout/layout-direction';
import Layout from './layout';

export class LayoutData {
  id: number;
  direction: LayoutDirection = null;
  parent: LayoutData = null;
  @app.mobx.observable children: Array<LayoutData> = [];
  @app.mobx.observable views: Array<any> = [];

  constructor(direction: LayoutDirection, parent: LayoutData) {
    this.direction = direction;
    this.parent = parent;
    this.children = [];
    this.views = [];
    this.id = Math.floor(Math.random() * 1000);
  }

  insertView(view: any, viewDirection: LayoutViewDirection) {
    console.assert(this.direction == LayoutDirection.VIEW,
      "[LayoutData] insertWindow : layout must be a view");
    if (viewDirection == LayoutViewDirection.CENTER) return;
    console.log('insert window', this.id, viewDirection, this.parent.direction);
    if (LayoutViewDirectionUtil.isOrthogonalToLayoutDirection(viewDirection, this.parent.direction)) {
      var index = this.parent.indexOfChildLayout(this);
      this.parent.children.splice(index, 1);
      var layout = new LayoutData(LayoutDirectionUtil.getOrthogonalDirection(this.parent.direction), this.parent);
      this.parent.children.splice(index, 0, layout);
      this.parent = layout;
      layout.children.push(this);
      
      var win = new LayoutData(LayoutDirection.VIEW, layout);
      win.views.push(window);
      if (LayoutViewDirectionUtil.isTopOrLeft(viewDirection))
        layout.children.splice(0, 0, win);
      else layout.children.splice(1, 0, win);
    }
    else {
      var index = this.parent.indexOfChildLayout(this);
      var layout = new LayoutData(LayoutDirection.VIEW, this.parent);
      layout.views.push(window);
      if (LayoutViewDirectionUtil.isTopOrLeft(viewDirection))
        this.parent.children.splice(index, 0, layout);
      else this.parent.children.splice(index + 1, 0, layout);
    }
  }

  removeView(view: any) {
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

  removeLayout(layout: LayoutData) {
    var index = this.indexOfChildLayout(layout);
    var child = this.children.splice(index, 1)[0];
    if (this.children.length == 1) {
      var replacer = this.children[0];
      var thisIndex = this.parent.indexOfChildLayout(this);
      this.parent.children[thisIndex] = replacer;
      replacer.parent = this.parent;
    }
    return child;
  }

  indexOfChildLayout(childLayout: LayoutData) {
    for (var i = 0; i < this.children.length; i ++) {
      var child = this.children[i];
      if (childLayout == child) return i;
    }
    return -1;
  }
 
  AddChild(view: any, index: number, direction: LayoutDirection) {
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

function parse(json: any) {
  return _parse(null, json);
}

function _parse(par: LayoutData, obj: any) {
  var layout = new LayoutData(LayoutDirectionUtil.fromString(obj.direction), par)
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