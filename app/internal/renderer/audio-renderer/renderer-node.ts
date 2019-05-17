import { AudioRendererInitializationData, AudioRendererStateIndex } from "internal/renderer/audio-renderer/common";
import { AudioRendererMessageEventType, AudioRendererInitMessageEvent, AudioRendererRenderMessageEvent } from "internal/renderer/audio-renderer/message";
import { AudioRendererWorkletNode } from "internal/renderer/audio-renderer/renderer-worklet-node";
import AudioRendererWorker from 'worker-loader!./worker'
import AudioRendererWorklet from 'worklet-loader!./renderer-worklet';
import { TimelineManager } from "internal/timeline/timeline-manager";
import { getPostableID } from "worker-postable";
import { Disposable, IDisposable, dispose } from "base/common/lifecycle";
import { Timeline } from "internal/timeline/timeline";

export class AudioRendererNode extends Disposable {

  private __nextRequestID = 0;

  worker: AudioRendererWorker;
  worklet: AudioRendererWorkletNode;

  private timelineManager_: TimelineManager;
  private targetTimeline_: Timeline;
  private timelineDisposers_: IDisposable[] = [];

  buffers: {
    state: Int32Array
  }

  constructor() {
    super();
    this.worker = new AudioRendererWorker();
  }

  initialize(timelineManager: TimelineManager, initData: AudioRendererInitializationData) {
    this.timelineManager_ = timelineManager;
    
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
      timelineManagerID: getPostableID(timelineManager),
      data: initData
    } as AudioRendererInitMessageEvent)

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
    const requestID = ++this.__nextRequestID;
    this.worker.postMessage({
      type: AudioRendererMessageEventType.PLAY_RENDER,
      requestID: requestID,
      timelineID: this.targetTimeline_.id,
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
      timelineID: this.targetTimeline_.id,
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
      timelineID: this.targetTimeline_.id,
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