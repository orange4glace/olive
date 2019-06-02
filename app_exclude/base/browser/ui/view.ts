import { Event } from "base/common/event";

export const enum Orientation {
	VERTICAL,
	HORIZONTAL
}

export interface IView {
	readonly minimumWidth: number;
	readonly maximumWidth: number;
	readonly minimumHeight: number;
	readonly maximumHeight: number;
	readonly onDidChange: Event<{ width: number; height: number; } | undefined>;
	// readonly priority?: LayoutPriority;
	readonly snapSize?: number;
	layout(width: number, height: number, orientation: Orientation): void;
}

export interface ISerializableView extends IView {
	toJSON(): object;
}