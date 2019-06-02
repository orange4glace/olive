import * as React from 'react'
import { Color } from "base/common/color";
import { Event, map, Emitter } from "base/common/event";
import { Orientation, Sash, ISashEvent as IBaseSashEvent, SashState } from "base/browser/ui/sash/sash";
import { IDisposable, Disposable, combinedDisposable } from "base/common/lifecycle";
import * as types from "base/common/types";
import { range, firstIndex, pushToStart, pushToEnd } from "base/common/arrays";
import { clamp } from "base/common/numbers";
import { domEvent } from "base/browser/event";
import { observable, action } from 'mobx';

export interface ISplitViewStyles {
	separatorBorder: Color;
}

const defaultStyles: ISplitViewStyles = {
	separatorBorder: Color.transparent
};

export interface ISplitViewOptions {
	orientation?: Orientation; // default Orientation.VERTICAL
	styles?: ISplitViewStyles;
	orthogonalStartSash?: Sash;
	orthogonalEndSash?: Sash;
	inverseAltBehavior?: boolean;
	proportionalLayout?: boolean; // default true
}

/**
 * Only used when `proportionalLayout` is false.
 */
export const enum LayoutPriority {
	Normal,
	Low,
	High
}

export interface IView {
	readonly minimumSize: number;
	readonly maximumSize: number;
	readonly onDidChange: Event<number | undefined>;
	readonly priority?: LayoutPriority;
	layout(size: number, orientation: Orientation): void;
	render(): React.ReactNode;
}

interface ISashEvent {
	sash: Sash;
	start: number;
	current: number;
	alt: boolean;
}

interface IViewItem {
	view: IView;
	size: number;
	container: React.RefObject<HTMLDivElement>;
	disposable: IDisposable;
	layout(): void;
}

interface ISashItem {
	sash: Sash;
	disposable: IDisposable;
}

interface ISashDragState {
	index: number;
	start: number;
	current: number;
	sizes: number[];
	minDelta: number;
	maxDelta: number;
	alt: boolean;
	disposable: IDisposable;
}

enum State {
	Idle,
	Busy
}

export type DistributeSizing = { type: 'distribute' };
export type SplitSizing = { type: 'split', index: number };
export type Sizing = DistributeSizing | SplitSizing;

export const Distribute: DistributeSizing = { type: 'distribute' };
export function Split(index: number): SplitSizing { return { type: 'split', index }; }

export interface ISplitView {
	
	readonly orientation: Orientation;

	/*@observable*/ readonly viewItems: ReadonlyArray<IViewItem>;
	/*@observable*/ readonly sashItems: ReadonlyArray<ISashItem>;

}


export class SplitView extends Disposable implements ISplitView {

	@observable viewItems: IViewItem[] = [];
	@observable sashItems: ISashItem[] = [];
	readonly orientation: Orientation;

	// readonly el: HTMLElement;
	private size = 0;
	private contentSize = 0;
	private proportions: undefined | number[] = undefined;
	private sashDragState: ISashDragState;
	private state: State = State.Idle;
	private inverseAltBehavior: boolean;
	private proportionalLayout: boolean;

	private _onDidSashChange = this._register(new Emitter<number>());
	readonly onDidSashChange = this._onDidSashChange.event;

	private _onDidSashReset = this._register(new Emitter<number>());
	readonly onDidSashReset = this._onDidSashReset.event;

	get length(): number {
		return this.viewItems.length;
	}

	get minimumSize(): number {
		return this.viewItems.reduce((r, item) => r + item.view.minimumSize, 0);
	}

	get maximumSize(): number {
		return this.length === 0 ? Number.POSITIVE_INFINITY : this.viewItems.reduce((r, item) => r + item.view.maximumSize, 0);
	}

	private _orthogonalStartSash: Sash | undefined;
	get orthogonalStartSash(): Sash | undefined { return this._orthogonalStartSash; }
	set orthogonalStartSash(sash: Sash | undefined) {
		for (const sashItem of this.sashItems) {
			sashItem.sash.orthogonalStartSash = sash;
		}

		this._orthogonalStartSash = sash;
	}

	private _orthogonalEndSash: Sash | undefined;
	get orthogonalEndSash(): Sash | undefined { return this._orthogonalEndSash; }
	set orthogonalEndSash(sash: Sash | undefined) {
		for (const sashItem of this.sashItems) {
			sashItem.sash.orthogonalEndSash = sash;
		}

		this._orthogonalEndSash = sash;
	}

