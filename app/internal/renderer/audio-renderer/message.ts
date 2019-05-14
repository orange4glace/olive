import { AudioRendererOption, AudioRendererInitializationData } from "internal/renderer/audio-renderer/common";

export enum AudioRendererMessageEventType {
  INIT,
  REQUEST
}

export interface AudioRendererMessageEvent {
  type: AudioRendererMessageEventType;
}

export interface AudioRendererInitMessageEvent extends AudioRendererMessageEvent {
  data: AudioRendererInitializationData;
}

export interface AudioRendererRequestMessageEvent extends AudioRendererMessageEvent {
  timelineID: number;
  time: number;
}