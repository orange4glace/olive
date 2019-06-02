import * as _nativeKeymap from 'native-keymap'
const nativeKeymap = (<any>window).nativeKeymap;
import { Emitter, Event } from 'base/common/event';
import { IKeyboardMapper, CachedKeyboardMapper } from 'window/workbench/services/keybinding/common/keyboardMapper';
import { IWindowsKeyboardMapping, WindowsKeyboardMapper, windowsKeyboardMappingEquals } from 'window/workbench/services/keybinding/common/windowsKeyboardMapper';
import { MacLinuxFallbackKeyboardMapper } from 'window/workbench/services/keybinding/common/macLinuxFallbackKeyboardMapper';
import { OperatingSystem, OS } from 'base/common/platform';
import { MacLinuxKeyboardMapper, IMacLinuxKeyboardMapping, macLinuxKeyboardMappingEquals } from 'window/workbench/services/keybinding/common/macLinuxKeyboardMapper';
import { AbstractKeybindingService } from 'platform/keybinding/common/abstractKeybindingService';
import { KeybindingResolver } from 'platform/keybinding/common/keybindingResolver';
import { ICommandService } from 'platform/commands/common/commands';
import { INotificationService } from 'platform/notification/common/notification';
import { IContextKeyService } from 'platform/contextkey/common/contextkey';
import { IKeybindingItem, KeybindingsRegistry } from 'platform/keybinding/common/keybindingsRegistry';
import { ResolvedKeybindingItem } from 'platform/keybinding/common/resolvedKeybindingItem';
import { Keybinding, ResolvedKeybinding } from 'base/common/keyCodes';
import { IKeyboardEvent } from 'base/browser/keyboardEvent';
import { registerSingleton } from 'platform/instantiation/common/extensions';
import { IKeybindingService } from 'platform/keybinding/common/keybinding';

export class KeyboardMapperFactory {
	public static readonly INSTANCE = new KeyboardMapperFactory();

	private _layoutInfo: _nativeKeymap.IKeyboardLayoutInfo | null;
	private _rawMapping: _nativeKeymap.IKeyboardMapping | null;
	private _keyboardMapper: IKeyboardMapper | null;
	private _initialized: boolean;

	private readonly _onDidChangeKeyboardMapper = new Emitter<void>();
	public readonly onDidChangeKeyboardMapper: Event<void> = this._onDidChangeKeyboardMapper.event;

	private constructor() {
		this._layoutInfo = null;
		this._rawMapping = null;
		this._keyboardMapper = null;
		this._initialized = false;
	}

	public _onKeyboardLayoutChanged(): void {
		if (this._initialized) {
			this._setKeyboardData(nativeKeymap.getCurrentKeyboardLayout(), nativeKeymap.getKeyMap());
		}
	}

	public getKeyboardMapper(dispatchConfig: DispatchConfig): IKeyboardMapper {
		if (!this._initialized) {
			this._setKeyboardData(nativeKeymap.getCurrentKeyboardLayout(), nativeKeymap.getKeyMap());
		}
		if (dispatchConfig === DispatchConfig.KeyCode) {
			// Forcefully set to use keyCode
			return new MacLinuxFallbackKeyboardMapper(OS);
		}
		return this._keyboardMapper!;
	}

	public getCurrentKeyboardLayout(): _nativeKeymap.IKeyboardLayoutInfo | null {
		if (!this._initialized) {
			this._setKeyboardData(nativeKeymap.getCurrentKeyboardLayout(), nativeKeymap.getKeyMap());
		}
		return this._layoutInfo;
	}

	private static _isUSStandard(_kbInfo: _nativeKeymap.IKeyboardLayoutInfo): boolean {
		if (OS === OperatingSystem.Linux) {
			const kbInfo = <_nativeKeymap.ILinuxKeyboardLayoutInfo>_kbInfo;
			return (kbInfo && kbInfo.layout === 'us');
		}

		if (OS === OperatingSystem.Macintosh) {
			const kbInfo = <_nativeKeymap.IMacKeyboardLayoutInfo>_kbInfo;
			return (kbInfo && kbInfo.id === 'com.apple.keylayout.US');
		}

		if (OS === OperatingSystem.Windows) {
			const kbInfo = <_nativeKeymap.IWindowsKeyboardLayoutInfo>_kbInfo;
			return (kbInfo && kbInfo.name === '00000409');
		}

		return false;
	}

	public getRawKeyboardMapping(): _nativeKeymap.IKeyboardMapping | null {
		if (!this._initialized) {
			this._setKeyboardData(nativeKeymap.getCurrentKeyboardLayout(), nativeKeymap.getKeyMap());
		}
		return this._rawMapping;
	}

	private _setKeyboardData(layoutInfo: _nativeKeymap.IKeyboardLayoutInfo, rawMapping: _nativeKeymap.IKeyboardMapping): void {
		this._layoutInfo = layoutInfo;

		if (this._initialized && KeyboardMapperFactory._equals(this._rawMapping, rawMapping)) {
			// nothing to do...
			return;
		}

		this._initialized = true;
		this._rawMapping = rawMapping;
		this._keyboardMapper = new CachedKeyboardMapper(
			KeyboardMapperFactory._createKeyboardMapper(this._layoutInfo, this._rawMapping)
		);
		this._onDidChangeKeyboardMapper.fire();
	}