	get sashes(): Sash[] {
		return this.sashItems.map(s => s.sash);
	}

  constructor(options: ISplitViewOptions = {}) {
    super();

    this.orientation = types.isUndefined(options.orientation) ? Orientation.VERTICAL : options.orientation;
    this.inverseAltBehavior = !!options.inverseAltBehavior;
    this.proportionalLayout = types.isUndefined(options.proportionalLayout) ? true : !!options.proportionalLayout; 
  }

	style(styles: ISplitViewStyles): void {
		if (styles.separatorBorder.isTransparent()) {
			// dom.removeClass(this.el, 'separator-border');
			// this.el.style.removeProperty('--separator-border');
		} else {
			// dom.addClass(this.el, 'separator-border');
			// this.el.style.setProperty('--separator-border', styles.separatorBorder.toString());
		}
	}

	@action
  addView(view: IView, size: number | Sizing, index = this.viewItems.length): void {
    if (this.state !== State.Idle)
      throw new Error(`Can't modify splitView`);
    
    this.state = State.Busy;

    const onChangeDisposable = view.onDidChange(size => this.onViewChange(item, size));
		const disposable = combinedDisposable([onChangeDisposable]);

		const layoutContainer = this.orientation === Orientation.VERTICAL
			? () => item.container.current && (item.container.current.style.height = `${item.size}px`)
			: () => item.container.current && (item.container.current.style.width = `${item.size}px`);

    const layout = () => {
      layoutContainer();
			item.view.layout(item.size, this.orientation);
    }

		let viewSize: number;

		if (typeof size === 'number') {
			viewSize = size;
		} else if (size.type === 'split') {
			viewSize = this.getViewSize(size.index) / 2;
		} else {
			viewSize = view.minimumSize;
  	}

		const item: IViewItem = { view, container: React.createRef(), size: viewSize, layout, disposable };
		this.viewItems.splice(index, 0, item);
  
  // Add sash
  	if (this.viewItems.length > 1) {
			const orientation = this.orientation === Orientation.VERTICAL ? Orientation.HORIZONTAL : Orientation.VERTICAL;
			const layoutProvider = this.orientation === Orientation.VERTICAL ? { getHorizontalSashTop: (sash: Sash) => this.getSashPosition(sash) } : { getVerticalSashLeft: (sash: Sash) => this.getSashPosition(sash) };
			const sash = new Sash(layoutProvider, {
				orientation,
				orthogonalStartSash: this.orthogonalStartSash,
				orthogonalEndSash: this.orthogonalEndSash
			});

			const sashEventMapper = this.orientation === Orientation.VERTICAL
				? (e: IBaseSashEvent) => ({ sash, start: e.startY, current: e.currentY, alt: e.altKey } as ISashEvent)
				: (e: IBaseSashEvent) => ({ sash, start: e.startX, current: e.currentX, alt: e.altKey } as ISashEvent);

			const onStart = map(sash.onDidStart, sashEventMapper);
			const onStartDisposable = onStart(this.onSashStart, this);
			const onChange = map(sash.onDidChange, sashEventMapper);
			const onChangeDisposable = onChange(this.onSashChange, this);
			const onEnd = map(sash.onDidEnd, () => firstIndex(this.sashItems, item => item.sash === sash));
			const onEndDisposable = onEnd(this.onSashEnd, this);
			const onDidResetDisposable = sash.onDidReset(() => this._onDidSashReset.fire(firstIndex(this.sashItems, item => item.sash === sash)));

			const disposable = combinedDisposable([onStartDisposable, onChangeDisposable, onEndDisposable, onDidResetDisposable, sash]);
			const sashItem: ISashItem = { sash, disposable };

			this.sashItems.splice(index - 1, 0, sashItem);
		}

		let highPriorityIndex: number | undefined;

		if (typeof size !== 'number' && size.type === 'split') {
			highPriorityIndex = size.index;
		}

		this.relayout(index, highPriorityIndex);
		this.state = State.Idle;

		if (typeof size !== 'number' && size.type === 'distribute') {
			this.distributeViewSizes();
		}
  }

