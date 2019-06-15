import { Constructor } from "base/olive/mixin";
import { IDisposable, dispose, isDisposable, toDisposable } from "base/common/lifecycle";
import { Postabled } from "worker-postable";

export function WithDisposable<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class WithDisposable extends Base {
    static None = Object.freeze<IDisposable>({ dispose() { } });

    protected _toDispose: IDisposable[] = [];
    protected get toDispose(): IDisposable[] { return this._toDispose; }

    private _lifecycle_disposable_isDisposed = false;

    public dispose(): void {
      this._lifecycle_disposable_isDisposed = true;
      this._toDispose = dispose(this._toDispose);
    }

    protected _register<T extends IDisposable>(t: T): T {
      if (this._lifecycle_disposable_isDisposed) {
        console.warn('Registering disposable on object that has already been disposed.');
        t.dispose();
      } else {
        this._toDispose.push(t);
      }

      return t;
    }
  };
  return WithDisposable;
}

export type DisposableMap<T, V extends IDisposable | IDisposable[]> = Map<T, V> & IDisposable;

export function newDisposableMap<T, V extends IDisposable>(): DisposableMap<T, V>
export function newDisposableMap<T, V extends IDisposable[]>(): DisposableMap<T, V> {
  const map = new Map() as DisposableMap<T, V>;
  map.dispose = function() { map.forEach((disposables, _) => dispose(disposables)); }
  return map;
}