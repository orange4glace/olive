import { VideoTrackItemImpl, VideoTrackItemBase, VideoTrackItem } from "internal/timeline/track-item/video-track-item";
import { Postable } from "worker-postable";
import { TrackItemType } from "internal/timeline/track-item/track-item-type";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";
import { clone } from "base/common/cloneable";

export interface VideoFigureTrackItemBase extends VideoTrackItemBase {

}

export interface VideoFigureTrackItem extends VideoTrackItem {

}

@Postable
export class VideoFigureTrackItemImpl extends VideoTrackItemImpl implements VideoFigureTrackItemBase {

  constructor() {
    super(TrackItemType.VIDEO_FIGURE);
  }

  __setTime(time: TrackItemTime) {
    this.time = clone(time);
    this.onTimeChanged_.fire();
  }

}