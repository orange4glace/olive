import { LayoutViewDirection } from 'layout/layout-direction';

class LayoutDragAndDrop {

  @mobx.observable targetWindow = null;
  targetLayout = null;
  targetDirection = null;

  @mobx.action
  setTargetWindow(window) {
    this.targetWindow = window;
    console.log('[LayoutDND] SetTargetWindow ', window);
  }

  setTargetLayout(layout) {
    this.targetLayout = layout;
  }

  setTargetDirection(direction) {
    this.targetDirection = direction;
  }

  isTargetWindow(window) {
    return this.targetWindow == window;
  }

  drop() {
    
  }

}

export default new LayoutDragAndDrop();