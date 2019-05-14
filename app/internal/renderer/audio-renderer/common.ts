export interface AudioRendererInitializationData {
  option: AudioRendererOption;
  buffers: {
    state: ArrayBuffer,
    slotState: ArrayBuffer,
    slotData: ArrayBuffer
  };
}

export function createAudioRendererOption(opt: {
  frequency: number,
  maxSlot: number,
  kernelsPerSlot: number
}): AudioRendererOption {
  return {
    frequency: opt.frequency,
    maxSlot: opt.maxSlot,
    bytesPerFrame: 4,
    framesPerKernel: 128,
    kernelsPerSlot: opt.kernelsPerSlot,
    framesPerSlot: 128 * opt.kernelsPerSlot,
    bytesPerKernel: 128 * 4,
    bytesPerSlot: 128 * 4 * opt.kernelsPerSlot,
    slotLayout: {
      INDEX: 0,
      DATA: 4,
      __SIZE: 4 + 128 * 4 * opt.kernelsPerSlot
    }
  }
}

export function createAudioRendererBuffers(opt: AudioRendererOption) {
  return {
    state: new SharedArrayBuffer(AudioRendererStateIndex._SIZE * 4),
    slotState: new SharedArrayBuffer(opt.maxSlot * 4),
    slotData: new SharedArrayBuffer(opt.slotLayout.__SIZE * opt.maxSlot)
  }
}

export interface AudioRendererOption {
  readonly frequency: number;
  readonly maxSlot: number;
  readonly bytesPerFrame: number;
  readonly framesPerKernel: number;
  readonly kernelsPerSlot: number;
  readonly framesPerSlot: number;
  readonly bytesPerKernel: number;
  readonly bytesPerSlot: number;
  readonly slotLayout: AudioRendererSlotLayout;
}

export enum AudioRendererStateIndex {
  PRODUCER_OFFSET = 0,
  PRODUCER_SIGNAL,
  PRODUCER_SIGNAL_RESPONSE,
  PRODUCER_REQUEST,
  _SIZE
}

export enum AudioRendererSlotState {
  IDLE = 0,
  BUSY
}

interface AudioRendererSlotLayout {
  INDEX: number;
  DATA: number;
  __SIZE: number;
}

export function getSlotBufferView(option: AudioRendererOption, slotBuffer: ArrayBuffer, slotOffset: number) {
  const slotLayout = option.slotLayout;
  return {
    header: new Int32Array(slotBuffer, slotLayout.__SIZE * slotOffset, slotLayout.DATA / 4),
    data: new Float32Array(slotBuffer, slotLayout.__SIZE + slotLayout.DATA, option.bytesPerSlot / 4)
  };
}