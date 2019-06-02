import { Event } from "base/common/event";

export interface IDimension {
  readonly width: number;
  readonly height: number;
}

export interface ILayoutService {

  _serviceBrand: any;

	/**
	 * The dimensions of the container.
	 */
	readonly dimension: IDimension;

	/**
	 * Container of the application.
	 */
	readonly container: HTMLElement;

	/**
	 * An event that is emitted when the container is layed out. The
	 * event carries the dimensions of the container as part of it.
	 */
	readonly onLayout: Event<IDimension>;

}