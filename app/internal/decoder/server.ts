import { Poster, ReceivedRequest } from 'poster'

import IDecoder from './decoder'

export interface DecodeRequest {
  resourceID: number;
  timecode: number;
}

export interface FreeRequest {
  id: number;
}

export interface DecodeResponse {
  id: number;
  ptr: BigInt;
}

export default class DecoderServer {

  private __next_frame_id = 0;

  private poster: Poster;
  private decoder: IDecoder;

  private frames: Map<number, any> = new Map();

  constructor(poster: Poster, decoder: IDecoder) {
    this.poster = poster;
    this.decoder = decoder;
    
    this.decodeHandler = this.decodeHandler.bind(this);
    this.freeHandler = this.freeHandler.bind(this);

    this.poster.addRequestListener('decode', this.decodeHandler);
    this.poster.addRequestListener('free', this.freeHandler);
  }

  decodeHandler(req: ReceivedRequest<DecodeRequest>) {
    const data = req.data;
    this.decoder.Decode(data.resourceID, data.timecode).then((result: any) => {
      let res: DecodeResponse = {
        id: this.__next_frame_id++,
        ptr: result.data
      }
      this.frames.set(res.id, result);
      req.respond(res);
    })
  }

  freeHandler(req: ReceivedRequest<FreeRequest>) {
    this.decoder.FreeFrame(this.frames.get(req.data.id).native);
  }

}