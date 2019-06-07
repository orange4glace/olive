import { IStorageService, StorageScope, IWillSaveStateEvent, IWorkspaceStorageChangeEvent } from "platform/storage/common/storage";
import { Event } from "base/common/event";

export class LocalStorageStorageService implements IStorageService {

  _serviceBrand: any;

	readonly onDidChangeStorage: Event<IWorkspaceStorageChangeEvent>;

	readonly onWillSaveState: Event<IWillSaveStateEvent>;

	get(key: string, scope: StorageScope, fallbackValue: string): string;
	get(key: string, scope: StorageScope, fallbackValue?: string): string | undefined {
    return localStorage.getItem(key);
  }

	getBoolean(key: string, scope: StorageScope, fallbackValue: boolean): boolean;
	getBoolean(key: string, scope: StorageScope, fallbackValue?: boolean): boolean | undefined {
    return !!localStorage.getItem(key);
  }

	getNumber(key: string, scope: StorageScope, fallbackValue: number): number;
	getNumber(key: string, scope: StorageScope, fallbackValue?: number): number | undefined {
    return +localStorage.getItem(key);
  }

	store(key: string, value: string | boolean | number | undefined | null, scope: StorageScope): void {
    (window as any).mainConsole.log('store', key, value);
    localStorage.setItem(key, value as any);
  }

	remove(key: string, scope: StorageScope): void {
    localStorage.removeItem(key);
  }

}