import { IDisposable } from "base/common/lifecycle";

export interface ViewModel extends IDisposable {
  readonly viewModelName: Symbol | string;
}

export abstract class ViewModelImpl implements ViewModel {

  static viewModelName: Symbol | string;
  get viewModelName(): Symbol | string {return null;};

  abstract dispose(): void;

}

// @ViewModel
export function ViewModel(name: Symbol | string): any {
  return (target: Function) => {
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
}