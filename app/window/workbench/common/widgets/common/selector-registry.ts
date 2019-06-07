export interface IViewSelectorRegistry<T, U> {

  registerDefault(view: U): void;
  registerView(type: T, view: U): void;
  getView(type: T, useDefault: boolean): U | null;

}

export class ViewSelectorRegistry<T, U> implements IViewSelectorRegistry<T, U> {

  default_: U | null;
  views_: Map<T, U> = new Map();

  registerDefault(view: U): void {
    this.default_ = view;
  }

  registerView(type: T, view: U): void {
    this.views_.set(type, view);
  }

  getView(type: T, useDefault = true): U | null {
    const v = this.views_.get(type);
    if (!v && !useDefault) return null;
    if (v) return v;
    return this.default_;
  }

}