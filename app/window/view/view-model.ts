import { IDisposable, Disposable } from "base/common/lifecycle";

let __next_viewmodel_id = 0;

export interface ViewModelIdentifier<T> {
	(...args: any[]): void;
	viewModelName: string;
}

export function declareViewModel<T>(name: string): ViewModelIdentifier<T> {
  const deco = <any>function (target: Function) {
    Object.defineProperty(target, 'viewModelName', {
      value: name,
      writable: true
    })
    Object.defineProperty(target.prototype, 'viewModelName', {
      get() {
        return (target as any).viewModelName;
      }
    })
  }
  deco.viewModelName = name;
  return deco;
}

export interface ViewModel extends IDisposable {
  readonly viewModelName: Symbol | string;
  readonly viewModelID: number;
}

export abstract class ViewModelImpl extends Disposable implements ViewModel {

  constructor() {
    super();
    this.viewModelID = __next_viewmodel_id++;
  }

  static viewModelName: Symbol | string;

  get viewModelName(): Symbol | string {return null;};
  readonly viewModelID: number;

}