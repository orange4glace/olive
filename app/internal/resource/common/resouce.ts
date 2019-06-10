import { Constructor, MixinBase } from "base/olive/mixin";
import { postable, Postabled } from "worker-postable";

export type ResourceIdentifier = number;

export type ResourceBaseConstructor = new (...args: any[]) => ResourceBase;
export function WithResourceBase<TBase extends Constructor>(Base: TBase) { 
  @Postabled
  class ResourceBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.resource.Resource';
    @postable protected id_: ResourceIdentifier;
    public get id() { return this.id_; }
    @postable protected path_: string;
    public get path() { return this.path_; }
  };
  return ResourceBase;
}
@Postabled
export class ResourceBase extends WithResourceBase(MixinBase) {}