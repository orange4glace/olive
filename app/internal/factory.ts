import VideoTrackItem from "./timeline/video-track-item";
import { Resource, ResourceType, VideoResource } from "./resource";
import TrackItem from "./timeline/track-item";

export default class Factory {
  createTrackItem(iresource: Resource): TrackItem {
    let resource = iresource as Resource;
    switch (resource.type) {
      case ResourceType.VIDEO:
        return new VideoTrackItem(resource);
      break;
    }
  }
  createResource(path: string): Resource {
    return new VideoResource(path);
  }
}