// import { createDecorator } from "platform/instantiation/common/instantiation";

// export const IWidgetGroupsService = createDecorator<IWidgetGroupsService>('olive.WidgetGroupsService');

// export const enum WidgetGroupDirection {
// 	UP,
// 	DOWN,
// 	LEFT,
// 	RIGHT
// }

// export function preferredSideBySideGroupDirection(configurationService: IConfigurationService): WidgetGroupDirection.DOWN | WidgetGroupDirection.RIGHT {
// 	const openSideBySideDirection = configurationService.getValue<'right' | 'down'>('workbench.editor.openSideBySideDirection');

// 	if (openSideBySideDirection === 'down') {
// 		return WidgetGroupDirection.DOWN;
// 	}

// 	return WidgetGroupDirection.RIGHT;
// }

// export const enum WidgetGroupOrientation {
// 	HORIZONTAL,
// 	VERTICAL
// }

// export const enum WidgetGroupLocation {
// 	FIRST,
// 	LAST,
// 	NEXT,
// 	PREVIOUS
// }

// export interface IFindGroupScope {
// 	direction?: WidgetGroupDirection;
// 	location?: WidgetGroupLocation;
// }

// export const enum WidgetGroupsArrangement {

// 	/**
// 	 * Make the current active WidgetGroup consume the maximum
// 	 * amount of space possible.
// 	 */
// 	MINIMIZE_OTHERS,

// 	/**
// 	 * Size all WidgetGroups evenly.
// 	 */
// 	EVEN
// }

// export interface WidgetGroupLayoutArgument {
// 	size?: number;
// 	groups?: WidgetGroupLayoutArgument[];
// }

// export interface EditorGroupLayout {
// 	orientation: WidgetGroupOrientation;
// 	groups: WidgetGroupLayoutArgument[];
// }

// export interface ICloseEditorOptions {
// 	preserveFocus?: boolean;
// }

// export interface IMoveEditorOptions {
// 	index?: number;
// 	inactive?: boolean;
// 	preserveFocus?: boolean;
// }

// export interface ICopyEditorOptions extends IMoveEditorOptions { }

// export interface IAddGroupOptions {
// 	activate?: boolean;
// }

// export const enum MergeGroupMode {
// 	COPY_EDITORS,
// 	MOVE_EDITORS
// }

// export interface IMergeGroupOptions {
// 	mode?: MergeGroupMode;
// 	index?: number;
// }

// export const enum WidgetGroupsOrder {

// 	/**
// 	 * WidgetGroups sorted by creation order (oldest one first)
// 	 */
// 	CREATION_TIME,

// 	/**
// 	 * WidgetGroups sorted by most recent activity (most recent active first)
// 	 */
// 	MOST_RECENTLY_ACTIVE,

// 	/**
// 	 * WidgetGroups sorted by grid widget order
// 	 */
// 	GRID_APPEARANCE
// }

// export const enum EditorsOrder {

// 	/**
// 	 * Editors sorted by most recent activity (most recent active first)
// 	 */
// 	MOST_RECENTLY_ACTIVE,

// 	/**
// 	 * Editors sorted by sequential order
// 	 */
// 	SEQUENTIAL
// }

// export interface IWidgetGroupsService {

// }