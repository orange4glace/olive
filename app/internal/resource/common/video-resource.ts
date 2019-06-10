import { ResourceBaseConstructor, ResourceBase } from "internal/resource/common/resouce";
import { postable, Postabled } from "worker-postable";

export function WithVideoResourceBase<T extends ResourceBaseConstructor>(Base: T) { 
  @Postabled
  class VideoResourceBase extends Base {
    static readonly POSTABLE_TYPE = 'olive.resource.VideoResource';
    @postable protected width_: number;
    public get width() { return this.width_; }
    @postable protected height_: number;
    public get height() { return this.height_; }
  };
  return VideoResourceBase;
}
@Postabled
export class VideoResourceBase extends WithVideoResourceBase(ResourceBase) {}