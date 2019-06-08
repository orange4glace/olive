import { postable, Postable } from "worker-postable";
import { Serializable } from "base/olive/serialize";
import * as uuid from "uuid";
import { IFactory, FactoryRegistry } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";

let next_resource_id = 0;

export type ResourceIdentifier = number;

export interface ResourceBase {
  id: ResourceIdentifier;
  path: string;
}

export interface IResource extends ResourceBase, Serializable {
  readonly type: string;
}

export interface SerializedResource {
  id: ResourceIdentifier;
  path: string;
  type: string;
}

@Postable
export abstract class Resource implements IResource {
  @postable readonly id: ResourceIdentifier;
  @postable readonly path: string;
  readonly type: string;

  constructor(id: ResourceIdentifier, type: string, path: string) {
    this.id = id || Math.round(Math.random() * 1000000);
    this.type = type;
    this.path = path;
  }

  serialize(): SerializedResource {
    return {
      id: this.id,
      path: this.path,
      type: this.type
    };
  }

  static deserialize(instantiationService: IInstantiationService, serial: SerializedResource): Resource | null {
    return instantiationService.invokeFunction<Resource | null>(accessor => {
      const factory = Registry.as<ResourceFactoryRegistry>(ResourceFactoryRegistry.ID).getFactory(serial.type);
      if (!factory) {
        console.warn('ResourceFactory not found. ' + serial);
        return null;
      }
      return factory.deserialize(instantiationService, serial);
    })
  }
}

export interface ResourceFactory extends IFactory<IResource, SerializedResource> {}
export class ResourceFactoryRegistry extends FactoryRegistry<ResourceFactory> {
  static readonly ID = 'olive.resource.ResourceFactoryRegistry';
}
Registry.add(ResourceFactoryRegistry.ID, new ResourceFactoryRegistry());