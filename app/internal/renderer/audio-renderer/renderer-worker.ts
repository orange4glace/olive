import { AudioRenderer } from "internal/renderer/audio-renderer/renderer";
import { AudioRendererMessageEventType, AudioRendererMessageEvent, AudioRendererInitMessageEvent, AudioRendererRequestMessageEvent } from "internal/renderer/audio-renderer/message";

const renderer = new AudioRenderer();

self.onmessage = function handleMessage(e: MessageEvent) {
  const data: AudioRendererMessageEvent = e.data;
  switch (data.type) {
    case AudioRendererMessageEventType.INIT:
      renderer.initialize((data as AudioRendererInitMessageEvent).data);
      break;
    case AudioRendererMessageEventType.REQUEST:
      const request: AudioRendererRequestMessageEvent = e.data;
      renderer.startRender(null, request.time);
      break;
  }
}