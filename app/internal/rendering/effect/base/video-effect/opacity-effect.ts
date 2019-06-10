// import { VideoEffect } from "./video-effect";
// import { ScalarProperty } from "../../property/scalar-property";
// import { postable, Postable } from "worker-postable";
// import { clone } from "base/olive/cloneable";

// export interface OpacityEffectBase extends VideoEffectBase {
//   opacity: ScalarPropertyBase;
// }

// @Postable
// export class OpacityEffect extends VideoEffect {
//   @postable opacity: ScalarProperty;

//   constructor() {
//     super('')
//   }

//   clone(obj: OpacityEffect): Object {
//     super.clone(obj);
//     obj.opacity = clone(this.opacity);
//     return obj;
//   }

//   serialize(): any {
//     throw new Error('Not implemeneted');
//   }
// }