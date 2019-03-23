import { TimePairBase } from "internal/timeline/time-pair";
import { Posted } from "worker-postable";

@Posted('TimePair')
export class TimePairRenderer implements TimePairBase {

  start: number;
  end: number;

}