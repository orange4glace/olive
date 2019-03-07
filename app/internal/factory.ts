import VideoTrackItem from "./timeline/video-track-item";
import { IResource } from "standard";

export default class Factory {
    createVideoTrackItem(resource: IResource) {
        return new VideoTrackItem(resource);
    }
}