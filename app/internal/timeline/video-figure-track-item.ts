import { VideoTrackItemImpl, VideoTrackItemBase, VideoTrackItem } from "internal/timeline/video-track-item";
import { Postable } from "worker-postable";
import { TrackItemType } from "internal/timeline/track-item-type";

export interface VideoFigureTrackItemBase extends VideoTrackItemBase {

}

export interface VideoFigureTrackItem extends VideoTrackItem {

}

@Postable
export class VideoFigureTrackItemImpl extends VideoTrackItemImpl implements VideoFigureTrackItemBase {

  constructor() {
    super(TrackItemType.VIDEO_FIGURE);
  }

}