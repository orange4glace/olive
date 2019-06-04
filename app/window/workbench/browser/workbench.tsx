import * as style from './workbench.scss'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { TitlebarPart, TitlebarPartView } from 'window/workbench/browser/parts/titlebar/titlebar-part';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { InstantiationService } from 'platform/instantiation/common/instantiationService';
import { ServiceCollection } from 'platform/instantiation/common/serviceCollection';
import { getServices } from 'platform/instantiation/common/extensions';
import { Grid, View, Sizing, Direction } from 'base/browser/ui/grid/grid';
import { IWidgetView } from 'window/workbench/browser/parts/editor/widget-view';
import { EditorPart } from 'window/workbench/browser/parts/editor/editor-part';
import { ConsoleLogMainService, LogLevel, ILogService } from 'platform/log/common/log';
import { IWidgetGroupsService } from 'window/workbench/services/editor/common/widget-groups-service';

export class Workbench {

  readonly titlebarPart: TitlebarPart;
  readonly editorPart: EditorPart;

  constructor(
    serviceCollection: ServiceCollection
  ) {
    const [instantiationService, workbenchServiceCollection] = this.initServices(serviceCollection);
    instantiationService.invokeFunction(accessor => {

    })
    this.titlebarPart = new TitlebarPart(instantiationService);
    this.editorPart = instantiationService.createInstance(EditorPart);
    workbenchServiceCollection.set(IWidgetGroupsService, this.editorPart);
  }

  private initServices(internalServiceCollection: ServiceCollection): [IInstantiationService, ServiceCollection] {
    const serviceCollection = new ServiceCollection();
    internalServiceCollection.forEach((id, desc) => {
      serviceCollection.set(id, desc);
    })

    const logService = new ConsoleLogMainService(LogLevel.Trace);
    serviceCollection.set(ILogService, logService);

    const contributedServices = getServices();
    for (let contributedService of contributedServices)
      serviceCollection.set(contributedService.id, contributedService.descriptor);
    const instantiationService = new InstantiationService(serviceCollection, true);

    return [instantiationService, serviceCollection];
  }

}

export class WorkbenchView extends React.Component<{workbench: Workbench}> {

  readonly gridContainer: React.RefObject<HTMLDivElement> = React.createRef();

  render() {
    const workbench = this.props.workbench;
    return (
      <div className={`workbench ${style.component}`}>
        <div className='titlebar-container'>
          <TitlebarPartView titlebarPart={workbench.titlebarPart}/>
        </div>
        <div className='main-container'>
          {workbench.editorPart.render()}
        </div>
      </div>
    )
  }

}