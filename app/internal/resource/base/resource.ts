import { postable, Postable } from "worker-postable";
import { IFactory, FactoryRegistry } from "internal/common/factory-registry";
import { Registry } from "platform/registry/common/platform";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { Constructor, MixinBase } from "base/olive/mixin";
import { ResourceIdentifier, WithResourceBase } from "internal/resource/common/resouce";

let next_resource_id = 0;

// export abstract class ResourceBase {
//   @postable id_: ResourceIdentifier;
//   @postable path_: string;
// }

export interface IResource {
  readonly id: ResourceIdentifier;
  readonly path: string;
  readonly type: string;

  serialize(): ISerializedResource;
}

export interface ISerializedResource {
  id: ResourceIdentifier;
  path: string;
  type: string;
}

@Postable
export class Resource extends WithResourceBase(MixinBase) implements IResource {
  readonly type: string;

  constructor(id: ResourceIdentifier, type: string, path: string) {
    super();
    this.id_ = id || Math.round(Math.random() * 1000000);
    this.type = type;
    this.path_ = path;
  }

  serialize(): ISerializedResource {
    return {
      id: this.id,
      path: this.path,
      type: this.type
    };
  }

  static deserialize(instantiationService: IInstantiationService, serial: ISerializedResource): Resource | null {
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

export interface ResourceFactory extends IFactory<Resource, ISerializedResource> {}
export class ResourceFactoryRegistry extends FactoryRegistry<ResourceFactory> {
  static readonly ID = 'olive.resource.ResourceFactoryRegistry';
}
Registry.add(ResourceFactoryRegistry.ID, new ResourceFactoryRegistry());