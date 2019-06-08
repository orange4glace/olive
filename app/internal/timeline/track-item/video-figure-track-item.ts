import { VideoTrackItemImpl, VideoTrackItemBase, VideoTrackItem, SerializedVideoTrackItem } from "internal/timeline/track-item/video-track-item";
import { Postable } from "worker-postable";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";
import { clone } from "base/olive/cloneable";

export interface SerializedVideoFigureTrackItem extends SerializedVideoTrackItem {

}

export interface VideoFigureTrackItemBase extends VideoTrackItemBase {

}

export interface VideoFigureTrackItem extends VideoTrackItem {

}

@Postable
export class VideoFigureTrackItemImpl extends VideoTrackItemImpl implements VideoFigureTrackItemBase {

  static readonly TYPE = 'olive.timeline.VideoFigureTrackItem'

  constructor() {
    super(VideoFigureTrackItemImpl.TYPE);
  }

  __setTime(time: TrackItemTime) {
    this.time = clone(time);
    this.onTimeChanged_.fire();
  }

}