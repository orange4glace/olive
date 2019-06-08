// import { action, observable } from "mobx";
// import { IResource } from "internal/resource/resource";
// import { Probe, VideoProbeResult, AudioProbeResult } from "internal/resource/probe";
// import { VideoResource, IVideoResource } from "internal/resource/video-resource";
// import { Emitter, Event } from "base/common/event";
// import { AudioResource, IAudioResource } from "internal/resource/audio-resource";
// import { VideoMediaTrackItemImpl } from "internal/timeline/track-item/video-media-track-item";
// import { TrackItemTime } from "internal/timeline/track-item/track-item-time";
// import { AudioTrackItemImpl } from "internal/timeline/track-item/audio-track-item";
// import { IResourcesService, IResourceEvent } from "internal/resource/resource-service";

// export class ResourceService implements IResourceService {

//   @observable resources: Set<IResource> = new Set();

//   private probe_: Probe;

//   constructor() {
//     this.probe_ = new Probe();
//   }

//   @action
//   async createResource(path: string) {
//     try {
//       let results = await this.probe_.probe(path);

//       let videoResource: IVideoResource = null;
//       let audioResource: IAudioResource = null;

//       results.forEach(result => {
//         console.log(result);
//         switch (result.type) {
//           case ResourceType.VIDEO:
//             const videoResult = result as VideoProbeResult;
//             videoResource = new VideoResource(path, videoResult.width, videoResult.height, videoResult.duration);
//             this.resources.add(videoResource);
//             this.onResourceAdded_.fire({resource: videoResource});
//             break;
//           case ResourceType.AUDIO:
//             const audioResult = result as AudioProbeResult;
//             audioResource = new AudioResource(path, audioResult.duration);
//             this.resources.add(audioResource);
//             this.onResourceAdded_.fire({resource: audioResource});
//             break;
//           default:
//             break;
//         }
//       })
//       return {
//         video: videoResource,
//         audio: audioResource
//       }
//     } catch (e) {
//       return e;
//     }
//   }
  
//   trackItemize(resource: IResource) {
//     let trackItem;
//     if (resource.type == ResourceType.VIDEO) {
//       const videoResource = resource as VideoResource;
//       trackItem = new VideoMediaTrackItemImpl(resource as VideoResource);
//       trackItem.__setTime(new TrackItemTime(0, videoResource.duration, 0));
//     }
//     if (resource.type == ResourceType.AUDIO) {
//       const audioResource = resource as AudioResource;
//       trackItem = new AudioTrackItemImpl(resource as AudioResource);
//       trackItem.__setTime(new TrackItemTime(0, audioResource.duration, 0));
//     }
//     return trackItem;
//   }

//   private onResourceAdded_: Emitter<IResourceEvent> = new Emitter();
//   onResourceAdded: Event<IResourceEvent> = this.onResourceAdded_.event;

// }