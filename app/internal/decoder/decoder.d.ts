import { CResource } from "internal/native";

type resource_id_t = number;
type decoder_id_t = number;
type timecode_t = number;

export interface DecoderResource {
  id: number;
  duration: number;
}

export interface DecodeResult {
  native: any;
  data: BigInt;
  size: number;
}

export default interface IDecoder {
  AddResource(path: string): DecoderResource;
  Decode(resourceID: resource_id_t, timecode: timecode_t, decoderID: decoder_id_t): Promise<DecodeResult>;
  Acquire(resourceID: resource_id_t, timecode: timecode_t): timecode_t;
  Release(resourceID: resource_id_t, decoderID: decoder_id_t): void;
  FreeFrame(frame: any): void;
}

export interface VideoFrameData {
  data: ArrayBuffer;
  ptr: BigInt;
  width: number;
  height: number;
  pts: number;
}