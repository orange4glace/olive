import { IObservableFactory, IObservableFactories, IEnhancer, IActionFactory, IReactionPublic, IAutorunOptions, IReactionDisposer, IComputed } from 'mobx';
import { IReactComponent } from 'mobx-react';
import { ServiceCollection } from 'platform/instantiation/common/serviceCollection';
import { IKeyboardMapping, IKeyboardLayoutInfo } from 'native-keymap';

interface mobxExport {
  observable: IObservableFactory & IObservableFactories & {
    enhancer: IEnhancer<any>;
  };
  action: IActionFactory;
  autorun: (view: (r: IReactionPublic) => any, opts?: IAutorunOptions) => IReactionDisposer;
  computed: IComputed;
  observer: <T extends IReactComponent>(target: T) => T;
}

export default interface App {
  services: ServiceCollection;
  // decoder: IDecoder;
  mobx: mobxExport;
  canvas: HTMLCanvasElement;
  nativeKeymap: {
    getKeyMap(): IKeyboardMapping;
	  getCurrentKeyboardLayout(): IKeyboardLayoutInfo;
    onDidChangeKeyboardLayout(callback: () => void): void;
    isISOKeyboard(): boolean;
  }
}

export interface IApp extends App {}