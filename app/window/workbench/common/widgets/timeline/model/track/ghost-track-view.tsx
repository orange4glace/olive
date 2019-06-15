// import { ITimeline } from "internal/timeline/base/timeline";
// import { ITrack } from "internal/timeline/base/track/track";
// import { GhostTrackItemView } from "window/workbench/common/widgets/timeline/model/track/ghost-track-item-view";
// import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
// import { Disposable } from "base/common/lifecycle";
// import { TreeMap } from "tstl";
// import { ITrackItem } from "internal/timeline/base/track-item/track-item";
// import { ConstTrackItemTime } from "internal/timeline/base/track-item/track-item-time";

// export class GhostTrackView extends Disposable {

//   private ghostTrackItems_: Set<GhostTrackItemView> = new Set();
//   public get ghostTrackItems(): ReadonlySet<GhostTrackItemView> { return this.ghostTrackItems_; }

//   // private trackDisposables_: Map<ITrack, IDisposable[]> = new Map();

//   constructor(
//     private readonly timeline: ITimeline,
//     private readonly track: ITrack,
//     private readonly timelineScrollView: TimelineScrollView) {
//     super();

//     this._register(track.onTrackItemAdded(e => this.trackItemDidAddHandler(e.trackItem)));
//     this._register(track.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem)));
//     this._register(track.onTrackItemTimeChanged(e => this.trackItemTimeDidChangeHandler(e.trackItem, e.old)));
//   }

//   // private trackDidAddHandler(track: ITrack) {
//   //   let disposables: IDisposable[] = [];
//   //   disposables.push(track.onTrackItemAdded(e => this.trackItemDidAddHandler(e.trackItem)));
//   //   disposables.push(track.onTrackItemWillRemove(e => this.trackItemWillRemoveHandler(e.trackItem)));
//   //   disposables.push(track.onTrackItemTimeChanged(e => this.trackItemTimeDidChangeHandler(e.trackItem, e.old)));
//   //   this.trackDisposables_.set(track, disposables);
//   // }

//   // private trackWillRemoveHandler(track: ITrack) {
//   //   const disposables = this.trackDisposables_.get(track);
//   //   dispose(disposables);
//   //   this.trackDisposables_.delete(track);
//   // }

//   private trackItemDidAddHandler(trackItem: ITrackItem) {
//     this.addMagnetTime(trackItem.time.start);
//     this.addMagnetTime(trackItem.time.end);
//   }

//   private trackItemWillRemoveHandler(trackItem: ITrackItem) {
//     this.deleteMagnetTime(trackItem.time.start);
//     this.deleteMagnetTime(trackItem.time.end);
//   }

//   private trackItemTimeDidChangeHandler(trackItem: ITrackItem, lastTime: ConstTrackItemTime) {
//     this.deleteMagnetTime(trackItem.time.start);
//     this.deleteMagnetTime(trackItem.time.end);
//     this.addMagnetTime(lastTime.start);
//     this.addMagnetTime(lastTime.end);
//   }

//   addMagnetTime(time: number) {
//     const bef = this.magnetTimes_.get(time);
//     this.magnetTimes_.set(time, bef ? bef + 1 : 1);
//   }

//   deleteMagnetTime(time: number) {
//     const bef = this.magnetTimes_.get(time);
//     if (!bef || bef == 1) return this.magnetTimes_.erase(time);
//     this.magnetTimes_.set(time, bef - 1);
//   }

//   addTrackItemView(startTime: number, endTime: number): GhostTrackItemView {
//     const ghostTrackItem = new GhostTrackItemView(this.timelineScrollView, startTime, endTime);
//     this.ghostTrackItems_.add(ghostTrackItem);
//     this._register(ghostTrackItem.onDidDispose(() => {
//       this.removeGhostTrackItemView(ghostTrackItem);
//     }));
//     return ghostTrackItem;
//   }

//   removeGhostTrackItemView(ghostTrackItemView: GhostTrackItemView) {
//     this.ghostTrackItems_.delete(ghostTrackItemView);
//   }

// }