export enum CoreType {
  TIMELINE,
  TRACK,
  TRACK_ITEM,
  DRAWING,
  EFFECT,
  PROPERTY
}

export interface Core {
  coreType: CoreType;
}