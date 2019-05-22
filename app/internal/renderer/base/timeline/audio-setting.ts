import { Posted, posted } from "worker-postable";
import { AudioSettingBase } from "internal/timeline/audio-setting";

@Posted('AudioSetting')
export class AudioSettingRenderer implements AudioSettingBase {

  @posted sampleRate: number;

}