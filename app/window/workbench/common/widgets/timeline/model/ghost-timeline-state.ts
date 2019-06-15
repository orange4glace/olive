import { Disposable, IDisposable, dispose } from "base/common/lifecycle";
import { Emitter } from "base/common/event";
import { clamp } from "base/common/numbers";
import { ITimeline } from "internal/timeline/base/timeline";
import { ITrack } from "internal/timeline/base/track/track";
import { ITrackItem } from "internal/timeline/base/track-item/track-item";
import { ConstTrackItemTime } from "internal/timeline/base/track-item/track-item-time";
import { DisposableMap, newDisposableMap } from "base/olive/lifecycle";
import { TreeMap } from "tstl";
import { GhostTrackItemView } from "window/workbench/common/widgets/timeline/model/track/ghost-track-item-view";
import { TimelineWidgetTimelineView } from "window/workbench/common/widgets/timeline/model/timeline-view-model-impl";
import throttle from "orangeutil/throttle";

export class GhostTimelineState extends Disposable {

  private readonly onDidChangeState_: Emitter<void> = new Emitter();
  public get onDidChangeState() { return this.onDidChangeState_.event; }

  private ghostTrackItemViews_: Set<GhostTrackItemView> = new Set();

  private magnetLeft_: boolean;
  public set magnetLeft(val: boolean) {
    this.magnetLeft_ = val;
    this.onDidChangeState_.fire();
  }
  public get magnetLeft() { return this.magnetLeft_; }

  private magnetRight_: boolean;
  public set magnetRight(val: boolean) {
    this.magnetRight_ = val;
    this.onDidChangeState_.fire();
  }
  public get magnetRight() { return this.magnetRight_; }

  private maxLeftExtent_: number;
  public set maxLeftExtent(val: number) {
    this.maxLeftExtent_ = val;
    this.leftExtent_ = Math.min(this.leftExtent, val);
    this.onDidChangeState_.fire();
  }
  public get maxLeftExtent() { return this.maxLeftExtent_; }

  private minLeftExtent_: number;
  public set minLeftExtent(val: number) {
    this.minLeftExtent_ = val;
    this.leftExtent_ = Math.max(this.leftExtent, val);
    this.onDidChangeState_.fire();
  }
  public get minLeftExtent() { return this.minLeftExtent_; }

  private maxRightExtent_: number;
  public set maxRightExtent(val: number) {
    this.maxRightExtent_ = val;
    this.rightExtent_ = Math.min(this.rightExtent, val);
    this.onDidChangeState_.fire();
  }
  public get maxRightExtent() { return this.maxRightExtent_; }

  private minRightExtent_: number;
  public set minRightExtent(val: number) {
    this.minRightExtent_ = val;
    this.rightExtent_ = Math.max(this.rightExtent, val);
    this.onDidChangeState_.fire();
  }
  public get minRightExtent() { return this.minRightExtent_; }

  private maxTranslation_: number;
  public set maxTranslation(val: number) {
    this.maxTranslation_ = val;
    this.translation_ = Math.min(this.translation, val);
    this.onDidChangeState_.fire();
  }
  public get maxTranslation() { return this.maxTranslation_; }

  private minTranslation_: number;
  public set minTranslation(val: number) {
    this.minTranslation_ = val;
    this.translation_ = Math.max(this.translation, val);
    this.onDidChangeState_.fire();
  }
  public get minTranslation() { return this.minTranslation_; }

  private leftExtent_: number;
  public set leftExtent(val: number) {
    this.leftExtent_ = clamp(val, this.minLeftExtent, this.maxLeftExtent);
    this.onDidChangeState_.fire();
  }
  public get leftExtent() { return this.leftExtent_; }

  private rightExtent_: number;
  public set rightExtent(val: number) {
    this.rightExtent_ = clamp(val, this.minRightExtent, this.maxRightExtent);
    this.onDidChangeState_.fire();
  }
  public get rightExtent() { return this.rightExtent_; }

  private translation_: number;
  public set translation(val: number) {
    this.translation_ = clamp(val, this.minTranslation, this.maxTranslation);
    this.onDidChangeState_.fire();
  }
  public get translation() { return this.translation_; }

  private magnetThreshold_: number;
  public set magnetThreshold(val: number) {
    this.magnetThreshold_ = val;
    this.onDidChangeState_.fire();
  }
  public get magnetThreshold() { return this.magnetThreshold_; }

  private currentMagnettedTime_: number;
  public get currentMagnettedTime() { return this.currentMagnettedTime_; }

  private magnetTimes_: TreeMap<number, number> = new TreeMap();

  private trackDisposables_: DisposableMap<ITrack, IDisposable[]>;

  constructor(readonly timelineView: TimelineWidgetTimelineView) {
    super();

    this.updateGhostTrackItemSnaps = throttle(this.updateGhostTrackItemSnaps.bind(this), 33, {
      trailing: true
    });
    this.reset();

    this.trackDisposables_ = this._register(newDisposableMap<ITrack, any>());

    timelineView.timeline.tracks.forEach(t => this.didAddTrackHandler(t));
    this._register(timelineView.timeline.onTrackAdded(e => this.didAddTrackHandler(e.track)));
    this._register(timelineView.timeline.onTrackWillRemove(e => this.willRemoveTrackHandler(e.track)));

    this._register(this.onDidChangeState(() => this.updateGhostTrackItemSnaps()));
  }

