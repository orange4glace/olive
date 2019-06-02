/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { createDecorator } from 'platform/instantiation/common/instantiation';
import { URI } from 'base/common/uri';

export interface ParsedArgs {
	_: string[];
	'folder-uri'?: string | string[];
	'file-uri'?: string | string[];
	_urls?: string[];
	help?: boolean;
	version?: boolean;
	status?: boolean;
	wait?: boolean;
	waitMarkerFilePath?: string;
	diff?: boolean;
	add?: boolean;
	goto?: boolean;
	'new-window'?: boolean;
	'unity-launch'?: boolean; // Always open a new window, except if opening the first window or opening a file or folder as part of the launch.
	'reuse-window'?: boolean;
	locale?: string;
	'user-data-dir'?: string;
	'prof-startup'?: string;
	'prof-startup-prefix'?: string;
	'prof-append-timers'?: string;
	'prof-modules'?: string;
	verbose?: boolean;
	trace?: boolean;
	'trace-category-filter'?: string;
	'trace-options'?: string;
	log?: string;
	logExtensionHostCommunication?: boolean;
	'extensions-dir'?: string;
	'builtin-extensions-dir'?: string;
	extensionDevelopmentPath?: string | string[]; // one or more local paths or URIs
	extensionTestsPath?: string; // either a local path or a URI
	'inspect-extensions'?: string;
	'inspect-brk-extensions'?: string;
	debugId?: string;
	'inspect-search'?: string;
	'inspect-brk-search'?: string;
	'disable-extensions'?: boolean;
	'disable-extension'?: string | string[];
	'list-extensions'?: boolean;
	'show-versions'?: boolean;
	'install-extension'?: string | string[];
	'uninstall-extension'?: string | string[];
	'locate-extension'?: string | string[];
	'enable-proposed-api'?: string | string[];
	'open-url'?: boolean;
	'skip-getting-started'?: boolean;
	'skip-release-notes'?: boolean;
	'sticky-quickopen'?: boolean;
	'disable-restore-windows'?: boolean;
	'disable-telemetry'?: boolean;
	'export-default-configuration'?: string;
	'install-source'?: string;
	'disable-updates'?: string;
	'disable-crash-reporter'?: string;
	'skip-add-to-recently-opened'?: boolean;
	'max-memory'?: string;
	'file-write'?: boolean;
	'file-chmod'?: boolean;
	'upload-logs'?: string;
	'driver'?: string;
	'driver-verbose'?: boolean;
	remote?: string;
	'nodeless'?: boolean; // TODO@ben revisit electron5 nodeless support
}

export const IEnvironmentService = createDecorator<IEnvironmentService>('environmentService');

export interface IDebugParams {
	port: number | null;
	break: boolean;
}

export interface IExtensionHostDebugParams extends IDebugParams {
	debugId?: string;
}

export interface IEnvironmentService {
	_serviceBrand: any;

	args: ParsedArgs;

	execPath: string;
	cliPath: string;
	appRoot: string;

	userHome: string;
	userDataPath: string;

	appNameLong: string;
	appQuality?: string;
	appSettingsHome: string;
	appSettingsPath: string;
	appKeybindingsPath: string;

	machineSettingsHome: string;
	machineSettingsPath: string;

	settingsSearchBuildId?: number;
	settingsSearchUrl?: string;

	globalStorageHome: string;
	workspaceStorageHome: string;

	backupHome: string;
	backupWorkspacesPath: string;

	untitledWorkspacesHome: URI;

	isExtensionDevelopment: boolean;
	disableExtensions: boolean | string[];
	builtinExtensionsPath: string;
	extensionsPath: string;
	extensionDevelopmentLocationURI?: URI[];
	extensionTestsLocationURI?: URI;

	debugExtensionHost: IExtensionHostDebugParams;
	debugSearch: IDebugParams;

	logExtensionHostCommunication: boolean;

	isBuilt: boolean;
	wait: boolean;
	status: boolean;

	// logging
	log?: string;
	logsPath: string;
	verbose: boolean;

	skipGettingStarted: boolean | undefined;
	skipReleaseNotes: boolean | undefined;

	skipAddToRecentlyOpened: boolean;

	mainIPCHandle: string;
	sharedIPCHandle: string;

	nodeCachedDataDir?: string;

	installSourcePath: string;
	disableUpdates: boolean;
	disableCrashReporter: boolean;

	driverHandle?: string;
	driverVerbose: boolean;
}
