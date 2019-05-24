const ffprobe = require('ffprobe');
import { logger } from 'internal/logger';
import { FrameRate } from 'internal/timeline/frame_rate';
import { ResourceType } from 'internal/resource/type_t';

export interface ProbeResult {
  type: ResourceType;
}

export interface VideoProbeResult extends ProbeResult {
  width: number;
  height: number;
  frameRate: FrameRate;
  duration: number;
}

export interface AudioProbeResult extends ProbeResult {
  duration: number;
}

export enum ProbeError {
  FILE_FORMAT_MISMATCH,
  MAYBE_FILE_FORMAT_MISMATCH,
  FORMAT_UNSUPPORT,
  UNKNOWN
}

export class Probe {
  
  async probe(path: string): Promise<ProbeResult[]> {
    return new Promise((resolve, reject) => {
      ffprobe(path, {
        path: './ffprobe-static/win32/x64/ffprobe.exe'
      }, (err: any, info: any) => {
        if (err) {
          logger.error('Probe MAYBE_FILE_FORMAT_MISMATCH. path = ', path, 'error = ', err);
          return reject(ProbeError.MAYBE_FILE_FORMAT_MISMATCH);
        }
        let results: ProbeResult[] = [];
        // Find Video stream
        let videoStream: any = null;
        let audioStream: any = null;
        info.streams.forEach((stream: any) => {
          if (stream.codec_type == 'video')
            videoStream = stream;
          if (stream.codec_type == 'audio')
            audioStream = stream;
        })
        if (videoStream != null) {
          (() => {
            const frameRate = FrameRate.fromString(videoStream.r_frame_rate);
            // Frame rate not found
            if (!frameRate) {
              logger.error('Probe UNKNOWN ERROR with FrameRate not found. path = ', path, 'info = ', info, 'error = ', err);
              return;
            }
            let result: VideoProbeResult = {
              type: ResourceType.VIDEO,
              width: videoStream.width,
              height: videoStream.height,
              frameRate: frameRate,
              duration: +videoStream.duration
            }
            results.push(result);
          })();
        }
        if (audioStream != null) {
          (() => {
            let result: AudioProbeResult = {
              type: ResourceType.AUDIO,
              duration: +audioStream.duration
            }
            results.push(result);
          })()
        }
        resolve(results);
      })
    })
  }

}