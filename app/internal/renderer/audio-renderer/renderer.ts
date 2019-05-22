import { TimelineAudioRenderer } from "internal/renderer/audio-renderer/timeline/timeline";
import { TrackItemType } from "internal/timeline/track-item/track-item-type";
import { AudioTrackItemRenderer } from "internal/renderer/base/timeline/track-item/audio-track-item";
import { AudioRendererInitializationData } from "internal/renderer/audio-renderer/common";
import { AudioRendererOption, AudioRendererStateIndex, AudioRendererSlotState, getSlotBufferView } from "internal/renderer/audio-renderer/common";
import { postableMessageHandler } from "worker-postable";
import { AudioTrackItemAudioRenderer } from "internal/renderer/audio-renderer/timeline/track-item/audio-track-item";
import { read, openSync, close } from "fs";
import { getCurrentSystemTime } from "base/common/time";

interface RenderingRequest {
  requestID: number;
  startTime: number;
  play: boolean;
}

export class AudioRenderer {

  private option: AudioRendererOption;
  private buffers: {
    state: Int32Array,
    slotState: Int32Array,
    slotData: ArrayBuffer
  }
  private currentSlotIndex = 0;
  private currentRequest: RenderingRequest = {
    requestID: 0,
    startTime: 0,
    play: false
  };

  initialize(initData: AudioRendererInitializationData) {
    const buffers = initData.buffers;
    this.option = initData.option;
    this.buffers = {
      state: new Int32Array(buffers.state),
      slotState: new Int32Array(buffers.slotState),
      slotData: buffers.slotData
    };
    console.log('AudioRenderer initiailzed', this.option);
  }

  render(timeline: TimelineAudioRenderer, startTime: number, requestID: number) {
    this.currentRequest.requestID = requestID;
    this.currentRequest.startTime = startTime;
    this.currentRequest.play = false;
    this._startRender(timeline, startTime);
  }

  stopRender(requestID: number) {
    this.currentRequest.requestID = requestID;
    this.currentRequest.play = false;
  }

  startRender(timeline: TimelineAudioRenderer, startTime: number, startSystemTime: number, requestID: number) {
    this.currentRequest.requestID = requestID;
    this.currentRequest.startTime = startTime;
    this.currentRequest.play = true;
    const dt = getCurrentSystemTime() - startSystemTime;
    this._startRender(timeline, startTime + dt);
  }

  private async _startRender(timeline: TimelineAudioRenderer, startTime: number) {
    let dt = getCurrentSystemTime();
    Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL, 1);
    Atomics.wait(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL, 1);
    const startProducerOffset = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL_RESPONSE);
    let startedSystemTime = getCurrentSystemTime();
    dt = startedSystemTime - dt;
    startTime += timeline.videoSetting.frameRate.systemTimeToTime(dt);
    Atomics.sub(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, startProducerOffset);
    this.currentSlotIndex -= startProducerOffset;

    let lastFrameTime = timeline.timeToAudioFrame(startTime);

    const tmpFrameBuffer = new Float32Array(new ArrayBuffer(this.option.bytesPerSlot));
    while (true) {
      Atomics.wait(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, this.option.maxSlot);

      // Request guard
      let lastRequestID = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST);
      if (lastRequestID != this.currentRequest.requestID) return;
      await this.getRenderData(timeline, lastFrameTime, lastFrameTime + this.option.framesPerSlot, tmpFrameBuffer);
      lastRequestID = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST);
      if (lastRequestID != this.currentRequest.requestID) return;
      // Request guard

      const currentProducerOffset = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET);
      if (currentProducerOffset < 0) {
        const slotsToAdvance = -currentProducerOffset;
        Atomics.add(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, slotsToAdvance);
        this.currentSlotIndex += slotsToAdvance;
        lastFrameTime += slotsToAdvance * this.option.framesPerSlot + this.option.framesPerSlot;
        console.warn('Timeslot missed', lastFrameTime);
      }
      else {
        const recordingSlotOffset = this.currentSlotIndex % this.option.maxSlot;
        if (Atomics.compareExchange(this.buffers.slotState, recordingSlotOffset,
            AudioRendererSlotState.IDLE, AudioRendererSlotState.BUSY) == AudioRendererSlotState.IDLE) {
          const dataBufferView = new Float32Array(tmpFrameBuffer.buffer, 0, this.option.bytesPerSlot / 4);
          const slotBufferView = getSlotBufferView(this.option, this.buffers.slotData, recordingSlotOffset);
          const slotHeaderView = slotBufferView.header;
          const slotDataView = slotBufferView.data;
          slotHeaderView[this.option.slotLayout.INDEX] = this.currentSlotIndex;
          slotDataView.set(dataBufferView);
          Atomics.store(this.buffers.slotState, recordingSlotOffset, AudioRendererSlotState.IDLE);
        }
        else {
          console.warn('data dropped (busy by consumer)');
        }
        lastFrameTime += this.option.framesPerSlot;
      }
      Atomics.add(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, 1);
      this.currentSlotIndex += 1;

      const lastTime = timeline.audioFrameToTime(lastFrameTime);
      if (!this.currentRequest.play && lastTime - startTime >= 0.1) return;
    }
  }

  async getRenderData(timeline: TimelineAudioRenderer, startFrame: number, endFrame: number, outBuffer: Float32Array) {
    const startTime = timeline.audioFrameToTime(startFrame);
    const endTime = timeline.audioFrameToTime(endFrame);

    const promises: Promise<Float32Array>[] = [];
    timeline.tracks.forEach(track => {
      const trackItems = track.getTrackItemBetween(startTime, endTime);
      trackItems.forEach(trackItem => {
        if (trackItem.type != TrackItemType.AUDIO) return;
        const audioTrackItem = trackItem as AudioTrackItemAudioRenderer;
        const trackItemStartFrame = timeline.timeToAudioFrame(audioTrackItem.time.start + audioTrackItem.time.base);
        const localStartFrame = startFrame - trackItemStartFrame;
        const localEndFrame = endFrame - trackItemStartFrame;
        promises.push(this.getTrackItemRenderData(audioTrackItem, localStartFrame, localEndFrame));
      })
    })
    try {
      const values = await Promise.all(promises)
      values.forEach(value => outBuffer.set(value));
    } catch (err) {
      console.error(err);
    }
    return;
  }

  async getTrackItemRenderData(trackItem: AudioTrackItemAudioRenderer, startFrame: number, endFrame: number): Promise<Float32Array> {
    const fd = openSync(trackItem.resource.path + '.raw', 'r');
    const buffer = new Float32Array(endFrame - startFrame);
    return new Promise<Float32Array>((resolve, reject) => {
      read(fd, buffer, 0, (endFrame - startFrame) * 4, startFrame * 4, (err, bytesRead, buffer) => {
        if (err) return reject(err);
        resolve(buffer);
        close(fd, err => {
          if (err) console.error(err)
        });
      });
    });
  }

}