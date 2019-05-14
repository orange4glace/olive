import { TimelineBase, TimelinePostableStatusEvent } from "internal/timeline/timeline";
import { PostedEvent, posted, Posted } from "worker-postable";
import { TrackRenderer } from "internal/renderer/base/timeline/track";
import { SequenceRenderer } from "internal/renderer/base/project/sequence/sequence";

@Posted('TimelineImpl')
export class TimelineRenderer
    <TrackRendererT extends TrackRenderer = TrackRenderer>
    implements TimelineBase {

  /*@posted*/ id: number;

  /*@posted*/ tracks: Array<TrackRendererT>;

  /*@posted*/ totalTime: number;
  /*@posted*/ currentTimePausing: number;

  @posted sequence: SequenceRenderer;
  
}