import { Posted } from "worker-postable";
import { MixinBase } from "base/olive/mixin";
import { WithTimebase } from "internal/timeline/common/timebase";

@Posted
export class TimebaseRenderer extends WithTimebase(MixinBase) {}