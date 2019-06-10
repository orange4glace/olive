import { AudioRendererOption, AudioRendererInitializationData } from "internal/renderer/audio-renderer/common";

export enum AudioRendererMessageEventType {
  INIT,
  PLAY_RENDER,
  PAUSE_RENDER,
  RENDER,
}

export interface AudioRendererMessageEvent {
  type: AudioRendererMessageEventType;
}

export interface AudioRendererInitMessageEvent extends AudioRendererMessageEvent {
  timelineManagerID: number;
  data: AudioRendererInitializationData;
}

export interface AudioRendererRenderMessageEvent extends AudioRendererMessageEvent {
  requestID: number;
  timelineID: number;
  time: number;
  systemTime: number;
}