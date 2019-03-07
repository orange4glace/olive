import { IResource } from './resource'

export default interface ITrackItem {
  
  readonly id: number;
  startTime: number;
  endTime: number;

  clone(): ITrackItem;
  setTime(startTime: number, endTime: number): void;

}