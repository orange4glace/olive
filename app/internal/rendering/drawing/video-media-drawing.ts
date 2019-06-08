import { VideoDrawing, VideoDrawingBase, SerializedVideoDrawing } from "./video-drawing";
import { Postable, postable } from "worker-postable";
import { VideoResourceBase, IVideoResource, VideoResource } from "internal/resource/video-resource";
import { DrawingFactoryRegistry, DrawingFactory } from "internal/rendering/drawing/drawing";
import { Registry } from "platform/registry/common/platform";
import { Effect } from "internal/rendering/effect/effect";
import { RectangleEffect } from "internal/rendering/effect/video-effect/rectangle-effect";
import { TransformEffect } from "internal/rendering/effect/video-effect/transform-effect";
import { ResourceIdentifier } from "internal/resource/resource";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IResourcesService } from "internal/resource/resource-service";

export interface SerializedVideoMediaDrawing extends SerializedVideoDrawing {
  resourceID: ResourceIdentifier;
}

export interface VideoMediaDrawingBase extends VideoDrawingBase {

  resource: VideoResourceBase;

}

@Postable
export class VideoMediaDrawing extends VideoDrawing {

  static readonly TYPE = 'olive.drawing.VideoMedia'

  @postable resource: IVideoResource;

  constructor(resource: IVideoResource) {
    super(VideoMediaDrawing.TYPE);
    this.resource = resource;
  }

  serialize(): SerializedVideoMediaDrawing {
    return {
      ...super.serilaize(),
      resourceID: this.resource.id
    }
  }

}

class VideoMediaDrawingFactory implements DrawingFactory {
  serialize(obj: VideoMediaDrawing): SerializedVideoMediaDrawing {
    return obj.serialize();
  }
  deserialize(instantiationService: IInstantiationService, obj: SerializedVideoMediaDrawing): VideoMediaDrawing | null {
    return instantiationService.invokeFunction<VideoMediaDrawing | null>(accessor => {
      if (obj.type !== VideoMediaDrawing.TYPE) {
        console.warn('VideoMediaDrawing Serial type not match. ' + JSON.stringify(obj));
        return null;
      }
      const resource = accessor.get(IResourcesService).getResource(obj.resourceID);
      if (!resource) {
        console.warn('Resouce not found. ' + obj);
        return null;
      }
      if (resource.type !== VideoResource.TYPE) {
        console.warn('Resouce is not VideoResource. ' + JSON.stringify(obj));
        return null;
      }
      const drawing = new VideoMediaDrawing(resource as VideoResource);
      const transformEffect = Effect.deserialize(instantiationService, obj.transformEffect) as TransformEffect;
      if (!transformEffect) {
        console.warn('Transform Effect deserialization failed. ' + JSON.stringify(obj));
        return null;
      }
      drawing.transformEffect = transformEffect;
      return drawing;
    })
  }
}

Registry.as<DrawingFactoryRegistry>(DrawingFactoryRegistry.ID).registerFactory(VideoMediaDrawing.TYPE, VideoMediaDrawingFactory);