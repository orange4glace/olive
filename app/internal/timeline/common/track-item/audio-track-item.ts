import { postable, Postabled } from "worker-postable";
import { TrackItemBaseCtor, TrackItemBase } from "internal/timeline/common/track-item/track-item";
import { AudioResourceBase } from "internal/resource/common/audio-resource";

export type AudioTrackItemBaseCtor = new (...args: any[]) => AudioTrackItemBase;
export function WithAudioTrackItemBase<TBase extends TrackItemBaseCtor>(Base: TBase) { 
  @Postabled
  class AudioTrackItemBase extends Base {
    static readonly TYPE = 'olive.timeline.AudioTrackItem'
    static readonly POSTABLE_TYPE = AudioTrackItemBase.TYPE;
    
    @postable protected resource_: AudioResourceBase;
    public get resource() { return this.resource_; }
  };
  return AudioTrackItemBase;
}
@Postabled
export class AudioTrackItemBase extends WithAudioTrackItemBase(TrackItemBase) {}