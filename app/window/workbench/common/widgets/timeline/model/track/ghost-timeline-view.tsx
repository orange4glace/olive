// import { GhostTrackView } from "window/workbench/common/widgets/timeline/model/track/ghost-track-view";
// import { ITimeline } from "internal/timeline/base/timeline";
// import { Disposable, dispose } from "base/common/lifecycle";
// import { ITrack } from "internal/timeline/base/track/track";
// import { TimelineScrollView } from "window/workbench/common/widgets/timeline/model/scroll-view-model";
// import throttle from "orangeutil/throttle";
// import { TreeMap } from "tstl";
// import { GhostTrackItemView } from "window/workbench/common/widgets/timeline/model/track/ghost-track-item-view";

// export class GhostTimelineView extends Disposable {

//   private ghostTrackViews_: GhostTrackView[] = [];
//   public get ghostTrackViews(): ReadonlyArray<GhostTrackView> { return this.ghostTrackViews_; }
//   private ghostTrackViewMap_: Map<ITrack, GhostTrackView> = new Map();

//   private magnetTimes_: TreeMap<number, number> = new TreeMap();

//   private leftExtent_: number;
//   private rightExtent_: number;
//   private translation_: number;

//   constructor(
//     private readonly timeline: ITimeline,
//     private readonly timelineScrollView: TimelineScrollView,
//   ) {
//     super();
//     this._register(timeline.onTrackAdded(e => this.trackDidAddHandler(e.track, e.index)));
//     this._register(timeline.onTrackWillRemove(e => this.trackWillRemoveHandler(e.track, e.index)));
//     this.update = throttle(this.update, 300, { trailing: true });
//   }

//   private trackDidAddHandler(track: ITrack, index: number) {
//     const trackView = new GhostTrackView(this.timeline, track, this.timelineScrollView);
//     this.ghostTrackViewMap_.set(track, trackView);
//     this.ghostTrackViews_.splice(index, 0, trackView);
//   }

//   private trackWillRemoveHandler(track: ITrack, index: number) {
//     const trackView = this.ghostTrackViews_.splice(index, 1)[0];
//     this.ghostTrackViewMap_.delete(track);
//     dispose(trackView);
//   }

//   update() {
//     let magnettedList: {
//       view: GhostTrackItemView,
//       direction: 'START' | 'END'
//     }[] = [];
//     let minMagnetDelta = Infinity;
//     // Calculate magnet time
//     this.ghostTrackViews_.forEach(ghostTrackView => {
//       ghostTrackView.ghostTrackItems.forEach(ghostTrackItem => {
//         ghostTrackItem.setLeftMagnetted(false);
//         ghostTrackItem.setRightMagnetted(false);
//         const visibleStartTime = ghostTrackItem.startTime + this.leftExtent_ + this.translation_;
//         const visibleEndTime = ghostTrackItem.endTime + this.rightExtent_ + this.translation_;
//         const startDelta = this.getClosestDeltaTime(visibleStartTime);
//         const endDelta = this.getClosestDeltaTime(visibleEndTime);
//         const delta = Math.abs(Math.min(Math.abs(startDelta), Math.abs(endDelta)));
//         if (minMagnetDelta > delta) {
//           minMagnetDelta = delta;
//           magnettedList.slice(0);
//         }
//         if (Math.abs(startDelta) == minMagnetDelta) {
//           magnettedList.push({
//             view: ghostTrackItem,
//             direction: 'START'
//           })
//         }
//         if (Math.abs(endDelta) == minMagnetDelta) {
//           magnettedList.push({
//             view: ghostTrackItem,
//             direction: 'END'
//           })
//         }
//       })
//     })
    
//     this.ghostTrackViews_.forEach(ghostTrackView => {
//       ghostTrackView.ghostTrackItems.forEach(ghostTrackItem => {
//         const visibleStartTime = ghostTrackItem.startTime + this.leftExtent_ + this.translation_;
//         const visibleEndTime = ghostTrackItem.endTime + this.rightExtent_ + this.translation_;
//       });
//     })
//   }

//   private getClosestDeltaTime(time: number) {
//     if (this.magnetTimes_.size() == 0) return Infinity;
//     let lb = this.magnetTimes_.lower_bound(time);
//     let leftClosest, rightClosest: number;
//     if (lb.equals(this.magnetTimes_.end())) rightClosest = Infinity;
//     else rightClosest = lb.value.first;
//     if (lb.equals(this.magnetTimes_.begin())) leftClosest = -Infinity;
//     else leftClosest = lb.prev().value.first;
//     if (rightClosest - time < time - leftClosest) return rightClosest - time;
//     return time - leftClosest;
//   }

//   getGhostTrackView(track: ITrack): GhostTrackView {
//     return this.ghostTrackViewMap_.get(track);
//   }

// }