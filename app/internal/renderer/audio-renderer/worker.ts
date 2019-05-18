import { forceImport as baseForceImport } from 'internal/renderer/base/all'
baseForceImport();
import { forceImport as audioForceImport } from 'internal/renderer/audio-renderer/all'
audioForceImport();

import { createAudioRendererOption, AudioRendererStateIndex, AudioRendererInitializationData } from "internal/renderer/audio-renderer/common";
import { AudioRendererWorkletNode } from "internal/renderer/audio-renderer/renderer-worklet-node";

import AudioRendererWorklet from 'worklet-loader!./renderer-worklet';
import { Poster } from 'poster';
import { postableMessageHandler, ObjectStore } from 'worker-postable';
import { AudioRenderer } from 'internal/renderer/audio-renderer/renderer';
import { AudioRendererMessageEventType, AudioRendererInitMessageEvent, AudioRendererRenderMessageEvent } from 'internal/renderer/audio-renderer/message';
import { TimelineManagerAudioRenderer } from 'internal/renderer/audio-renderer/timeline/timeline-manager';

const renderer = new AudioRenderer();
let timelineManager: TimelineManagerAudioRenderer;

self.onmessage = function (e: MessageEvent) {
  const data = e.data;
  let msg;
  switch (data.type) {
    case 'POST':
      postableMessageHandler(data.data);
      break;
    case AudioRendererMessageEventType.INIT:
      msg = data as AudioRendererInitMessageEvent;
      timelineManager = ObjectStore.get(msg.timelineManagerID);
      renderer.initialize(msg.data);
      break;
    case AudioRendererMessageEventType.PLAY_RENDER:
      {
      msg = data as AudioRendererRenderMessageEvent;
      const timeline = timelineManager.getTimeline(msg.timelineID);
      renderer.startRender(timeline, msg.time, msg.systemTime, msg.requestID);
      }
      break;
    case AudioRendererMessageEventType.PAUSE_RENDER:
      {
      msg = data as AudioRendererRenderMessageEvent;
      renderer.stopRender(msg.requestID);
      }
      break;
    case AudioRendererMessageEventType.RENDER:
      {
      msg = data as AudioRendererRenderMessageEvent;
      const timeline = timelineManager.getTimeline(msg.timelineID);
      renderer.render(timeline, msg.time, msg.requestID);
      }
      break;
  }
}

// const rendererOption = createAudioRendererOption({
//   frequency: 48000,
//   maxSlot: 8,
//   kernelsPerSlot: 8
// });
// const stateBuffer = new SharedArrayBuffer(AudioRendererStateIndex._SIZE * 4);
// const slotStateBuffer = new SharedArrayBuffer(rendererOption.maxSlot * 4);
// const slotsBuffer = new SharedArrayBuffer(rendererOption.maxSlot * rendererOption.slotLayout.__SIZE);

// const initData: AudioRendererInitializationData = {
//   buffers: {
//     state: stateBuffer,
//     slotState: slotStateBuffer,
//     slotData: slotsBuffer
//   },
//   option: rendererOption
// }

// const context = new AudioContext();
// const source = context.createBufferSource();
// context.audioWorklet.addModule(AudioRendererWorklet).then(() => {

//   const workerNode = new AudioRendererWorkerNode(initData);
//   const workletNode = new AudioRendererWorkletNode(context, initData);

//   source.connect(workletNode);
//   workletNode.connect(context.destination);
//   source.start();
// })