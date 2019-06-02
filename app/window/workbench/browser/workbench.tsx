import * as React from 'react'
import { TitlebarPart, TitlebarPartView } from 'window/workbench/browser/parts/titlebar/titlebar-part';
import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { InstantiationService } from 'platform/instantiation/common/instantiationService';
import { ServiceCollection } from 'platform/instantiation/common/serviceCollection';
import { getServices } from 'platform/instantiation/common/extensions';

export class Workbench {

  readonly titlebarPart: TitlebarPart;

  constructor(
    serviceCollection: ServiceCollection
  ) {

    const instantiationService = this.initServices(serviceCollection);
    instantiationService.invokeFunction(accessor => {

    })
    this.titlebarPart = new TitlebarPart(instantiationService);
  }

  private initServices(internalServiceCollection: ServiceCollection): IInstantiationService {
    const serviceCollection = new ServiceCollection();
    internalServiceCollection.forEach((id, desc) => {
      serviceCollection.set(id, desc);
    })
    const contributedServices = getServices();
    for (let contributedService of contributedServices)
      serviceCollection.set(contributedService.id, contributedService.descriptor);
    const instantiationService = new InstantiationService(serviceCollection, true);

    return instantiationService;
  }

}

export class WorkbenchView extends React.Component<{workbench: Workbench}> {

  render() {
    const workbench = this.props.workbench;
    return (
      <div className='workbench'>
        <TitlebarPartView titlebarPart={workbench.titlebarPart}/>
      </div>
    )
  }

}