import { Resource, ResourceType, VideoResource } from "./resource";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";

export default class Factory {
  // createTrackItem(resource: Resource): TrackItem {
  //   switch (resource.type) {
  //     case ResourceType.VIDEO:
  //       return new VideoTrackItem((resource as VideoResource));
  //     break;
  //   }
  // }
  // createTrackItemTime(start: number, end: number, base: number): TrackItemTime {
  //   return new TrackItemTime(start, end, base);
  // }
}