import { postable, Postable } from "worker-postable";
import { AudioSettingBase } from "internal/timeline/common/audio-setting";

export interface SerializedAudioSetting {
  sampleRate: number;
}

@Postable
export class AudioSetting extends AudioSettingBase {

  constructor(sampleRate?: number) {
    super();
    this.sampleRate_ = sampleRate || 48000;
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