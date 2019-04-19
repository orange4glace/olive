import { IObservableFactory, IObservableFactories, IEnhancer, IActionFactory, IReactionPublic, IAutorunOptions, IReactionDisposer, IComputed } from 'mobx';
import { IReactComponent } from 'mobx-react';
import ResourceManager from 'internal/resource/manager';
import Factory from './factory';
import { Poster } from 'poster';
import { Project } from './project';
import { TimelineManager } from 'internal/timeline/manager';

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
  project: Project;
  factory: Factory;
  // decoder: IDecoder;
  mobx: mobxExport;
  timeline: TimelineManager;
  resource: ResourceManager;
  workerPoster: Poster;
  canvas: HTMLCanvasElement;
}