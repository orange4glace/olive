import { TrackBase, TrackItemBase, TrackItemType } from "internal/timeline";
import { TrackItemRenderer } from "./track-item";
import { Posted, listen, listenable } from "worker-postable";
import NVG from "../../../../nanovg-webgl";
import { ObservableSet, IMapDidChange } from "mobx";
import { TimePairRenderer } from "./time-pair";
import { TreeMap, make_pair } from "tstl";
import { VideoTrackItemRenderer } from "./video-track-item";

let __next_track_id = 0;

@Posted('Track')
export class TrackRenderer implements TrackBase {

  readonly id: number = __next_track_id++;
  @listenable trackItems: Map<TrackItemRenderer, TimePairRenderer>;
  trackItemTreeMap: TreeMap<TimePairRenderer, TrackItemRenderer>;

  private lastAccessedTrackItem: TrackItemRenderer = null;

  constructor() {
    this.trackItemTreeMap = new TreeMap();

    this.observeTrackItems = this.observeTrackItems.bind(this);
    listen(this, (change: any) => {
      if ((change.type== 'add' || change.type == 'update') && change.name == 'trackItems')
        this.observeTrackItems(change.newValue);
    })
  }

  private observeTrackItems(keyframes: ObservableSet<TrackItemRenderer>) {
    listen(keyframes, (change: any) => {
      if (change.type == 'add') {
        let trackItem = change.name as TrackItemRenderer;
        let timePair = change.newValue as TimePairRenderer;
        this.trackItemTreeMap.insert(make_pair(timePair, trackItem));
      }
      else if (change.type == 'update') {
        let trackItem = change.name as TrackItemRenderer;
        let oldv = change.oldValue as TimePairRenderer;
        let newv = change.newValue as TimePairRenderer;
        this.trackItemTreeMap.erase(oldv);
        this.trackItemTreeMap.insert(make_pair(newv, trackItem));
      }
      else if (change.type == 'delete') {
        let trackItem = change.name as TrackItemRenderer;
        let oldv = change.oldValue as TimePairRenderer;
        this.trackItemTreeMap.erase(oldv);
      }
    });
  }

  getTrackItemAt(time: number): TrackItemRenderer {
    let q = new TimePairRenderer();
    q.start = time;
    q.end = time;
    let it = this.trackItemTreeMap.lower_bound(q);
    let test = null;
    if (it.equals(this.trackItemTreeMap.end())) {
      if (this.trackItemTreeMap.size() == 0) return null;
      test = this.trackItemTreeMap.rbegin().value;
    }
    else test = it.value;
    if (test.first.start <= time && time < test.first.end) return test.second;
    return null;
  }

  private accessAfter(query: number): TrackItemRenderer {
    return null;
  }

  async draw(nvg: NVG, timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    await trackItem.draw(nvg, timecode - trackItem.time.start + trackItem.baseTime);
  }

  async afterDraw(nvg: NVG, timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    await trackItem.afterDraw(nvg, timecode - trackItem.time.start + trackItem.baseTime);
  }

  decode(timecode: number) {
    let trackItem = this.getTrackItemAt(timecode);
    if (trackItem == null) return;
    if (trackItem.type == TrackItemType.VIDEO) {
      let videoTrackItem = trackItem as VideoTrackItemRenderer;
      console.log(videoTrackItem)
      videoTrackItem.decode(timecode - videoTrackItem.time.start + videoTrackItem.baseTime);
    }
  }
}