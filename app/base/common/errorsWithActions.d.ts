import { IAction } from 'base/common/actions';
export interface IErrorOptions {
    actions?: IAction[];
}
export interface IErrorWithActions {
    actions?: IAction[];
}
export declare function isErrorWithActions(obj: any): obj is IErrorWithActions;
export declare function createErrorWithActions(message: string, options?: IErrorOptions): Error & IErrorWithActions;