  getClosestDeltaTime(time: number) {
    if (this.magnetTimes_.size() == 0) return Infinity;
    let lb = this.magnetTimes_.lower_bound(time);
    let leftClosest, rightClosest: number;
    if (lb.equals(this.magnetTimes_.end())) rightClosest = Infinity;
    else rightClosest = lb.value.first;
    if (lb.equals(this.magnetTimes_.begin())) leftClosest = -Infinity;
    else leftClosest = lb.prev().value.first;
    if (rightClosest - time < time - leftClosest) return rightClosest - time;
    return leftClosest - time;
  }

  addMagnetTime(time: number) {
    const bef = this.magnetTimes_.has(time) && this.magnetTimes_.get(time);
    this.magnetTimes_.set(time, bef ? bef + 1 : 1);
  }

  deleteMagnetTime(time: number) {
    const bef = this.magnetTimes_.has(time) && this.magnetTimes_.get(time);
    if (!bef || bef == 1) return this.magnetTimes_.erase(time);
    this.magnetTimes_.set(time, bef - 1);
  }

  addGhostTrackItemView(view: GhostTrackItemView) {
    this.ghostTrackItemViews_.add(view);
    let dis = view.onDidDispose(() => {
      this.removeGhostTrackItemView(view);
      dispose(dis);
    })
  }

  removeGhostTrackItemView(view: GhostTrackItemView) {
    this.ghostTrackItemViews_.delete(view);
  }

  updateGhostTrackItemSnaps() {
    const {
      leftExtent,
      rightExtent,
      translation,
      magnetThreshold
    } = this;
    let magnettedList: {
      view: GhostTrackItemView,
      direction: 'START' | 'END'
    }[] = [];
    let minMagnetDelta = Infinity;
    let absMinMagnetDelta = Infinity;
    
    // Calculate magnet time
    this.ghostTrackItemViews_.forEach(ghostTrackItemView => {
      ghostTrackItemView.setLeftMagnetted(false);
      ghostTrackItemView.setRightMagnetted(false);
      const visibleStartTime = ghostTrackItemView.startTime + leftExtent + translation;
      const visibleEndTime = ghostTrackItemView.endTime + rightExtent + translation;
      const startDelta = this.magnetLeft ? this.getClosestDeltaTime(visibleStartTime) : -Infinity;
      const endDelta = this.magnetRight ? this.getClosestDeltaTime(visibleEndTime) : Infinity;
      let delta: number;
      if (Math.abs(startDelta) > Math.abs(endDelta)) delta = endDelta;
      else delta = startDelta;
      if (absMinMagnetDelta > delta) {
        minMagnetDelta = delta;
        absMinMagnetDelta = Math.abs(delta);
        magnettedList.slice(0);
      }
      if (Math.abs(startDelta) == absMinMagnetDelta) {
        magnettedList.push({
          view: ghostTrackItemView,
          direction: 'START'
        })
      }
      if (Math.abs(endDelta) == absMinMagnetDelta) {
        magnettedList.push({
          view: ghostTrackItemView,
          direction: 'END'
        })
      }
    })
    
    let magnetTime = 0;
    const magnetThresholdInTime = this.timelineView.scrollViewModel.getTimeAmountRelativeToTimeline(magnetThreshold);
    if (absMinMagnetDelta > magnetThresholdInTime) magnettedList.slice(0);
    else magnetTime = minMagnetDelta;
    this.currentMagnettedTime_ = magnetTime;

    this.timelineView.trackViews.forEach(trackView => {
      trackView.trackTimelineView.ghostTrackItemViews.forEach(ghostTrackItemView => {
        const visibleStartTime = ghostTrackItemView.startTime + leftExtent + translation + (this.magnetLeft ? magnetTime : 0);
        const visibleEndTime = ghostTrackItemView.endTime + rightExtent + translation + (this.magnetRight ? magnetTime : 0);
        ghostTrackItemView.setVisibleTime(visibleStartTime, visibleEndTime);
      })
    });
  }

  reset() {
    this.minLeftExtent =
    this.minRightExtent = 
    this.minTranslation = -Infinity;

    this.maxLeftExtent =
    this.maxRightExtent = 
    this.maxTranslation = Infinity;

    this.leftExtent = 
    this.rightExtent =
    this.translation = 0;

    this.magnetLeft =
    this.magnetRight = true;

    this.magnetThreshold = 10;
  }

  private didAddTrackHandler(track: ITrack) {
    const disposables: IDisposable[] = [];
    track.trackItems.forEach((_, ti) => this.didAddTrackItemHandler(ti));
    disposables.push(track.onTrackItemAdded(e => this.didAddTrackItemHandler(e.trackItem)));
    disposables.push(track.onTrackItemWillRemove(e => this.willRemoveTrackItemHandler(e.trackItem)));
    disposables.push(track.onTrackItemTimeChanged(e => this.didChangeTrackItemTime(e.trackItem, e.old)));
    this.trackDisposables_.set(track, disposables);
  }

  private willRemoveTrackHandler(track: ITrack) {
    const disposables = this.trackDisposables_.get(track);
    dispose(disposables);
    this.trackDisposables_.delete(track);
  }

  private didAddTrackItemHandler(trackItem: ITrackItem) {
    this.addMagnetTime(trackItem.time.start);
    this.addMagnetTime(trackItem.time.end);
  }

  private willRemoveTrackItemHandler(trackItem: ITrackItem) {
    this.deleteMagnetTime(trackItem.time.start);
    this.deleteMagnetTime(trackItem.time.end);
  }

  private didChangeTrackItemTime(trackItem: ITrackItem, time: ConstTrackItemTime) {
    this.addMagnetTime(trackItem.time.start);
    this.addMagnetTime(trackItem.time.end);
    this.deleteMagnetTime(time.start);
    this.deleteMagnetTime(time.end);
  }

}