import { IHistoryCommand } from "internal/history/command";
import { ITrack } from "internal/timeline/base/track/track";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";

export class AddTrackItemCommand implements IHistoryCommand {

  constructor(
    private readonly track: ITrack,
    private readonly trackItem: ITrackItem,
    private readonly startTime: number,
    private readonly endTime: number,
    private readonly baseTime: number) {

  }

  execute() {
    this.track.addTrackItem(this.trackItem, this.startTime, this.endTime, this.baseTime);
  }

  undo() {
    this.track.removeTrackItem(this.trackItem);
  }

  redo() {
    this.execute();
  }

}

export class ChangeTrackItemTimeCommand implements IHistoryCommand {

  private lastStartTime: number;
  private lastEndTime: number;
  private lastBaseTime: number;

  constructor(
    private readonly track: ITrack,
    private readonly trackItem: ITrackItem,
    private readonly startTime: number,
    private readonly endTime: number,
    private readonly baseTime: number) {
    this.lastStartTime = this.trackItem.time.start;
    this.lastEndTime = this.trackItem.time.end;
    this.lastBaseTime = this.trackItem.time.base;
  }

  execute() {
    this.track.setTrackItemTime(this.trackItem, this.startTime, this.endTime, this.baseTime);
  }

  undo() {
    this.track.setTrackItemTime(this.trackItem, this.lastStartTime, this.lastEndTime, this.lastBaseTime);
  }

  redo() {
    this.execute();
  }

}

export class RemoveTrackItemCommand implements IHistoryCommand {

  constructor(
    private readonly track: ITrack,
    private readonly trackItem: ITrackItem) {

  }

  execute() {
    this.track.removeTrackItem(this.trackItem);
  }

  undo() {
    const time = this.trackItem.time;
    this.track.addTrackItem(this.trackItem, time.start, time.end, time.base);
  }

  redo() {
    this.execute();
  }

}