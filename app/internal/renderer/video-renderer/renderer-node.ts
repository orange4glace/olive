import VideoRendererWorker from 'worker-loader!./worker';
import { TimelineManager } from 'internal/timeline/timeline-manager';
import { getPostableID } from 'worker-postable';
import { Timeline } from 'internal/timeline/timeline';
import { VideoRendererRenderMessageEvent, VideoRendererMessageEventType } from 'internal/renderer/video-renderer/message';
import { IDisposable, dispose, Disposable } from 'base/common/lifecycle';

export class VideoRendererNode extends Disposable {
  
  private readonly worker: Worker;

  private timelineManager_: TimelineManager;
  private targetTimeline_: Timeline;
  private timelineDisposers_: IDisposable[] = [];

  constructor() {
    super();
    this.worker = new VideoRendererWorker();
  }

  initialize(timelineManager: TimelineManager, canvas: HTMLCanvasElement) {
    this.timelineManager_ = timelineManager;
    this.worker.postMessage({
      type: 'INIT',
      data: {
        timelineManager: getPostableID(timelineManager),
        canvas: canvas
      }
    }, [canvas as any])

    this.targetTimelineChangedHandler();
    this._register(timelineManager.onTargetTimelineChanged(this.targetTimelineChangedHandler, this));
  }

  private targetTimelineChangedHandler() {
    const lastTargetTimeline = this.targetTimeline_;
    this.timelineDisposers_ = dispose(this.timelineDisposers_);

    const timeline = this.timelineManager_.targetTimeline;
    this.targetTimeline_ = timeline;
    if (!timeline) return;

    timeline.onPlay(this.timelinePlayHandler, this, this.timelineDisposers_);
    timeline.onPause(this.timelinePauseHandler, this, this.timelineDisposers_);
    timeline.onSeek(this.timelineSeekHandler, this, this.timelineDisposers_);
  }

  private timelinePlayHandler() {
    this.worker.postMessage({
      type: VideoRendererMessageEventType.PLAY_RENDER,
      timelineID: this.targetTimeline_.id,
      currentTime: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as VideoRendererRenderMessageEvent)
  }

  private timelinePauseHandler() {
    this.worker.postMessage({
      type: VideoRendererMessageEventType.PAUSE_RENDER,
      timelineID: this.targetTimeline_.id,
      currentTime: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as VideoRendererRenderMessageEvent)
  }

  private timelineSeekHandler() {
    this.worker.postMessage({
      type: VideoRendererMessageEventType.RENDER,
      timelineID: this.targetTimeline_.id,
      currentTime: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as VideoRendererRenderMessageEvent)
  }

  sendPostableMessage(msg: any) {
    this.worker.postMessage({
      type: 'POST',
      data: msg
    })
  }

}