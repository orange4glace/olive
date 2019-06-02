export declare enum ValidationState {
    OK = 0,
    Info = 1,
    Warning = 2,
    Error = 3,
    Fatal = 4
}
export declare class ValidationStatus {
    private _state;
    constructor();
    state: ValidationState;
    isOK(): boolean;
    isFatal(): boolean;
}
export interface IProblemReporter {
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
    status: ValidationStatus;
}
export declare abstract class Parser {
    private _problemReporter;
    constructor(problemReporter: IProblemReporter);
    reset(): void;
    readonly problemReporter: IProblemReporter;
    info(message: string): void;
    warn(message: string): void;
    error(message: string): void;
    fatal(message: string): void;
    protected static merge<T>(destination: T, source: T, overwrite: boolean): void;
}
