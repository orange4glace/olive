import * as React from 'react'
import { IDisposable } from "base/common/lifecycle";
import { IView as ISplitView, SplitView, LayoutPriority, Sizing, ISplitViewStyles } from "base/browser/ui/split-view/split-view";
import { Event } from "base/common/event";
import { Orientation, Sash } from "base/browser/ui/sash/sash";

export { Sizing, LayoutPriority } from 'base/browser/ui/split-view/split-view';
export { Orientation } from 'base/browser/ui/sash/sash';

export function orthogonal(orientation: Orientation): Orientation {
	return orientation === Orientation.VERTICAL ? Orientation.HORIZONTAL : Orientation.VERTICAL;
}

export function isGridBranchNode(node: GridNode): node is GridBranchNode {
	return !!(node as any).children;
}

export interface IGridViewStyles extends ISplitViewStyles { }

export interface IGridViewOptions {
	styles?: IGridViewStyles;
	proportionalLayout?: boolean; // default true
}

export interface IView {
	readonly element: React.RefObject<HTMLDivElement>;
	readonly minimumWidth: number;
	readonly maximumWidth: number;
	readonly minimumHeight: number;
	readonly maximumHeight: number;
	readonly onDidChange: Event<{ width: number; height: number; } | undefined>;
	readonly priority?: LayoutPriority;
	readonly snapSize?: number;
	layout(width: number, height: number, orientation: Orientation): void;
}

export interface Box {
	top: number;
	left: number;
	width: number;
	height: number;
}

export interface GridLeafNode {
	readonly view: IView;
	readonly box: Box;
}

export interface GridBranchNode {
	readonly children: GridNode[];
	readonly box: Box;
}

export type GridNode = GridLeafNode | GridBranchNode;

export interface IBranchNode extends ISplitView, IDisposable {

	readonly children: Node[];
	readonly splitview: SplitView;

}

export interface ILeafNode extends ISplitView, IDisposable {

}

export type Node = IBranchNode | ILeafNode;

export interface IGridView extends IDisposable {
  orientation: Orientation;
}