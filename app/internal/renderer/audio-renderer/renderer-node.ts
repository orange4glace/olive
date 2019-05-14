import { AudioRendererInitializationData, AudioRendererStateIndex } from "internal/renderer/audio-renderer/common";
import { AudioRendererRequestMessageEvent, AudioRendererMessageEventType, AudioRendererInitMessageEvent } from "internal/renderer/audio-renderer/message";
import { AudioRendererWorkletNode } from "internal/renderer/audio-renderer/renderer-worklet-node";
import AudioRendererWorker from 'worker-loader!./worker'
import AudioRendererWorklet from 'worklet-loader!./renderer-worklet';

export class AudioRendererNode {

  private __nextRequestID = 0;

  worker: AudioRendererWorker;
  worklet: AudioRendererWorkletNode;

  buffers: {
    state: Int32Array
  }

  constructor(initData: AudioRendererInitializationData) {
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
    this.worker = new AudioRendererWorker();
    this.worker.postMessage({
      type: AudioRendererMessageEventType.INIT,
      data: initData
    } as AudioRendererInitMessageEvent)
  }

  sendPostableMessage(msg: any) {
    this.worker.postMessage({
      type: 'POST',
      data: msg
    })
  }

  startRender(time: number) {
    this.worker.postMessage({
      type: AudioRendererMessageEventType.REQUEST,
      time: time
    } as AudioRendererRequestMessageEvent)
    Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST, ++this.__nextRequestID);
    Atomics.notify(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, 1);
  }

}