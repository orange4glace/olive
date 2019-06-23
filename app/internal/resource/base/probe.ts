const ffprobe = require('ffprobe');
import { logger } from 'internal/logger';
import { VideoResource } from 'internal/resource/base/video-resource';
import { AudioResource } from 'internal/resource/base/audio-resource';
import { Timebase } from 'internal/timeline/base/timebase';

export interface ProbeResult {
  type: string;
}

export interface VideoProbeResult extends ProbeResult {
  width: number;
  height: number;
  timebase: Timebase;
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
            const timebaseMatch = videoStream.r_frame_rate.match(/^(\d+)\/(\d+)$/);
            if (!timebaseMatch) {
              logger.error('Probe UNKNOWN ERROR with FrameRate not found. path = ', path, 'info = ', info, 'error = ', err);
              return;
            }
            const num = +timebaseMatch[1];
            const den = +timebaseMatch[2];
            const timebase = new Timebase(num, den);
            let result: VideoProbeResult = {
              type: VideoResource.TYPE,
              width: videoStream.width,
              height: videoStream.height,
              timebase: timebase,
              duration: +videoStream.nb_frames
            }
            results.push(result);
          })();
        }
        if (audioStream != null) {
          (() => {
            let result: AudioProbeResult = {
              type: AudioResource.TYPE,
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