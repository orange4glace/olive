import { ILayout } from "window/layout/layout";
import { IDisposable, Disposable } from "base/common/lifecycle";

export interface IViewContainer extends IDisposable {

  readonly parent: ILayout;
  readonly minPixelSize: number;
  readonly views: ReadonlyArray<any>;

  insertView(index: number, view: any): void;

}

export class ViewContainerImpl extends Disposable implements IViewContainer {

  parent: ILayout;
  views: any[];

  constructor() {
    super();
  }

  insertView(index: number, view: any): void {
    this.views.splice(index, 0, view);
  }

}