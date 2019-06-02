/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
export const hasBuffer = (typeof Buffer !== 'undefined');
let textEncoder;
let textDecoder;
export class VSBuffer {
    static alloc(byteLength) {
        if (hasBuffer) {
            return new VSBuffer(Buffer.allocUnsafe(byteLength));
        }
        else {
            return new VSBuffer(new Uint8Array(byteLength));
        }
    }
    static wrap(actual) {
        if (hasBuffer && !(Buffer.isBuffer(actual))) {
            // https://nodejs.org/dist/latest-v10.x/docs/api/buffer.html#buffer_class_method_buffer_from_arraybuffer_byteoffset_length
            // Create a zero-copy Buffer wrapper around the ArrayBuffer pointed to by the Uint8Array
            actual = Buffer.from(actual.buffer, actual.byteOffset, actual.byteLength);
        }
        return new VSBuffer(actual);
    }
    static fromString(source) {
        if (hasBuffer) {
            return new VSBuffer(Buffer.from(source));
        }
        else {
            if (!textEncoder) {
                textEncoder = new TextEncoder();
            }
            return new VSBuffer(textEncoder.encode(source));
        }
    }
    static concat(buffers, totalLength) {
        if (typeof totalLength === 'undefined') {
            totalLength = 0;
            for (let i = 0, len = buffers.length; i < len; i++) {
                totalLength += buffers[i].byteLength;
            }
        }
        const ret = VSBuffer.alloc(totalLength);
        let offset = 0;
        for (let i = 0, len = buffers.length; i < len; i++) {
            const element = buffers[i];
            ret.set(element, offset);
            offset += element.byteLength;
        }
        return ret;
    }
    constructor(buffer) {
        this.buffer = buffer;
        this.byteLength = this.buffer.byteLength;
    }
    toString() {
        if (hasBuffer) {
            return this.buffer.toString();
        }
        else {
            if (!textDecoder) {
                textDecoder = new TextDecoder();
            }
            return textDecoder.decode(this.buffer);
        }
    }
    slice(start, end) {
        return new VSBuffer(this.buffer.slice(start, end));
    }
    set(array, offset) {
        this.buffer.set(array.buffer, offset);
    }
    readUint32BE(offset) {
        return readUint32BE(this.buffer, offset);
    }
    writeUint32BE(value, offset) {
        writeUint32BE(this.buffer, value, offset);
    }
    readUint8(offset) {
        return readUint8(this.buffer, offset);
    }
    writeUint8(value, offset) {
        writeUint8(this.buffer, value, offset);
    }
}
function readUint32BE(source, offset) {
    return (source[offset] * Math.pow(2, 24)
        + source[offset + 1] * Math.pow(2, 16)
        + source[offset + 2] * Math.pow(2, 8)
        + source[offset + 3]);
}
function writeUint32BE(destination, value, offset) {
    destination[offset + 3] = value;
    value = value >>> 8;
    destination[offset + 2] = value;
    value = value >>> 8;
    destination[offset + 1] = value;
    value = value >>> 8;
    destination[offset] = value;
}
function readUint8(source, offset) {
    return source[offset];
}
function writeUint8(destination, value, offset) {
    destination[offset] = value;
}
/**
 * Helper to fully read a VSBuffer readable into a single buffer.
 */
export function readableToBuffer(readable) {
    const chunks = [];
    let chunk;
    while (chunk = readable.read()) {
        chunks.push(chunk);
    }
    return VSBuffer.concat(chunks);
}
/**
 * Helper to convert a buffer into a readable buffer.
 */
export function bufferToReadable(buffer) {
    let done = false;
    return {
        read: () => {
            if (done) {
                return null;
            }
            done = true;
            return buffer;
        }
    };
}
//# sourceMappingURL=buffer.js.map