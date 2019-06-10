import { Posted } from "worker-postable";
import { EffectBase } from "internal/rendering/effect/common/effect";
import { VideoEffectBase } from "internal/rendering/effect/common/video-effect/video-effect";
import { TransformEffectBase } from "internal/rendering/effect/common/video-effect/trasnform-effect";
import { RectangleEffectBase } from "internal/rendering/effect/common/video-effect/rectangle-effect";

Posted(EffectBase);
Posted(VideoEffectBase);
Posted(TransformEffectBase);
Posted(RectangleEffectBase);