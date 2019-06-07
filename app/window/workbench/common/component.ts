/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { Memento } from 'window/workbench/common/memento';
import { IStorageService, StorageScope } from 'platform/storage/common/storage';
import { Disposable } from 'base/common/lifecycle';

export interface IComponent {
	render(): React.ReactNode;
}

export abstract class Component extends Disposable {
	private readonly memento: Memento;

	constructor(
		private readonly id: string,
		storageService: IStorageService
	) {
    super();

		this.id = id;
		this.memento = new Memento(this.id, storageService);

		this._register(storageService.onWillSaveState(() => {

			// Ask the component to persist state into the memento
			this.saveState();

			// Then save the memento into storage
			this.memento.saveMemento();
		}));
	}

	getId(): string {
		return this.id;
	}

	protected getMemento(scope: StorageScope): object {
		return this.memento.getMemento(scope);
	}

	protected saveState(): void {
		// Subclasses to implement for storing state
	}

	abstract render(): React.ReactNode;
}