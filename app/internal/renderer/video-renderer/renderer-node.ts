import VideoRendererWorker from 'worker-loader!./worker';
import { TimelineManager } from 'internal/timeline/timeline-manager';
import { getPostableID } from 'worker-postable';
import { Timeline, ITimeline } from 'internal/timeline/timeline';
import { VideoRendererRenderMessageEvent, VideoRendererMessageEventType } from 'internal/renderer/video-renderer/message';
import { IDisposable, dispose, Disposable } from 'base/common/lifecycle';
import { ProjectRenderer } from 'internal/renderer/base/all';
import { TimelineManagerVideoRenderer } from 'internal/renderer/video-renderer/timeline/timeline-manager';
import { IProject } from 'internal/project/project';

export class VideoRendererNode extends Disposable {
  
  private readonly worker: Worker;

  private project_: IProject;
  private targetTimeline_: ITimeline;
  private timelineDisposers_: IDisposable[] = [];

  constructor() {
    super();
    this.worker = new VideoRendererWorker();
  }

  initialize(project: IProject, canvas: HTMLCanvasElement) {
    this.project_ = project;
    this.worker.postMessage({
      type: 'INIT',
      data: {
        project: getPostableID(project),
        canvas: canvas
      }
    }, [canvas as any])

    this.targetTimelineChangedHandler();
    this._register(this.project_.timelineManager.onTargetTimelineChanged(this.targetTimelineChangedHandler, this));
  }

  private targetTimelineChangedHandler() {
    const lastTargetTimeline = this.targetTimeline_;
    this.timelineDisposers_ = dispose(this.timelineDisposers_);

    const timeline = this.project_.timelineManager.targetTimeline;
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
      data: msg,
      timelineID: (this.targetTimeline_ ? this.targetTimeline_.id : -1)
    })
  }

}