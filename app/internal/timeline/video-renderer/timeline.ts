import { WithTimelineBase } from "internal/timeline/common/timeline";
import { MixinBase } from "base/olive/mixin";
import NVG from "../../../../nanovg-webgl";
import { Posted } from "worker-postable";
import { TrackVideoRenderer } from "internal/timeline/video-renderer/track/track";
import { VideoRendererGlobal } from "internal/renderer/video-renderer/global";

@Posted
export class TimelineVideoRenderer extends WithTimelineBase(MixinBase) {

  protected tracks_: TrackVideoRenderer[];
  public get tracks() { return this.tracks_; }

  async render(time: number) {
    VideoRendererGlobal.nvg.beginFrame(1080, 720, 1);
    for (const track of this.tracks)
      track.beforeDraw(time);
    for (const track of this.tracks)
      await track.draw(time);
    VideoRendererGlobal.nvg.endFrame();
    for (const track of this.tracks)
      track.afterDraw(time);
  }

}