import WindowFactory from 'windows/window_factory';

class LayoutData {
  direction = null;
  parent = null;
  children = [];
  views = [];

  constructor(direction, parent) {
    this.direction = direction;
    this.parent = parent;
    this.children = [];
    this.views = [];
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
  let layoutData = new LayoutData(obj.direction, par);
  for (let key in obj.views) {
    let view = obj.views[key];
    layoutData.views.push(WindowFactory.create(view));
  }
  for (let key in obj.children) {
    let child = obj.children[key];
    layoutData.children.push(_parse(layoutData, child));
  }
  return layoutData;
}

export default parse;