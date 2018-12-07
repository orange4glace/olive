import { LayoutViewDirection } from 'layout/layout-direction';

class LayoutDragAndDrop {

  @mobx.observable targetWindow = null;
  hostLayout = null;
  targetLayout = null;
  targetDirection = null;

  setTargetWindow(window) {
    this.targetWindow = window;
    console.log('[LayoutDND] SetTargetWindow ', window);
  }

  setHostLayout(layout) {
    this.hostLayout = layout;
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
    if (this.targetWindow && this.targetLayout && this.targetDirection) {
      this.hostLayout.removeWindow(this.targetWindow);
      this.targetLayout.insertWindow(this.targetWindow, this.targetDirection);
    }
  }

}

export default new LayoutDragAndDrop();