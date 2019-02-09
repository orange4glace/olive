class PropertyTimeline {

  keyframes = [];
  lastAccessedIndex = -1;

  constructor() {

  }

  access(timecode) {
    if (this.lastAccessedIndex == -1) {
      var keyframe = {
        timecode: timecode
      };
      this.keyframes.push(keyframe);
      this.lastAccessedIndex = 0;
      return keyframe;
    }
    var lastAccessed = this.keyframes[this.lastAccessedIndex];
    if (lastAccessed == timecode) return lastAccessed;

    if (lastAccessed.timecode > timecode) {
      for (; this.lastAccessedIndex >= 0; i --) {
        var keyframe = this.keyframes[this.lastAccessedIndex];
        if (keyframe.timecode < timecode) {
          this.lastAccessedIndex += 1;
          break;
        }
      }
    }

    else {
      for (; this.lastAccessedIndex < this.keyframes.length; i ++) {
        var keyframe = this.keyframes[this.lastAccessedIndex];
        if (keyframe.timecode >= timecode) break;
      }
    }
    var keyframe = this.keyframes[this.lastAccessedIndex];
    if (keyframe.timecode == timecode) return keyframe;

    keyframe = {
      timecode: timecode
    };
    this.keyframes.splice(this.lastAccessedIndex, 0, keyframe);
    return keyframe;
  }

  accessBefore(timecode) {
    if (this.lastAccessedIndex == -1) return null;
    var lastAccessed = this.keyframes[this.lastAccessedIndex];
    if (lastAccessed == timecode) return lastAccessed;

    if (lastAccessed.timecode > timecode) {
      for (; this.lastAccessedIndex >= 0; i --) {
        var keyframe = this.keyframes[this.lastAccessedIndex];
        if (keyframe.timecode <= timecode) break;
      }
      if (this.keyframes[this.lastAccessedIndex].timecode > timecode) return null;
      return keyframes[this.lastAccessedIndex];
    }

    else {
      for (; this.lastAccessedIndex < this.keyframes.length; i ++) {
        var keyframe = this.keyframes[this.lastAccessedIndex];
        if (keyframe.timecode > timecode) break;
      }
      return keyframes[this.lastAccessedIndex];
    }
  }

  accessAfter(timecode) {
    if (this.lastAccessedIndex == -1) return null;
    var lastAccessed = this.keyframes[this.lastAccessedIndex];
    if (lastAccessed == timecode) return lastAccessed;

    if (lastAccessed.timecode > timecode) {
      for (; this.lastAccessedIndex >= 0; i --) {
        var keyframe = this.keyframes[this.lastAccessedIndex];
        if (keyframe.timecode < timecode) {
          this.lastAccessedIndex += 1;
          break;
        }
      }
      return keyframes[this.lastAccessedIndex];
    }

    else {
      for (; this.lastAccessedIndex < this.keyframes.length; i ++) {
        var keyframe = this.keyframes[this.lastAccessedIndex];
        if (keyframe.timecode >= timecode) break;
      }
      if (this.keyframes[this.lastAccessedIndex].timecode < timecode) return null;
      return keyframes[this.lastAccessedIndex];
    }
  }

  setKeyframe(timecode, value) {
    var keyframe = this.access(timecode);
    keyframe.value = value;
  }

}

export default PropertyTimeline;