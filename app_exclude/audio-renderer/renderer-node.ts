import { AudioRendererInitializationData, AudioRendererStateIndex } from "internal/renderer/audio-renderer/common";
import { AudioRendererMessageEventType, AudioRendererInitMessageEvent, AudioRendererRenderMessageEvent } from "internal/renderer/audio-renderer/message";
import { AudioRendererWorkletNode } from "internal/renderer/audio-renderer/renderer-worklet-node";
import AudioRendererWorker from 'worker-loader!./worker'
import AudioRendererWorklet from 'worklet-loader!./renderer-worklet';
import { Disposable, IDisposable, dispose } from "base/common/lifecycle";
import { ITimeline } from "internal/timeline/common/timeline";
import { IProject } from "internal/project/project";
import { IProjectsService } from "internal/project/projects-service";
import { getPostableID } from "worker-postable";
import { IGlobalTimelineService } from "internal/timeline/common/global-timeline-service";

export class AudioRendererNode extends Disposable {

  private __nextRequestID = 0;

  worker: AudioRendererWorker;
  worklet: AudioRendererWorkletNode;

  private targetProject_: IProject;
  private targetTimeline_: ITimeline;

  private timelineDisposers_: IDisposable[] = [];

  buffers: {
    state: Int32Array
  }

  constructor(
    @IGlobalTimelineService private readonly globalTimelineService_: IGlobalTimelineService) {
    super();

    this.targetTimelineChangedHandler();
    this._register(globalTimelineService_.onTargetTimelineChanged(this.targetTimelineChangedHandler, this));
    // this.currentProjectChangedHandler();
    // this._register(projectsService_.onCurrentProjectChanged(this.currentProjectChangedHandler, this));
    this.worker = new AudioRendererWorker();
  }

  // private currentProjectChangedHandler() {
  //   this.projectDisposables_ = dispose(this.projectDisposables_);
  //   this.targetProject_ = this.projectsService_.getCurrentProject();
  //   if (this.targetProject_ == null) return;
    
  //   this.targetTimelineChangedHandler();
  //   this.targetProject_.timelineService.onTargetTimelineChanged(this.targetTimelineChangedHandler, this, this.projectDisposables_);
  // }

  initialize(initData: AudioRendererInitializationData) {
    
    const context = new AudioContext();
    const source = context.createBufferSource();
    context.audioWorklet.addModule(AudioRendererWorklet).then(() => {
      this.worklet = new AudioRendererWorkletNode(context, initData);

      source.connect(this.worklet);
      this.worklet.connect(context.destination);
      source.start();
    })

    this.buffers = {
      state: new Int32Array(initData.buffers.state)
    }
    this.worker.postMessage({
      type: AudioRendererMessageEventType.INIT,
      data: initData
    } as AudioRendererInitMessageEvent)
  }

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
    const requestID = ++this.__nextRequestID;
    this.worker.postMessage({
      type: AudioRendererMessageEventType.PLAY_RENDER,
      requestID: requestID,
      timelineID: getPostableID(this.targetTimeline_),
      time: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as AudioRendererRenderMessageEvent)
    Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST, requestID);
  }

  private timelinePauseHandler() {
    const requestID = ++this.__nextRequestID;
    this.worker.postMessage({
      type: AudioRendererMessageEventType.PAUSE_RENDER,
      requestID: requestID,
      timelineID: getPostableID(this.targetTimeline_),
      time: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as AudioRendererRenderMessageEvent)
    Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST, requestID);
  }

  private timelineSeekHandler() {
    const requestID = ++this.__nextRequestID;
    this.worker.postMessage({
      type: AudioRendererMessageEventType.RENDER,
      requestID: requestID,
      timelineID: getPostableID(this.targetTimeline_),
      time: this.targetTimeline_.currentTime,
      systemTime: Date.now()
    } as AudioRendererRenderMessageEvent)
    Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST, requestID);
  }

  sendPostableMessage(msg: any) {
    this.worker.postMessage({
      type: 'POST',
      data: msg
    })
  }

}