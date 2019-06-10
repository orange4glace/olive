import { ResourceBase } from "internal/resource/common/resouce";
import { Posted } from "worker-postable";
import { AudioResourceBase } from "internal/resource/common/audio-resource";
import { VideoResourceBase } from "internal/resource/common/video-resource";

Posted(ResourceBase);
Posted(AudioResourceBase);
Posted(VideoResourceBase);