import { postable, Postable } from "worker-postable";

export interface IAudioSetting {
  /*@observable*/ readonly sampleRate: number;
}

export interface AudioSettingBase {
  sampleRate: number;
}

@Postable
export class AudioSetting implements IAudioSetting, AudioSettingBase {

  @postable sampleRate: number;

  constructor() {
    this.sampleRate = 48000;
  }

}