	@action
  removeView(index: number, sizing?: Sizing): IView {
    if (this.state !== State.Idle)
      throw new Error(`Can't modify splitView`);

		this.state = State.Busy;

		if (index < 0 || index >= this.viewItems.length)
			throw new Error('Index out of bounds');

		// Remove view
		const viewItem = this.viewItems.splice(index, 1)[0];
		viewItem.disposable.dispose();

		// Remove sash
		if (this.viewItems.length >= 1) {
			const sashIndex = Math.max(index - 1, 0);
			const sashItem = this.sashItems.splice(sashIndex, 1)[0];
			sashItem.disposable.dispose();
		}

		this.relayout();
		this.state = State.Idle;

		if (sizing && sizing.type === 'distribute') {
			this.distributeViewSizes();
		}

		return viewItem.view;
    
  }

	@action
	moveView(from: number, to: number): void {
		if (this.state !== State.Idle)
			throw new Error('Cant modify splitview');

		const size = this.getViewSize(from);
		const view = this.removeView(from);
		this.addView(view, size, to);
	}

	private relayout(lowPriorityIndex?: number, highPriorityIndex?: number): void {
		const contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
		const lowPriorityIndexes = typeof lowPriorityIndex === 'number' ? [lowPriorityIndex] : undefined;
		const highPriorityIndexes = typeof highPriorityIndex === 'number' ? [highPriorityIndex] : undefined;

		this.resize(this.viewItems.length - 1, this.size - contentSize, undefined, lowPriorityIndexes, highPriorityIndexes);
		this.distributeEmptySpace();
		this.layoutViews();
		this.saveProportions();
	}

	layout(size: number): void {
		const previousSize = Math.max(this.size, this.contentSize);
		this.size = size;

		if (!this.proportions) {
			const indexes = range(this.viewItems.length);
			const lowPriorityIndexes = indexes.filter(i => this.viewItems[i].view.priority === LayoutPriority.Low);
			const highPriorityIndexes = indexes.filter(i => this.viewItems[i].view.priority === LayoutPriority.High);

			this.resize(this.viewItems.length - 1, size - previousSize, undefined, lowPriorityIndexes, highPriorityIndexes);
		} else {
			for (let i = 0; i < this.viewItems.length; i++) {
				const item = this.viewItems[i];
				item.size = clamp(Math.round(this.proportions[i] * size), item.view.minimumSize, item.view.maximumSize);
			}
		}

		this.distributeEmptySpace();
		this.layoutViews();
	}

	private saveProportions(): void {
		if (this.proportionalLayout && this.contentSize > 0) {
			this.proportions = this.viewItems.map(i => i.size / this.contentSize);
		}
	}

	private onSashStart({ sash, start, alt }: ISashEvent): void {
		const index = firstIndex(this.sashItems, item => item.sash === sash);

		// This way, we can press Alt while we resize a sash, macOS style!
		const disposable = combinedDisposable([
			domEvent(document.body, 'keydown')(e => resetSashDragState(this.sashDragState.current, e.altKey)),
			domEvent(document.body, 'keyup')(() => resetSashDragState(this.sashDragState.current, false))
		]);

		const resetSashDragState = (start: number, alt: boolean) => {
			const sizes = this.viewItems.map(i => i.size);
			let minDelta = Number.NEGATIVE_INFINITY;
			let maxDelta = Number.POSITIVE_INFINITY;

			if (this.inverseAltBehavior) {
				alt = !alt;
			}

			if (alt) {
				// When we're using the last sash with Alt, we're resizing
				// the view to the left/up, instead of right/down as usual
				// Thus, we must do the inverse of the usual
				const isLastSash = index === this.sashItems.length - 1;

				if (isLastSash) {
					const viewItem = this.viewItems[index];
					minDelta = (viewItem.view.minimumSize - viewItem.size) / 2;
					maxDelta = (viewItem.view.maximumSize - viewItem.size) / 2;
				} else {
					const viewItem = this.viewItems[index + 1];
					minDelta = (viewItem.size - viewItem.view.maximumSize) / 2;
					maxDelta = (viewItem.size - viewItem.view.minimumSize) / 2;
				}
			}

			this.sashDragState = { start, current: start, index, sizes, minDelta, maxDelta, alt, disposable };
		};

		resetSashDragState(start, alt);
	}

