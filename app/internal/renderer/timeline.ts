import { ITimeline } from './worker-postable-generated'

import Track from './track'

export default class Timleine implements ITimeline {

  totalTime: number;
  currentTime: number;
  tracks: Array<Track>;

}