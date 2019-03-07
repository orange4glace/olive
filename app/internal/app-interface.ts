import { IObservableFactory, IObservableFactories, IEnhancer, IActionFactory, IReactionPublic, IAutorunOptions, IReactionDisposer, IComputed } from 'mobx';
import { IReactComponent } from 'mobx-react';
import IDecoder from 'internal/decoder/decoder';
import Timeline from 'internal/timeline/timeline'
import ResourceManager from 'internal/resource/manager';
import Factory from './factory';

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
  factory: Factory,
  decoder: IDecoder;
  nanovg: any;
  mobx: mobxExport;
  timeline: Timeline;
  resource: ResourceManager;
}