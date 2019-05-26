import { IObservableFactory, IObservableFactories, IEnhancer, IActionFactory, IReactionPublic, IAutorunOptions, IReactionDisposer, IComputed } from 'mobx';
import { IReactComponent } from 'mobx-react';
import { IProject } from 'internal/project/project';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { IProjectService } from 'internal/project/project-service';

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
  services: IInstantiationService;
  // decoder: IDecoder;
  mobx: mobxExport;
  canvas: HTMLCanvasElement;
}

export interface IApp extends App {}