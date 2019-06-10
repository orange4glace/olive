import { VideoDrawing, SerializedVideoDrawing } from "./video-drawing";
import { Postable } from "worker-postable";
import { VideoResource } from "internal/resource/base/video-resource";
import { Registry } from "platform/registry/common/platform";
import { Effect } from "internal/rendering/effect/base/effect";
import { TransformEffect } from "internal/rendering/effect/base/video-effect/transform-effect";
import { IInstantiationService } from "platform/instantiation/common/instantiation";
import { IResourcesService } from "internal/resource/base/resource-service";
import { WithVideoMediaDrawingBase } from "internal/rendering/drawing/common/video-media-drawing";
import { DrawingFactoryRegistry, DrawingFactory } from "internal/rendering/drawing/base/drawing";
import { ResourceIdentifier } from "internal/resource/common/resouce";

export interface SerializedVideoMediaDrawing extends SerializedVideoDrawing {
  resourceID: ResourceIdentifier;
}

@Postable
export class VideoMediaDrawing extends WithVideoMediaDrawingBase(VideoDrawing) {

  protected resource_: VideoResource;
  public get resource() { return this.resource_; }

  constructor(resource: VideoResource, transformEffect?: TransformEffect) {
    super(VideoMediaDrawing.TYPE, transformEffect);
    this.resource_ = resource;
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
      const transformEffect = Effect.deserialize(instantiationService, obj.transformEffect) as TransformEffect;
      if (!transformEffect) {
        console.warn('Transform Effect deserialization failed. ' + JSON.stringify(obj));
        return null;
      }
      const drawing = new VideoMediaDrawing(resource as VideoResource, transformEffect);
      return drawing;
    })
  }
}

Registry.as<DrawingFactoryRegistry>(DrawingFactoryRegistry.ID).registerFactory(VideoMediaDrawing.TYPE, VideoMediaDrawingFactory);