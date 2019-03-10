import VideoTrackItem from "./timeline/video-track-item";
import { IResource, ITrackItem } from "standard";
import { Resource, ResourceType, VideoResource } from "./resource";

export default class Factory {
  createTrackItem(iresource: IResource): ITrackItem {
    let resource = iresource as Resource;
    switch (resource.type) {
      case ResourceType.VIDEO:
        console.log('new video track item')
        return new VideoTrackItem(resource);
      break;
    }
  }
  createResource(path: string): IResource {
    return new VideoResource(path);
  }
}