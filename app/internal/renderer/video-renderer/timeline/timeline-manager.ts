import { Posted } from "worker-postable";
import { TimelineManagerRenderer } from "internal/renderer/base/all";
import { TimelineVideoRenderer } from "internal/renderer/video-renderer/timeline/timeline";

@Posted('TimelineManagerImpl')
export class TimelineManagerVideoRenderer extends TimelineManagerRenderer<TimelineVideoRenderer> {
}