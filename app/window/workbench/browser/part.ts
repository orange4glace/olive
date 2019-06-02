// import { Component } from "window/workbench/common/component";
// import { ISerializableView, Orientation } from "base/browser/ui/view";
// import { Emitter, Event } from "base/common/event";

// export interface IPartOptions {
//   hasTitle?: boolean;
//   borderWidth?: () => number;
// }

// export abstract class Part extends Component implements ISerializableView {

// 	private _onDidChange = this._register(new Emitter<{ width: number; height: number; }>());
// 	get onDidChange(): Event<{ width: number, height: number }> { return this._onDidChange.event; }

// 	abstract minimumWidth: number;
// 	abstract maximumWidth: number;
// 	abstract minimumHeight: number;
// 	abstract maximumHeight: number;

// 	abstract layout(width: number, height: number, orientation: Orientation): void;
// 	abstract toJSON(): object;

// }