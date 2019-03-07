import { Poster } from 'poster'

import IDecoder from './decoder'

export default class DecoderServer {

  private decoder: IDecoder;
  private clients: Poster[];
  private clientHandlers: Map<Poster, any> = new Map();

  constructor(decoder: IDecoder) {
    this.decoder = decoder;
  }

  attachClient(client: Poster) {
    const decodeHandler = this.decodeHandler.bind(this, client);
    this.clientHandlers.set(client, decodeHandler);
    client.on('decode', decodeHandler);
  }
  
  detachClient(client: Poster) {

  }

  decodeHandler(client: Poster, data: any) {
    this.decoder.Decode(data.resourceID, data.timecode).then((result: any) => {
      client.emit('decoded', result);
    })
  }

}