export default interface IDecoder {
  AddResource(path: string): number;
  Decode(resourceID: number, timecode: number): Promise<any>;
  FreeFrame(frame: any): void;
}

export interface VideoFrameData {
  data: ArrayBuffer;
  ptr: BigInt;
  width: number;
  height: number;
  pts: number;
}