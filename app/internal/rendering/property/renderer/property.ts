import { WithPropertyBase } from "internal/rendering/property/common/property";
import { MixinBase } from "base/olive/mixin";
import { Posted } from "worker-postable";

@Posted
export class PropertyRenderer extends WithPropertyBase(MixinBase) {
  static readonly POSTABLE_TYPE = 'olive.property.Property';
  interpolate(lhs: any, rhs: any, t: number) {
    throw new Error('NotImplementedException');
  }
}