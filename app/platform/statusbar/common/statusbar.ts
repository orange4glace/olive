/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'platform/instantiation/common/instantiation';
import { IDisposable } from 'base/common/lifecycle';

export const IStatusbarService = createDecorator<IStatusbarService>('statusbarService');

export const enum StatusbarAlignment {
	LEFT, RIGHT
}

/**
 * A declarative way of describing a status bar entry
 */
export interface IStatusbarEntry {

	/**
	 * The text to show for the entry. You can embed icons in the text by leveraging the syntax:
	 *
	 * `My text ${icon name} contains icons like ${icon name} this one.`
	 */
	readonly text: string;

	/**
	 * An optional tooltip text to show when you hover over the entry
	 */
	readonly tooltip?: string;

	/**
	 * An optional color to use for the entry
	 */
	// readonly color?: string | ThemeColor;

	/**
	 * An optional background color to use for the entry
	 */
	// readonly backgroundColor?: string | ThemeColor;

	/**
	 * An optional id of a command that is known to the workbench to execute on click
	 */
	readonly command?: string;

	/**
	 * Optional arguments for the command.
	 */
	readonly arguments?: any[];

	/**
	 * An optional extension ID if this entry is provided from an extension.
	 */
	// readonly extensionId?: ExtensionIdentifier;

	/**
	 * Wether to show a beak above the status bar entry.
	 */
	readonly showBeak?: boolean;
}

export interface IStatusbarService {

	_serviceBrand: any;

	/**
	 * Adds an entry to the statusbar with the given alignment and priority. Use the returned accessor
	 * to update or remove the statusbar entry.
	 */
	addEntry(entry: IStatusbarEntry, alignment: StatusbarAlignment, priority?: number): IStatusbarEntryAccessor;

	/**
	 * Prints something to the status bar area with optional auto dispose and delay.
	 */
	setStatusMessage(message: string, autoDisposeAfter?: number, delayBy?: number): IDisposable;
}

export interface IStatusbarEntryAccessor extends IDisposable {

	/**
	 * Allows to update an existing status bar entry.
	 */
	update(properties: IStatusbarEntry): void;
}