	private onSashChange({ current }: ISashEvent): void {
		const { index, start, sizes, alt, minDelta, maxDelta } = this.sashDragState;
		this.sashDragState.current = current;

		const delta = current - start;
		const newDelta = this.resize(index, delta, sizes, undefined, undefined, minDelta, maxDelta);

		if (alt) {
			const isLastSash = index === this.sashItems.length - 1;
			const newSizes = this.viewItems.map(i => i.size);
			const viewItemIndex = isLastSash ? index : index + 1;
			const viewItem = this.viewItems[viewItemIndex];
			const newMinDelta = viewItem.size - viewItem.view.maximumSize;
			const newMaxDelta = viewItem.size - viewItem.view.minimumSize;
			const resizeIndex = isLastSash ? index - 1 : index + 1;

			this.resize(resizeIndex, -newDelta, newSizes, undefined, undefined, newMinDelta, newMaxDelta);
		}

		this.distributeEmptySpace();
		this.layoutViews();
	}

	private onSashEnd(index: number): void {
		this._onDidSashChange.fire(index);
		this.sashDragState.disposable.dispose();
		this.saveProportions();
	}

	private onViewChange(item: IViewItem, size: number | undefined): void {
		const index = this.viewItems.indexOf(item);

		if (index < 0 || index >= this.viewItems.length) {
			return;
		}

		size = typeof size === 'number' ? size : item.size;
		size = clamp(size, item.view.minimumSize, item.view.maximumSize);

		if (this.inverseAltBehavior && index > 0) {
			// In this case, we want the view to grow or shrink both sides equally
			// so we just resize the "left" side by half and let `resize` do the clamping magic
			this.resize(index - 1, Math.floor((item.size - size) / 2));
			this.distributeEmptySpace();
			this.layoutViews();
		} else {
			item.size = size;
			this.relayout(index, undefined);
		}
	}

