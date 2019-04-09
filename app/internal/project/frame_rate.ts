export enum FrameRateType {
  F30 = 0,
  F29_97,
  F60,
  F59_94,
  CUSTOM
}

export class FrameRate {
  private num: number;
  private den: number;
  private framePerSecond: number;
  readonly type: FrameRateType;

  constructor(num: number, den: number) {
    this.num = num;
    this.den = den;

    let fr = Math.round(num / den * 100);
    if (fr == 3000) {
      this.type = FrameRateType.F30;
      this.framePerSecond = 30;
    }
    else if (fr == 2997) {
      this.type = FrameRateType.F29_97;
      this.framePerSecond = 30;
    }
    else if (fr == 6000) {
      this.type = FrameRateType.F60;
      this.framePerSecond = 60;
    }
    else if (fr == 5994) {
      this.type = FrameRateType.F59_94;
      this.framePerSecond = 60;
    }
  }

  private pad(num: number): string {
    let str = num + '';
    if (str.length == 1) return '0' + str;
    return str;
  }

  format(frameTime: number): string {
    let frame = frameTime % this.framePerSecond;
    let second = Math.floor(frameTime / this.framePerSecond);
    let minute = Math.floor(second / 60);
    let hour = Math.floor(minute / 60);
    second %= 60;
    minute %= 60;
    return `${this.pad(hour)}:${this.pad(minute)}:${this.pad(second)}:${this.pad(frame)}`;
  }

  static fromString(str: string): FrameRate {
    const match = str.match(/^(\d+)\/(\d+)$/);
    if (!match) return null;
    return new FrameRate(+match[1], +match[2]);
  }
}