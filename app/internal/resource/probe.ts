const ffprobe = require('ffprobe');
import { ResourceType } from '.';
import { logger } from 'internal/logger';
import { FrameRate } from 'internal/project/frame_rate';

export interface ProbeResult {
  type: ResourceType;
}

export interface VideoProbeResult extends ProbeResult {
  width: number;
  height: number;
  frameRate: FrameRate;
  duration: number;
}

export enum ProbeError {
  FILE_FORMAT_MISMATCH,
  MAYBE_FILE_FORMAT_MISMATCH,
  FORMAT_UNSUPPORT,
  UNKNOWN
}

export class Probe {
  
  async probe(path: string): Promise<ProbeResult> {
    return new Promise((resolve, reject) => {
      ffprobe(path, {
        path: './ffprobe-static/win32/x64/ffprobe.exe'
      }, (err: any, info: any) => {
        if (err) {
          logger.error('Probe MAYBE_FILE_FORMAT_MISMATCH. path = ', path, 'error = ', err);
          return reject(ProbeError.MAYBE_FILE_FORMAT_MISMATCH);
        }
        // Find Video stream
        let videoStream: any = null;
        info.streams.forEach((stream: any) => {
          if (stream.codec_type == 'video')
            videoStream = stream;
        })
        if (videoStream == null) // Video stream not found
          return reject(ProbeError.FILE_FORMAT_MISMATCH);

        const frameRate = FrameRate.fromString(videoStream.r_frame_rate);
        // Frame rate not found
        if (!frameRate) {
          logger.error('Probe UNKNOWN ERROR with FrameRate not found. path = ', path, 'info = ', info, 'error = ', err);
          return reject(ProbeError.UNKNOWN);
        }
        let result: VideoProbeResult = {
          type: ResourceType.VIDEO,
          width: videoStream.width,
          height: videoStream.height,
          frameRate: frameRate,
          duration: videoStream.duration
        }
        resolve(result)
      })
    })
  }

}