	resizeView(index: number, size: number): void {
		if (this.state !== State.Idle) {
			throw new Error('Cant modify splitview');
		}

		this.state = State.Busy;

		if (index < 0 || index >= this.viewItems.length) {
			return;
		}

		const item = this.viewItems[index];
		size = Math.round(size);
		size = clamp(size, item.view.minimumSize, item.view.maximumSize);
		let delta = size - item.size;

		if (delta !== 0 && index < this.viewItems.length - 1) {
			const downIndexes = range(index + 1, this.viewItems.length);
			const collapseDown = downIndexes.reduce((r, i) => r + (this.viewItems[i].size - this.viewItems[i].view.minimumSize), 0);
			const expandDown = downIndexes.reduce((r, i) => r + (this.viewItems[i].view.maximumSize - this.viewItems[i].size), 0);
			const deltaDown = clamp(delta, -expandDown, collapseDown);

			this.resize(index, deltaDown);
			delta -= deltaDown;
		}

		if (delta !== 0 && index > 0) {
			const upIndexes = range(index - 1, -1);
			const collapseUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].size - this.viewItems[i].view.minimumSize), 0);
			const expandUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].view.maximumSize - this.viewItems[i].size), 0);
			const deltaUp = clamp(-delta, -collapseUp, expandUp);

			this.resize(index - 1, deltaUp);
		}

		this.distributeEmptySpace();
		this.layoutViews();
		this.saveProportions();
		this.state = State.Idle;
	}

	distributeViewSizes(): void {
		const size = Math.floor(this.size / this.viewItems.length);

		for (let i = 0; i < this.viewItems.length - 1; i++) {
			this.resizeView(i, size);
		}
	}

	getViewSize(index: number): number {
		if (index < 0 || index >= this.viewItems.length) {
			return -1;
		}

		return this.viewItems[index].size;
	}

	private resize(
		index: number,
		delta: number,
		sizes = this.viewItems.map(i => i.size),
		lowPriorityIndexes?: number[],
		highPriorityIndexes?: number[],
		overloadMinDelta: number = Number.NEGATIVE_INFINITY,
		overloadMaxDelta: number = Number.POSITIVE_INFINITY
	): number {
		if (index < 0 || index >= this.viewItems.length) {
			return 0;
		}

		const upIndexes = range(index, -1);
		const downIndexes = range(index + 1, this.viewItems.length);

		if (highPriorityIndexes) {
			for (const index of highPriorityIndexes) {
				pushToStart(upIndexes, index);
				pushToStart(downIndexes, index);
			}
		}

		if (lowPriorityIndexes) {
			for (const index of lowPriorityIndexes) {
				pushToEnd(upIndexes, index);
				pushToEnd(downIndexes, index);
			}
		}

		const upItems = upIndexes.map(i => this.viewItems[i]);
		const upSizes = upIndexes.map(i => sizes[i]);

		const downItems = downIndexes.map(i => this.viewItems[i]);
		const downSizes = downIndexes.map(i => sizes[i]);

		const minDeltaUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].view.minimumSize - sizes[i]), 0);
		const maxDeltaUp = upIndexes.reduce((r, i) => r + (this.viewItems[i].view.maximumSize - sizes[i]), 0);
		const maxDeltaDown = downIndexes.length === 0 ? Number.POSITIVE_INFINITY : downIndexes.reduce((r, i) => r + (sizes[i] - this.viewItems[i].view.minimumSize), 0);
		const minDeltaDown = downIndexes.length === 0 ? Number.NEGATIVE_INFINITY : downIndexes.reduce((r, i) => r + (sizes[i] - this.viewItems[i].view.maximumSize), 0);
		const minDelta = Math.max(minDeltaUp, minDeltaDown, overloadMinDelta);
		const maxDelta = Math.min(maxDeltaDown, maxDeltaUp, overloadMaxDelta);

		delta = clamp(delta, minDelta, maxDelta);

		for (let i = 0, deltaUp = delta; i < upItems.length; i++) {
			const item = upItems[i];
			const size = clamp(upSizes[i] + deltaUp, item.view.minimumSize, item.view.maximumSize);
			const viewDelta = size - upSizes[i];

			deltaUp -= viewDelta;
			item.size = size;
		}

		for (let i = 0, deltaDown = delta; i < downItems.length; i++) {
			const item = downItems[i];
			const size = clamp(downSizes[i] - deltaDown, item.view.minimumSize, item.view.maximumSize);
			const viewDelta = size - downSizes[i];

			deltaDown += viewDelta;
			item.size = size;
		}

		return delta;
	}

	private distributeEmptySpace(): void {
		let contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);
		let emptyDelta = this.size - contentSize;

		for (let i = this.viewItems.length - 1; emptyDelta !== 0 && i >= 0; i--) {
			const item = this.viewItems[i];
			const size = clamp(item.size + emptyDelta, item.view.minimumSize, item.view.maximumSize);
			const viewDelta = size - item.size;

			emptyDelta -= viewDelta;
			item.size = size;
		}
	}

	private layoutViews(): void {
		// Save new content size
		this.contentSize = this.viewItems.reduce((r, i) => r + i.size, 0);

		// Layout views
		this.viewItems.forEach(item => item.layout());

		// Layout sashes
		this.sashItems.forEach(item => item.sash.layout());

		// Update sashes enablement
		let previous = false;
		const collapsesDown = this.viewItems.map(i => previous = (i.size - i.view.minimumSize > 0) || previous);

		previous = false;
		const expandsDown = this.viewItems.map(i => previous = (i.view.maximumSize - i.size > 0) || previous);

		const reverseViews = [...this.viewItems].reverse();
		previous = false;
		const collapsesUp = reverseViews.map(i => previous = (i.size - i.view.minimumSize > 0) || previous).reverse();

		previous = false;
		const expandsUp = reverseViews.map(i => previous = (i.view.maximumSize - i.size > 0) || previous).reverse();

		this.sashItems.forEach((s, i) => {
			const min = !(collapsesDown[i] && expandsUp[i + 1]);
			const max = !(expandsDown[i] && collapsesUp[i + 1]);

			if (min && max) {
				s.sash.state = SashState.Disabled;
			} else if (min && !max) {
				s.sash.state = SashState.Minimum;
			} else if (!min && max) {
				s.sash.state = SashState.Maximum;
			} else {
				s.sash.state = SashState.Enabled;
			}
		});
	}

	private getSashPosition(sash: Sash): number {
		let position = 0;

		for (let i = 0; i < this.sashItems.length; i++) {
			position += this.viewItems[i].size;

			if (this.sashItems[i].sash === sash) {
				return position;
			}
		}

		return 0;
	}

	dispose(): void {
		super.dispose();

		this.viewItems.forEach(i => i.disposable.dispose());
		this.viewItems = [];

		this.sashItems.forEach(i => i.disposable.dispose());
		this.sashItems = [];
	}

}