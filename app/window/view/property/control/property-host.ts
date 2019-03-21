import { Property, Keyframe } from "internal/drawing";
import { KeyframeHost } from "./keyframe-host";
import { invariant } from "util/debuging";

export class PropertyHost {

  property: Property<any>
  keyframeHosts: Set<KeyframeHost>;

  constructor(property: Property<any>) {
    this.property = property;
    this.keyframeHosts = new Set();
  }

  addKeyframeHost(keyframeHost: KeyframeHost) {
    this.keyframeHosts.add(keyframeHost);
  }

  removeKeyframeHost(keyframeHost: KeyframeHost) {
    this.keyframeHosts.has(keyframeHost);
    console.assert(keyframeHost, '[PropertyView] no such keyframe host', keyframeHost);
    this.keyframeHosts.delete(keyframeHost);
  }

}