import ResourceType from "./type_t";
import { Resource, ResourceBase } from "./resource";
import { Postable } from "worker-postable";
import ffmpeg from "ffmpeg-static";
import { exec } from "child_process";
import { logger } from "internal/logger";

export interface AudioResourceBase extends ResourceBase {
}

@Postable
export class AudioResource extends Resource {

  duration: number;

  constructor(path: string, duration: number) {
    super(ResourceType.AUDIO, path);
    this.duration = duration;

    exec(`.${(ffmpeg as any).path} -i "${this.path}" -f f32le -ac 1 -ar 48000 -acodec pcm_f32le "${this.path}.raw"`,
      (error, stdout, stderr) => {
        if (error) {
          logger.error(error.message);
          console.error(error);
          return;
        }
        console.log(stdout);
        console.log(stderr);
    });
  }

}