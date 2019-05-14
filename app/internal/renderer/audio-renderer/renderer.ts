import { TimelineAudioRenderer } from "internal/renderer/audio-renderer/timeline/timeline";
import { TrackItemType } from "internal/timeline/track-item-type";
import { AudioTrackItemRenderer } from "internal/renderer/base/timeline/track-item/audio-track-item";
import { AudioRendererInitializationData } from "internal/renderer/audio-renderer/common";
import { AudioRendererOption, AudioRendererStateIndex, AudioRendererSlotState, getSlotBufferView } from "internal/renderer/audio-renderer/common";
import { postableMessageHandler } from "worker-postable";

interface RenderJob {
  
}

export class AudioRenderer {

  private option: AudioRendererOption;
  private buffers: {
    state: Int32Array,
    slotState: Int32Array,
    slotData: ArrayBuffer
  }
  private currentSlotIndex = 0;
  private currentRequestID = 0;

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

  startRender(timeline: TimelineAudioRenderer, startTime: number) {

  }

  private async _startRender(timeline: TimelineAudioRenderer, startTime: number) {
    let dt = Date.now();
    Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL, 1);
    Atomics.wait(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL, 1);
    const startProducerOffset = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL_RESPONSE);
    let startedSystemTime = Date.now();
    dt = startedSystemTime - dt;
    startTime += dt;
    Atomics.sub(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, startProducerOffset);
    this.currentSlotIndex -= startProducerOffset;

    let lastFrameTime = timeline.sequence.timeToAudioFrame(startTime);

    const tmpFrameBuffer = new Float32Array(new ArrayBuffer(this.option.bytesPerSlot * 2));
    while (true) {
      Atomics.wait(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, this.option.maxSlot);
      const lastRequestID = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_REQUEST);
      if (lastRequestID != this.currentRequestID) return false;

      await this.getRenderData(timeline, lastFrameTime, lastFrameTime + this.option.framesPerSlot, tmpFrameBuffer);

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
    }
  }

  async getRenderData(timeline: TimelineAudioRenderer, startFrame: number, endFrame: number, outBuffer: Float32Array) {
    const sequence = timeline.sequence;
    const startTime = timeline.sequence.audioFrameToTime(startFrame);
    const endTime = timeline.sequence.audioFrameToTime(endFrame);

    timeline.tracks.forEach(track => {
      const trackItems = track.getTrackItemBetween(startTime, endTime);
      trackItems.forEach(trackItem => {
        if (trackItem.type != TrackItemType.AUDIO) return;
        const audioTrackItem = trackItem as AudioTrackItemRenderer;
          const localStartFrame = sequence.timeToAudioFrame(
              audioTrackItem.time.start + audioTrackItem.time.base - startFrame);
          const localEndFrame = sequence.timeToAudioFrame(Math.min(
              audioTrackItem.time.end + audioTrackItem.time.base - startFrame,
              audioTrackItem.time.start + audioTrackItem.time.base - startFrame + endFrame));
          
      })
    })
  }

}