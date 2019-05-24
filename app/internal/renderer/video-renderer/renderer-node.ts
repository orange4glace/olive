import VideoRendererWorker from 'worker-loader!./worker';
import { getPostableID } from 'worker-postable';
import { ITimeline } from 'internal/timeline/timeline';
import { VideoRendererRenderMessageEvent, VideoRendererMessageEventType } from 'internal/renderer/video-renderer/message';
import { IDisposable, dispose, Disposable } from 'base/common/lifecycle';
import { IProject } from 'internal/project/project';
import { IProjectService } from 'internal/project/project-service';

export class VideoRendererNode extends Disposable {
  
  private readonly worker: Worker;

  private targetProject_: IProject;
  private targetTimeline_: ITimeline;

  private projectDisposables_: IDisposable[] = [];
  private timelineDisposers_: IDisposable[] = [];

  constructor(
    @IProjectService private readonly projectService_: IProjectService) {
    super();

    this._register(projectService_.onCurrentProjectChanged(this.currentProjectChangedHandler, this));
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

  private currentProjectChangedHandler() {
    this.projectDisposables_ = dispose(this.projectDisposables_);
    this.targetProject_ = this.projectService_.getCurrentProject();
    this.targetTimelineChangedHandler();
    this.targetProject_.timelineService.onTargetTimelineChanged(this.targetTimelineChangedHandler, this, this.projectDisposables_);
  }

  private targetTimelineChangedHandler() {
    const lastTargetTimeline = this.targetTimeline_;
    this.timelineDisposers_ = dispose(this.timelineDisposers_);

    const timeline = this.targetProject_.timelineService.targetTimeline;
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