export enum VideoRendererMessageEventType {
  PLAY_RENDER,
  PAUSE_RENDER,
  RENDER,
}

export interface VideoRendererMessageEvent {
  type: VideoRendererMessageEventType
}

export interface VideoRendererRenderMessageEvent extends VideoRendererMessageEvent {
  timelineID: number;
  currentTime: number;
  systemTime: number;
}