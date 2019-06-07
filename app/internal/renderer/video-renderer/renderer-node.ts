import VideoRendererWorker from 'worker-loader!./worker';
import { getPostableID } from 'worker-postable';
import { ITimeline } from 'internal/timeline/timeline';
import { VideoRendererRenderMessageEvent, VideoRendererMessageEventType } from 'internal/renderer/video-renderer/message';
import { IDisposable, dispose, Disposable } from 'base/common/lifecycle';
import { IGlobalTimelineService } from 'internal/timeline/global-timeline-service';

export class VideoRendererNode extends Disposable {
  
  private readonly worker: Worker;

  private targetTimeline_: ITimeline;

  private timelineDisposers_: IDisposable[] = [];

  constructor(
    @IGlobalTimelineService private readonly globalTimelineService_: IGlobalTimelineService) {
    super();

    this.targetTimelineChangedHandler();
    this._register(globalTimelineService_.onTargetTimelineChanged(this.targetTimelineChangedHandler, this));
    // this.currentProjectChangedHandler();
    // this._register(projectService_.onCurrentProjectChanged(this.currentProjectChangedHandler, this));
    this.worker = new VideoRendererWorker();
  }

  initialize(
    canvas: HTMLCanvasElement) {
    this.worker.postMessage({
      type: 'INIT',
      data: {
        canvas: canvas
      }
    }, [canvas as any])
  }

  // private currentProjectChangedHandler() {
  //   this.projectDisposables_ = dispose(this.projectDisposables_);
  //   this.targetProject_ = this.projectService_.getCurrentProject();
  //   if (this.targetProject_ == null) return;
  //   this.targetTimelineChangedHandler();
  //   this.targetProject_.timelineService.onTargetTimelineChanged(this.targetTimelineChangedHandler, this, this.projectDisposables_);
  // }

  private targetTimelineChangedHandler() {
    const lastTargetTimeline = this.targetTimeline_;
    this.timelineDisposers_ = dispose(this.timelineDisposers_);

    const timeline = this.globalTimelineService_.targetTimeline;
    this.targetTimeline_ = timeline;

    if (!timeline) return;

    timeline.onPlay(this.timelinePlayHandler, this, this.timelineDisposers_);
    timeline.onPause(this.timelinePauseHandler, this, this.timelineDisposers_);
    timeline.onSeek(this.timelineSeekHandler, this, this.timelineDisposers_);
  }

  private timelinePlayHandler() {
    this.worker.postMessage({
      type: VideoRendererMessageEventType.PLAY_RENDER,
      timelineID: getPostableID(this.targetTimeline_),
      currentTime: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as VideoRendererRenderMessageEvent)
  }

  private timelinePauseHandler() {
    this.worker.postMessage({
      type: VideoRendererMessageEventType.PAUSE_RENDER,
      timelineID: getPostableID(this.targetTimeline_),
      currentTime: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as VideoRendererRenderMessageEvent)
  }

  private timelineSeekHandler() {
    console.log(this.targetTimeline_);
    this.worker.postMessage({
      type: VideoRendererMessageEventType.RENDER,
      timelineID: getPostableID(this.targetTimeline_),
      currentTime: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as VideoRendererRenderMessageEvent)
  }

  sendPostableMessage(msg: any) {
    this.worker.postMessage({
      type: 'POST',
      data: msg,
      timelineID: (this.targetTimeline_ ? this.targetTimeline_.id : -1)
    })
  }

}