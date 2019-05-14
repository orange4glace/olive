import { ServiceIdentifier, getService } from "window/service/services";

export interface IServiceProvider {
  getService<T>(id: ServiceIdentifier<T>): T;
}

class ServiceProviderImpl implements IServiceProvider {

  getService<T>(id: ServiceIdentifier<T>): T {
    return getService(id);
  }

}

export const ServiceProvider: IServiceProvider = new ServiceProviderImpl();