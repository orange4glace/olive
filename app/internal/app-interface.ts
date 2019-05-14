import { IObservableFactory, IObservableFactories, IEnhancer, IActionFactory, IReactionPublic, IAutorunOptions, IReactionDisposer, IComputed } from 'mobx';
import { IReactComponent } from 'mobx-react';
import ResourceManager from 'internal/resource/manager';
import Factory from './factory';
import { TimelineManager } from 'internal/timeline/timeline-manager';
import { IHistory } from 'internal/history/history';
import { IProject } from 'internal/project/project';

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
  project: IProject;
  factory: Factory;
  // decoder: IDecoder;
  mobx: mobxExport;
  history: IHistory;
  timeline: TimelineManager;
  resource: ResourceManager;
  canvas: HTMLCanvasElement;
}