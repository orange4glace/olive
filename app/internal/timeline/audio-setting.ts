import { postable, Postable } from "worker-postable";

export interface AudioSettingBase {
  sampleRate: number;
}

export interface IAudioSetting extends AudioSettingBase {
  /*@observable*/ readonly sampleRate: number;

  serialize(): object;
}

export interface SerializedAudioSetting {
  sampleRate: number;
}

@Postable
export class AudioSetting implements IAudioSetting {

  @postable sampleRate: number;

  constructor(sampleRate?: number) {
    this.sampleRate = sampleRate || 48000;
  }

  serialize(): SerializedAudioSetting {
    return {
      sampleRate: this.sampleRate
    }
  }

  static deserialize(obj: SerializedAudioSetting) {
    return new AudioSetting(obj.sampleRate);
  }

}