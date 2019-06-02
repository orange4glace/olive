// import { IDisposable, Disposable } from "base/common/lifecycle";
// import { LayoutData } from "window/layout/data";
// import { Serializable } from "base/olive/serialize";
// import { LayoutDirection } from "window/layout/layout-direction";

// export interface IWindow extends IDisposable, Serializable {

//   readonly id: number;

//   readonly layout: LayoutData;

// }

// export class WindowImpl extends Disposable implements IWindow {

//   readonly id: number;

//   readonly layout: LayoutData;

//   constructor() {
//     super();
//     this.layout = new LayoutData(LayoutDirection.VIEW, null);
//   }

//   serialize(): any {
//     return {
//       layout: this.layout.serilaize()
//     };
//   }

// }