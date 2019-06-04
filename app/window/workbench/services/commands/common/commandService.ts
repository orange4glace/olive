/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IInstantiationService } from 'platform/instantiation/common/instantiation';
import { ICommandService, ICommandEvent, CommandsRegistry } from 'platform/commands/common/commands';
// import { IExtensionService } from 'workbench/services/extensions/common/extensions';
import { Event, Emitter } from 'base/common/event';
import { Disposable } from 'base/common/lifecycle';
import { ILogService } from 'platform/log/common/log';
import { registerSingleton } from 'platform/instantiation/common/extensions';
import { timeout } from 'base/common/async';

export class CommandService extends Disposable implements ICommandService {

	_serviceBrand: any;

	private _extensionHostIsReady: boolean = false;
	private _starActivation: Promise<void> | null;

	private readonly _onWillExecuteCommand: Emitter<ICommandEvent> = this._register(new Emitter<ICommandEvent>());
	public readonly onWillExecuteCommand: Event<ICommandEvent> = this._onWillExecuteCommand.event;

	constructor(
		@IInstantiationService private readonly _instantiationService: IInstantiationService,
		// @IExtensionService private readonly _extensionService: IExtensionService,
		@ILogService private readonly _logService: ILogService
	) {
		super();
		// this._extensionService.whenInstalledExtensionsRegistered().then(value => this._extensionHostIsReady = value);
		this._starActivation = null;
	}

	// private _activateStar(): Promise<void> {
	// 	if (!this._starActivation) {
	// 		// wait for * activation, limited to at most 30s
	// 		this._starActivation = Promise.race<any>([
	// 			this._extensionService.activateByEvent(`*`),
	// 			timeout(30000)
	// 		]);
	// 	}
	// 	return this._starActivation;
	// }

	executeCommand<T>(id: string, ...args: any[]): Promise<T> {
		this._logService.trace('CommandService#executeCommand', id);

		// we always send an activation event, but
		// we don't wait for it when the extension
		// host didn't yet start and the command is already registered

		// const activation: Promise<any> = this._extensionService.activateByEvent(`onCommand:${id}`);
		// const commandIsRegistered = !!CommandsRegistry.getCommand(id);

    return this._tryExecuteCommand(id, args);

		// if (!this._extensionHostIsReady && commandIsRegistered) {
		// 	return this._tryExecuteCommand(id, args);
		// } else {
		// 	let waitFor = activation;
		// 	if (!commandIsRegistered) {
		// 		waitFor = Promise.all([
		// 			activation,
		// 			Promise.race<any>([
		// 				// race * activation against command registration
		// 				this._activateStar(),
		// 				Event.toPromise(Event.filter(CommandsRegistry.onDidRegisterCommand, e => e === id))
		// 			]),
		// 		]);
		// 	}
		// 	return (waitFor as Promise<any>).then(_ => this._tryExecuteCommand(id, args));
		// }
	}

	private _tryExecuteCommand(id: string, args: any[]): Promise<any> {
		const command = CommandsRegistry.getCommand(id);
		if (!command) {
			return Promise.reject(new Error(`command '${id}' not found`));
		}
		try {
			this._onWillExecuteCommand.fire({ commandId: id });
			console.log(command.handler)
			const result = this._instantiationService.invokeFunction.apply(this._instantiationService, [command.handler, ...args]);
			return Promise.resolve(result);
		} catch (err) {
			return Promise.reject(err);
		}
	}
}

registerSingleton(ICommandService, CommandService, true);