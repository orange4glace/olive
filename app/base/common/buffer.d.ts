export declare const hasBuffer: boolean;
export declare class VSBuffer {
    static alloc(byteLength: number): VSBuffer;
    static wrap(actual: Uint8Array): VSBuffer;
    static fromString(source: string): VSBuffer;
    static concat(buffers: VSBuffer[], totalLength?: number): VSBuffer;
    readonly buffer: Uint8Array;
    readonly byteLength: number;
    private constructor();
    toString(): string;
    slice(start?: number, end?: number): VSBuffer;
    set(array: VSBuffer, offset?: number): void;
    readUint32BE(offset: number): number;
    writeUint32BE(value: number, offset: number): void;
    readUint8(offset: number): number;
    writeUint8(value: number, offset: number): void;
}
export interface VSBufferReadable {
    /**
     * Read data from the underlying source. Will return
     * null to indicate that no more data can be read.
     */
    read(): VSBuffer | null;
}
/**
 * Helper to fully read a VSBuffer readable into a single buffer.
 */
export declare function readableToBuffer(readable: VSBufferReadable): VSBuffer;
/**
 * Helper to convert a buffer into a readable buffer.
 */
export declare function bufferToReadable(buffer: VSBuffer): VSBufferReadable;
