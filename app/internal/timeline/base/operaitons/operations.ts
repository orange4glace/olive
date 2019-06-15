import { ITimeline } from "internal/timeline/base/timeline";
import { IOperation } from "base/olive/history/operation";
import { ITrack } from "internal/timeline/base/track/track";

export class AddTrackOperation implements IOperation {

  private track: ITrack;

  constructor(
    private readonly timeline: ITimeline) {

  }

  execute() {
    this.track = this.timeline.addTrack();
  }

  undo() {
    this.timeline.removeTrack(this.track);
  }

  redo() {
    return this.execute();
  }

}