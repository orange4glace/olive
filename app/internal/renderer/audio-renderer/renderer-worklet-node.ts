import { AudioRendererInitializationData } from "internal/renderer/audio-renderer/common";
import { AudioRendererInitMessageEvent, AudioRendererMessageEventType } from "internal/renderer/audio-renderer/message";

export class AudioRendererWorkletNode extends AudioWorkletNode {

  constructor(context: AudioContext, initData: AudioRendererInitializationData) {
    super(context, 'audio-renderer-worklet-processor');

    this.port.postMessage({
      type: AudioRendererMessageEventType.INIT,
      data: initData
    } as AudioRendererInitMessageEvent);
  }

}