import app from 'internal/app';
import View from 'window/layout/view'
import { LayoutData } from 'window/layout/data'
import { LayoutViewDirection } from 'window/layout/layout-direction';

export class LayoutDragAndDrop {

  @app.mobx.observable targetView: any = null;
  hostLayout: LayoutData = null;
  targetLayout: LayoutData = null;
  targetDirection: LayoutViewDirection = null;

  setTargetView(view: any) {
    this.targetView = view;
    console.log('[LayoutDND] SetTargetWindow ', view);
  }

  setHostLayout(layout: LayoutData) {
    this.hostLayout = layout;
  }

  setTargetLayout(layout: LayoutData) {
    this.targetLayout = layout;
  }

  setTargetDirection(direction: LayoutViewDirection) {
    this.targetDirection = direction;
  }

  isTargetView(view: any) {
    return this.targetView == view;
  }

  drop() {
    if (this.targetView && this.targetLayout && this.targetDirection) {
      this.hostLayout.removeView(this.targetView);
      this.targetLayout.insertView(this.targetView, this.targetDirection);
    }
  }

}

export default new LayoutDragAndDrop();