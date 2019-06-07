import * as React from 'react'
import { IWidgetIdentifier } from 'window/workbench/common/editor';
import { WidgetGroupIdentifier } from 'window/workbench/common/editor/editor';
import { IDragAndDropData, DragAndDropData } from 'base/browser/dnd';

export class DraggedWidgetIdentifier {
	constructor(private _identifier: IWidgetIdentifier) { }

	get identifier(): IWidgetIdentifier {
		return this._identifier;
	}
}

export class DraggedWidgetGroupIdentifier {
	constructor(private _identifier: WidgetGroupIdentifier) { }

	get identifier(): WidgetGroupIdentifier {
		return this._identifier;
	}
}

interface Props extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	forwardRef?: React.RefObject<HTMLDivElement>,
	onDragEnter?: (e: React.DragEvent) => void,
	onDragLeave?: (e: React.DragEvent) => void,
	onDrop?: (e: React.DragEvent) => void,
	onDragEnd?: (e: React.DragEvent) => void,
	onDragOver?: (e: React.DragEvent) => void,
}

export class DragAndDropObserver extends React.PureComponent<Props> {

	// A helper to fix issues with repeated DRAG_ENTER / DRAG_LEAVE
	// calls see https://github.com/Microsoft/vscode/issues/14470
	// when the element has child elements where the events are fired
	// repeadedly.
	private counter: number = 0;

	constructor(props: any) {
		super(props);
		this.dragEnterHandler = this.dragEnterHandler.bind(this);
		this.dragOverHandler = this.dragOverHandler.bind(this);
		this.dragLeaveHandler = this.dragLeaveHandler.bind(this);
		this.dragEndHandler = this.dragEndHandler.bind(this);
		this.dropHandler = this.dropHandler.bind(this);
	}

	dragEnterHandler(e: React.DragEvent) {
		this.counter ++;
		this.props.onDragEnter && this.props.onDragEnter(e as any);
	}

	dragOverHandler(e: React.DragEvent) {
		e.preventDefault();
		this.props.onDragOver && this.props.onDragOver(e as any);
	}

	dragLeaveHandler(e: React.DragEvent) {
		this.counter --;
		if (this.counter == 0)
			this.props.onDragLeave && this.props.onDragLeave(e as any);
	}

	dragEndHandler(e: React.DragEvent) {
		this.counter = 0;
		this.props.onDragEnd && this.props.onDragEnd(e as any);
	}

	dropHandler(e: React.DragEvent) {
		this.counter = 0;
		this.props.onDrop && this.props.onDrop(e as any);
	}

  render() {
		let props = {...this.props};
		delete props.onDragEnter;
		delete props.onDragOver;
		delete props.onDragLeave;
		delete props.onDragEnd;
		delete props.onDrop;
		delete props.forwardRef;
    return <div ref={this.props.forwardRef}
				onDragEnter={this.dragEnterHandler}
				onDragOver={this.dragOverHandler}
				onDragLeave={this.dragLeaveHandler}
				onDragEnd={this.dragEndHandler}
				onDrop={this.dropHandler}
				{...this.props}>
			{this.props.children}
		</div>
  }

}