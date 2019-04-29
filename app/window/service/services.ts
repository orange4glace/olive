export interface ServiceIdentifier<T> {
	(...args: any[]): void;
	type: T;
}

const serviceIds = new Map<string, ServiceIdentifier<any>>();
const DI_TARGET = Symbol('$di$target');
const DI_DEPENDENCIES = Symbol('$di$dependencies');

function storeServiceDependency(id: Function, target: any, index: number, optional: boolean): void {
	if (target[DI_TARGET] === target) {
		target[DI_DEPENDENCIES].push({ id, index, optional });
	} else {
		target[DI_DEPENDENCIES] = [{ id, index, optional }];
		target[DI_TARGET] = target;
	}
}

export function createDecorator<T>(serviceId: string): { (...args: any[]): void; type: T; } {

	if (serviceIds.has(serviceId)) {
		return serviceIds.get(serviceId)!;
	}

	const id = <any>function (target: Function, key: string, index: number): any {
		if (arguments.length !== 3) {
			throw new Error('@IServiceName-decorator can only be used to decorate a parameter');
		}
		storeServiceDependency(id, target, index, false);
	};

	id.toString = () => serviceId;

	serviceIds.set(serviceId, id);
	return id;
}

const services = new Map<ServiceIdentifier<any>, any>();

export function getService<T>(id: ServiceIdentifier<T>): T {
  return services.get(id);
}

export function setService<T>(id: ServiceIdentifier<T>, instance: any): T {
  console.log('SET SERVICE', id, instance);
  const result = services.get(id);
  services.set(id, instance);
  return result;
}