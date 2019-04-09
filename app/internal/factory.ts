import VideoTrackItem from "./timeline/video-track-item";
import { Resource, ResourceType, VideoResource } from "./resource";
import TrackItem from "./timeline/track-item";
import { TimePair } from "./timeline/time-pair";

export default class Factory {
  createTrackItem(resource: Resource): TrackItem {
    switch (resource.type) {
      case ResourceType.VIDEO:
        return new VideoTrackItem((resource as VideoResource));
      break;
    }
  }
  createTimePair(start: number, end: number): TimePair {
    return new TimePair(start, end);
  }
}