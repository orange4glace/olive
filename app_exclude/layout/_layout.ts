import { LayoutDirection, LayoutDirectionUtil, LayoutViewDirection, LayoutViewDirectionUtil } from 'window/layout/layout-direction';
import { IDisposable, Disposable } from 'base/common/lifecycle';
import { observable } from 'window/app-mobx';
import { IViewContainer } from 'window/layout/view-container';

type LayoutOrViewContainer = ILayout | IViewContainer;

type LayoutChild = {
  child: ILayout | IViewContainer;
  flex: number;
}

export interface ILayout extends IDisposable {
  readonly id: number;
  readonly direction: LayoutDirection;
  readonly parent: ILayout;

  /*@observable*/ readonly children: ReadonlyArray<LayoutChild>;

  insertChildLayout(layout: ILayout, index: number): void;
  insertChildViewContainer(viewContainer: IViewContainer, index: number): void;
  removeChildAt(index: number): void;

  resize(index: number, size: number): void;
}

type LayoutChildImpl = {
  child: LayoutModelImpl | IViewContainer;
  flex: number;
}

let __next_layout_model_id = 0;
abstract class LayoutModelImpl extends Disposable implements ILayout {
  
  readonly id: number;
  readonly pixelSize: number;
  readonly direction: LayoutDirection;
  readonly parent: LayoutModelImpl;
  @observable children: Array<LayoutChildImpl>;

  constructor(direction: LayoutDirection, parent: LayoutModelImpl) {
    super();
    this.id = __next_layout_model_id++;
    this.direction = direction;
    this.parent = parent;
    this.children = [];
  }

  insertChildLayout(layout: LayoutModelImpl, index: number): void {
    this.children.splice(index, 0, layout);
  }

  insertChildViewContainer(viewContainer: IViewContainer, index: number): void {
    this.children.splice(index, 0, viewContainer);
  }

  removeChildAt(index: number) {
    this.children.splice(index, 1);
  }

  abstract resize(index: number, size: number): void;

  measureFlexableSize(side: 'DOWNSIDE' | 'UPSIDE'): number {
    return this._measureFlexableSize(this.direction, side);
  }

  _measureFlexableSize(direction: LayoutDirection, side: 'DOWNSIDE' | 'UPSIDE'): number {
    let res = 0;
    if (side == 'DOWNSIDE')
      for (let i = this.children.length - 1; i >= 0; i --) {
        const child = this.children[i];
        res += this.__measureFlexableSize(direction, child, side);
      }
    else
      for (let i = 0; i < this.children.length; i ++) {
        const child = this.children[i];
        res += this.__measureFlexableSize(direction, child, side);
      }
    return res;
  }

  __measureFlexableSize(direction: LayoutDirection, child: LayoutChildImpl, side: 'DOWNSIDE' | 'UPSIDE') {
    // Layout
    let res = 0;
    if (child.child instanceof LayoutModelImpl) {
      const childLayout = child.child;
      if (direction == childLayout.direction)
        res += childLayout._measureFlexableSize(direction, side);
      else 
        res = Math.min(res, childLayout._measureFlexableSize(direction, side));
      return res;
    }
    // ViewContainer
    else {
      const viewContainer = child.child as IViewContainer;
      const viewContainerSize = this.pixelSize * child.flex; 
      const flexableSize = Math.max(0, viewContainerSize - viewContainer.minPixelSize);
      return flexableSize;
    }
  }

}

class HorizontalLayoutModelImpl extends LayoutModelImpl {

  resize(index: number, size: number) {

  }

  resize(index: number, size: number) {
    if (size >= 0) {

    }
  }


}