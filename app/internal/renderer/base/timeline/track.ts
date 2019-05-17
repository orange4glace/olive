import { TrackBase } from "internal/timeline/track";
import { TrackItemRenderer } from "internal/renderer/base/timeline/track-item";
import { TrackItemTimeRenderer } from "internal/renderer/base/timeline/track-item-time";
import { TreeMap, make_pair } from "tstl";
import { listenable, listen, Posted } from "worker-postable";
import { ObservableSet } from "mobx";

let __next_track_id = 0;

@Posted('TrackImpl')
export class TrackRenderer<TrackItemRendererT extends TrackItemRenderer = TrackItemRenderer> implements TrackBase {

  readonly id: number = __next_track_id++;
  @listenable trackItems: Map<TrackItemRendererT, TrackItemTimeRenderer>;
  trackItemTreeMap: TreeMap<TrackItemTimeRenderer, TrackItemRendererT>;
  trackItemEndTimeTreeMap: TreeMap<number, TrackItemRendererT>;

  constructor() {
    this.trackItemTreeMap = new TreeMap();
    this.trackItemEndTimeTreeMap = new TreeMap();

    this.observeTrackItems = this.observeTrackItems.bind(this);
    listen(this, (change: any) => {
      if ((change.type== 'add' || change.type == 'update') && change.name == 'trackItems')
        this.observeTrackItems(change.newValue);
    })
  }

  private observeTrackItems(keyframes: ObservableSet<TrackItemRendererT>) {
    listen(keyframes, (change: any) => {
      if (change.type == 'add') {
        let trackItem = change.name as TrackItemRendererT;
        let timePair = change.newValue as TrackItemTimeRenderer;
        console.log(trackItem, timePair);
        this.trackItemTreeMap.insert(make_pair(timePair, trackItem));
        this.trackItemEndTimeTreeMap.insert(make_pair(timePair.end, trackItem));
      }
      else if (change.type == 'update') {
        let trackItem = change.name as TrackItemRendererT;
        let oldv = change.oldValue as TrackItemTimeRenderer;
        let newv = change.newValue as TrackItemTimeRenderer;
        this.trackItemTreeMap.erase(oldv);
        this.trackItemTreeMap.insert(make_pair(newv, trackItem));
        this.trackItemEndTimeTreeMap.erase(oldv.end);
        this.trackItemEndTimeTreeMap.insert(make_pair(newv.end, trackItem));
      }
      else if (change.type == 'delete') {
        let trackItem = change.name as TrackItemRendererT;
        let oldv = change.oldValue as TrackItemTimeRenderer;
        this.trackItemTreeMap.erase(oldv);
        this.trackItemEndTimeTreeMap.erase(oldv.end);
      }
    });
  }

  getTrackItemAt(time: number): TrackItemRendererT {
    let q = new TrackItemTimeRenderer();
    q.start = q.end = time;
    let it = this.trackItemTreeMap.lower_bound(q);
    if (it.equals(this.trackItemTreeMap.end()) || time < it.value.first.start)
      if (it.equals(this.trackItemTreeMap.begin())) return null;
      else it = it.prev();
    if (time < it.value.first.end) return it.value.second;
    return null;
  }

  getTrackItemBetween(startTime: number, endTime: number): TrackItemRendererT[] {
    const ret: TrackItemRendererT[] = [];
    let it = this.trackItemEndTimeTreeMap.upper_bound(startTime);
    while (!it.equals(this.trackItemEndTimeTreeMap.end())) {
      const cur = it.value;
      if (cur.second.time.start >= endTime) break;
      ret.push(cur.second);
      it = it.next();
    }
    return ret;
  }
}