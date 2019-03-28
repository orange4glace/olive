import { Property, Keyframe, PropertyEvent } from "internal/drawing";
import { KeyframeHost } from "./keyframe-host";
import { invariant } from "util/debuging";

export class PropertyHost {

  property: Property<any>
  keyframeHosts: Map<Keyframe<any>, KeyframeHost>;

  constructor(property: Property<any>) {
    this.property = property;
    this.keyframeHosts = new Map();

    this.addKeyframeHost = this.addKeyframeHost.bind(this);
    this.removeKeyframeHost = this.removeKeyframeHost.bind(this);
    this.getKeyframeHost = this.getKeyframeHost.bind(this);

    this.property.keyframes.forEach(this.addKeyframeHost);
    this.property.addEventListener(PropertyEvent.KEYFRAME_ADDED, this.addKeyframeHost);
    this.property.addEventListener(PropertyEvent.KEYFRAME_REMOVED, this.removeKeyframeHost);
  }

  destructor() {
    this.property.removeEventListener(PropertyEvent.KEYFRAME_ADDED, this.addKeyframeHost);
    this.property.removeEventListener(PropertyEvent.KEYFRAME_REMOVED, this.removeKeyframeHost);
  }

  private addKeyframeHost(keyframe: Keyframe<any>) {
    const keyframeHost = new KeyframeHost(keyframe);
    this.keyframeHosts.set(keyframe, keyframeHost);
  }

  private removeKeyframeHost(keyframe: Keyframe<any>) {
    console.assert(this.keyframeHosts.has(keyframe), '[PropertyView] no such keyframe host', keyframe);
    this.keyframeHosts.delete(keyframe);
  }

  getKeyframeHost(keyframe: Keyframe<any>) {
    return this.keyframeHosts.get(keyframe);
  }

}