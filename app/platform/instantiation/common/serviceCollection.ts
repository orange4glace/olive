/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { ServiceIdentifier } from 'platform/instantiation/common/instantiation';
import { SyncDescriptor } from './descriptors';

export class ServiceCollection {

	private _entries = new Map<string, any>();
	private _entries2 = new Map<ServiceIdentifier<any>, any>();

	constructor(...entries: [ServiceIdentifier<any>, any][]) {
		for (let [id, service] of entries) {
			this.set(id, service);
		}
	}

	set<T>(id: ServiceIdentifier<T>, instanceOrDescriptor: T | SyncDescriptor<T>): T | SyncDescriptor<T> {
		const result = this._entries.get(id.toString());
		this._entries.set(id.toString(), instanceOrDescriptor);
		this._entries2.set(id, instanceOrDescriptor);
		return result;
	}

	forEach(callback: (id: ServiceIdentifier<any>, instanceOrDescriptor: any) => any): void {
		this._entries2.forEach((value, key) => callback(key, value));
	}

	has(id: ServiceIdentifier<any>): boolean {
		return this._entries.has(id.toString());
	}

	get<T>(id: ServiceIdentifier<T>): T | SyncDescriptor<T> {
		return this._entries.get(id.toString());
	}
}
