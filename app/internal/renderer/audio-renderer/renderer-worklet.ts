import { AudioRendererInitializationData, AudioRendererOption, AudioRendererSlotState, getSlotBufferView, AudioRendererStateIndex } from "internal/renderer/audio-renderer/common";
import { AudioRendererMessageEventType } from "internal/renderer/audio-renderer/message";

class AudioRendererWorkletProcessor extends AudioWorkletProcessor {

  initialized: boolean = false;

  ZERO_FILLED_SLOT_BUFFER: Float32Array;
  currentSlotDataBuffer: Float32Array;
  currentKernelIndex: number = 0;

  option: AudioRendererOption;
  buffers: {
    state: Int32Array,
    slotState: Int32Array,
    slotData: ArrayBuffer
  }

  constructor() {
    super();
    console.log(this);

    this.port.onmessage = this.handleMessage.bind(this);    
  }

  private handleMessage(e: MessageEvent) {
    this.port.onmessage = (e: MessageEvent) => {
      const data = e.data;
      switch (data.type) {
        case AudioRendererMessageEventType.INIT: 
          this.initialize(data.data);
          break;
      }
    }
  }

  private initialize(data: AudioRendererInitializationData) {
    const buffers = data.buffers;
    this.buffers.state = new Int32Array(buffers.state);
    this.buffers.slotState = new Int32Array(buffers.slotState);
    this.buffers.slotData = buffers.slotData;
    this.option = data.option;

    this.ZERO_FILLED_SLOT_BUFFER = new Float32Array(new ArrayBuffer(this.option.bytesPerSlot));
    this.currentSlotDataBuffer = new Float32Array(new ArrayBuffer(this.option.bytesPerSlot));
    this.initialized = true;
  }

  process(inputs: any, outputs: any, parameters: any) {
    if (!this.initialized) return true;
    this.stepKernel(outputs[0][0]);
    return true;
  }

  private stepKernel(outBuffer: Float32Array) {
    const option = this.option;
    if ((this.currentKernelIndex + 1) % option.kernelsPerSlot == 0) {
      const slotIndex = (this.currentKernelIndex + 1) / option.kernelsPerSlot;
      this.getSlotData(slotIndex, this.currentSlotDataBuffer);
      Atomics.sub(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, 1);
      this.checkSignal();
      Atomics.notify(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET, 1);
    }
    this.currentKernelIndex = this.currentKernelIndex + 1;
    this.getKernelData(this.currentSlotDataBuffer, this.currentKernelIndex, outBuffer);
  }

  private checkSignal() {
    const signal = Atomics.compareExchange(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL, 1, 0);
    if (signal == 1) {
      const producerOffset = Atomics.load(this.buffers.state, AudioRendererStateIndex.PRODUCER_OFFSET);
      Atomics.store(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL_RESPONSE, producerOffset);
      Atomics.notify(this.buffers.state, AudioRendererStateIndex.PRODUCER_SIGNAL, 1);
    }
  }

  private getKernelData(slotDataBuffer: Float32Array, kernelIndex: number, outBuffer: Float32Array) {
    const option = this.option;
    const kernelOffset = kernelIndex % option.kernelsPerSlot;
    const kernelData = new Float32Array(slotDataBuffer.buffer,
        option.bytesPerKernel * kernelOffset,
        option.bytesPerKernel / 4);
    outBuffer.set(kernelData);
  }

  private getSlotData(slotIndex: number, outBuffer: Float32Array) {
    const option = this.option;
    const slotOffset = slotIndex % option.maxSlot;
    if (Atomics.compareExchange(this.buffers.slotState, slotOffset, AudioRendererSlotState.IDLE, AudioRendererSlotState.BUSY)
        == AudioRendererSlotState.IDLE) {
      const slotView = getSlotBufferView(option, this.buffers.slotState, slotOffset);
      const slotHeaderView = slotView.header;
      const slotDataView = slotView.data;
      if (slotHeaderView[option.slotLayout.INDEX] != slotIndex) {
        outBuffer.set(this.ZERO_FILLED_SLOT_BUFFER);
        console.warn('miss! ' + 'expected = ' + slotIndex + ', got = ' + slotHeaderView[option.slotLayout.INDEX]);
      }
      else {
        outBuffer.set(slotDataView);
      }
      Atomics.store(this.buffers.slotState, slotOffset, AudioRendererSlotState.IDLE);
    }
    else {
      outBuffer.set(this.ZERO_FILLED_SLOT_BUFFER);
      console.warn('Slot is busy by Producer');
    }
  }

}

registerProcessor('audio-renderer-worklet-processor', AudioRendererWorkletProcessor);