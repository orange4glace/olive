import { Posted } from "worker-postable";
import { DrawingBase } from "internal/rendering/drawing/common/drawing";
import { VideoDrawingBase } from "internal/rendering/drawing/common/video-drawing";
import { VideoMediaDrawingBase } from "internal/rendering/drawing/common/video-media-drawing";
import { RectanlgeDrawingBase } from "internal/rendering/drawing/common/rectangle-drawing";

Posted(DrawingBase);
Posted(VideoDrawingBase);
Posted(VideoMediaDrawingBase);
Posted(RectanlgeDrawingBase);