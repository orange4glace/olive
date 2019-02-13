import { IObservableFactory, IObservableFactories, IEnhancer, IActionFactory, IReactionPublic, IAutorunOptions, IReactionDisposer } from 'mobx';
import { IReactComponent } from 'mobx-react';
import Decoder from 'internal/decoder';
import Timeline from 'internal/timeline/timeline'
import ResourceManager from 'internal/resource/manager';

console.log('APP TS IMPORTED');

interface mobxExport {
  observable: IObservableFactory & IObservableFactories & {
    enhancer: IEnhancer<any>;
  };
  action: IActionFactory;
  autorun: (view: (r: IReactionPublic) => any, opts?: IAutorunOptions) => IReactionDisposer;
  observer: <T extends IReactComponent>(target: T) => T;
}

export default class App {
  decoder: Decoder;
  mobx: mobxExport;
  timeline: Timeline;
  resource: ResourceManager;

  constructor() {
    this.decoder = null;
    this.mobx = {
      observable: null,
      action: null,
      autorun: null,
      observer: null
    };
    this.timeline = null;
    this.resource = null;
  }
}