	private static _createKeyboardMapper(layoutInfo: _nativeKeymap.IKeyboardLayoutInfo, rawMapping: _nativeKeymap.IKeyboardMapping): IKeyboardMapper {
		const isUSStandard = KeyboardMapperFactory._isUSStandard(layoutInfo);
		if (OS === OperatingSystem.Windows) {
			return new WindowsKeyboardMapper(isUSStandard, <IWindowsKeyboardMapping>rawMapping);
		}

		if (Object.keys(rawMapping).length === 0) {
			// Looks like reading the mappings failed (most likely Mac + Japanese/Chinese keyboard layouts)
			return new MacLinuxFallbackKeyboardMapper(OS);
		}

		if (OS === OperatingSystem.Macintosh) {
			const kbInfo = <_nativeKeymap.IMacKeyboardLayoutInfo>layoutInfo;
			if (kbInfo.id === 'com.apple.keylayout.DVORAK-QWERTYCMD') {
				// Use keyCode based dispatching for DVORAK - QWERTY ⌘
				return new MacLinuxFallbackKeyboardMapper(OS);
			}
		}

		return new MacLinuxKeyboardMapper(isUSStandard, <IMacLinuxKeyboardMapping>rawMapping, OS);
	}

	private static _equals(a: _nativeKeymap.IKeyboardMapping | null, b: _nativeKeymap.IKeyboardMapping | null): boolean {
		if (OS === OperatingSystem.Windows) {
			return windowsKeyboardMappingEquals(<IWindowsKeyboardMapping>a, <IWindowsKeyboardMapping>b);
		}

		return macLinuxKeyboardMappingEquals(<IMacLinuxKeyboardMapping>a, <IMacLinuxKeyboardMapping>b);
	}
}

export const enum DispatchConfig {
	Code,
	KeyCode
}

export class WorkbenchKeybindingService extends AbstractKeybindingService {

	private keyboardMapper_: IKeyboardMapper;
	private cachedResolver_: KeybindingResolver | null;
	
	constructor(
		@IContextKeyService contextKeyService: IContextKeyService,
		@ICommandService commandService: ICommandService,
		@INotificationService notificationService: INotificationService
	) {
		super(contextKeyService, commandService, notificationService);

		this.keyboardMapper_ = KeyboardMapperFactory.INSTANCE.getKeyboardMapper(DispatchConfig.KeyCode);
		// TODO: onDidChangeKeyboardMapper

		this.cachedResolver_ = null;

	}

	protected _documentHasFocus() {
		return true;
	}

	protected _getResolver(): KeybindingResolver {
		if (!this.cachedResolver_) {
			const defaults = this._resolveKeybindingItems(KeybindingsRegistry.getDefaultKeybindings(), true);
			this.cachedResolver_ = new KeybindingResolver(defaults, []);
		}
		return this.cachedResolver_;
	}

	private _resolveKeybindingItems(items: IKeybindingItem[], isDefault: boolean): ResolvedKeybindingItem[] {
		let result: ResolvedKeybindingItem[] = [];
		let resultLen = 0;
		for (const item of items) {
			const when = (item.when ? item.when.normalize() : undefined);
			const keybinding = item.keybinding;
			if (!keybinding) {
				// This might be a removal keybinding item in user settings => accept it
				result[resultLen++] = new ResolvedKeybindingItem(null, item.command, item.commandArgs, when, isDefault);
			} else {
				const resolvedKeybindings = this.resolveKeybinding(keybinding);
				for (const resolvedKeybinding of resolvedKeybindings) {
					result[resultLen++] = new ResolvedKeybindingItem(resolvedKeybinding, item.command, item.commandArgs, when, isDefault);
				}
			}
		}

		return result;
	}

	resolveKeybinding(kb: Keybinding): ResolvedKeybinding[] {
		return this.keyboardMapper_.resolveKeybinding(kb);
	}

	resolveKeyboardEvent(keyboardEvent: IKeyboardEvent): ResolvedKeybinding {
		return this.keyboardMapper_.resolveKeyboardEvent(keyboardEvent);
	}

	resolveUserBinding(userBinding: string): ResolvedKeybinding[] {
		// TODO
		// const parts = KeybindingParser.parseUserBinding(userBinding);
		// return this._keyboardMapper.resolveUserBinding(parts);
		return [];
	}

	_dumpDebugInfo(): string {
		const layoutInfo = JSON.stringify(KeyboardMapperFactory.INSTANCE.getCurrentKeyboardLayout(), null, '\t');
		const mapperInfo = this.keyboardMapper_.dumpDebugInfo();
		const rawMapping = JSON.stringify(KeyboardMapperFactory.INSTANCE.getRawKeyboardMapping(), null, '\t');
		return `Layout info:\n${layoutInfo}\n${mapperInfo}\n\nRaw mapping:\n${rawMapping}`;
	}

}

registerSingleton(IKeybindingService, WorkbenchKeybindingService);