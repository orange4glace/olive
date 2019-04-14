import { Property, Keyframe, PropertyEvent, PropertyTypes } from "internal/drawing";
import { KeyframeHost } from "./keyframe-host";
import { invariant } from "util/debuging";
import { observable } from "window/app-mobx";

export class PropertyHost<T extends Property<PropertyTypes>> {

  property: T;
  @observable keyframeHosts: Map<Keyframe<any>, KeyframeHost>;

  constructor(property: T) {
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
    console.log('add ke ho',keyframe)
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