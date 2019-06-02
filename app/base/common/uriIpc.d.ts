import { URI, UriComponents } from 'base/common/uri';
export interface IURITransformer {
    transformIncoming(uri: UriComponents): UriComponents;
    transformOutgoing(uri: UriComponents): UriComponents;
    transformOutgoingURI(uri: URI): URI;
}
export declare const DefaultURITransformer: IURITransformer;
export declare function transformOutgoingURIs<T>(obj: T, transformer: IURITransformer): T;
export declare function transformIncomingURIs<T>(obj: T, transformer: IURITransformer): T;
export declare function transformAndReviveIncomingURIs<T>(obj: T, transformer: IURITransformer): T;
