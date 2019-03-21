import { Poster, PosterResponse } from 'poster'
import { DecodeRequest, FreeRequest, DecodeResponse } from './server';

export default class DecoderClient {

  private poster: Poster;

  constructor(poster: Poster) {
    this.poster = poster;
  }

  AddResource(path: string) {
    
  }

  async Decode(req: DecodeRequest): Promise<DecodeResponse> {
    let promise = new Promise<DecodeResponse>(async (resolve, reject) => {
      let res: DecodeResponse = await this.poster.request('decode', req);
      resolve(res);
    });
    return promise;
  }

  Free(req: FreeRequest): void {
    this.poster.send('free', req);
  }


}