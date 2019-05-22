import { IHistoryCommand } from "internal/history/command";
import { Timeline } from "internal/timeline/timeline";
import { TrackItem } from "internal/timeline/track-item/track-item";
import { Track } from "internal/timeline/track/track";
import { TrackItemTime } from "internal/timeline/track-item/track-item-time";

export class AddTrackItemCommand implements IHistoryCommand {

  constructor(
    private readonly track: Track,
    private readonly trackItem: TrackItem,
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
    private readonly track: Track,
    private readonly trackItem: TrackItem,
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
    private readonly track: Track,
    private readonly trackItem: TrackItem) {

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