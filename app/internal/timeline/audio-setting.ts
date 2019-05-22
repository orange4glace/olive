import { postable, Postable } from "worker-postable";

export interface AudioSettingBase {
  sampleRate: number;
}

export interface IAudioSetting extends AudioSettingBase {
  /*@observable*/ readonly sampleRate: number;
}

@Postable
export class AudioSetting implements IAudioSetting {

  @postable sampleRate: number;

  constructor() {
    this.sampleRate = 48000;
  }

}