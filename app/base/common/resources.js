/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
import * as extpath from 'base/common/extpath';
import * as paths from 'base/common/path';
import { URI } from 'base/common/uri';
import { equalsIgnoreCase } from 'base/common/strings';
import { Schemas } from 'base/common/network';
import { isLinux, isWindows } from 'base/common/platform';
import { CharCode } from 'base/common/charCode';
import { parse } from 'base/common/glob';
import { TernarySearchTree } from 'base/common/map';
export function getComparisonKey(resource) {
    return hasToIgnoreCase(resource) ? resource.toString().toLowerCase() : resource.toString();
}
export function hasToIgnoreCase(resource) {
    // A file scheme resource is in the same platform as code, so ignore case for non linux platforms
    // Resource can be from another platform. Lowering the case as an hack. Should come from File system provider
    return resource && resource.scheme === Schemas.file ? !isLinux : true;
}
export function basenameOrAuthority(resource) {
    return basename(resource) || resource.authority;
}
/**
 * Tests whether a `candidate` URI is a parent or equal of a given `base` URI.
 * @param base A uri which is "longer"
 * @param parentCandidate A uri which is "shorter" then `base`
 */
export function isEqualOrParent(base, parentCandidate, ignoreCase = hasToIgnoreCase(base)) {
    if (base.scheme === parentCandidate.scheme) {
        if (base.scheme === Schemas.file) {
            return extpath.isEqualOrParent(originalFSPath(base), originalFSPath(parentCandidate), ignoreCase);
        }
        if (isEqualAuthority(base.authority, parentCandidate.authority)) {
            return extpath.isEqualOrParent(base.path, parentCandidate.path, ignoreCase, '/');
        }
    }
    return false;
}
/**
 * Tests wheter the two authorities are the same
 */
export function isEqualAuthority(a1, a2) {
    return a1 === a2 || equalsIgnoreCase(a1, a2);
}
export function isEqual(first, second, ignoreCase = hasToIgnoreCase(first)) {
    if (first === second) {
        return true;
    }
    if (!first || !second) {
        return false;
    }
    if (first.scheme !== second.scheme || !isEqualAuthority(first.authority, second.authority)) {
        return false;
    }
    const p1 = first.path || '/', p2 = second.path || '/';
    return p1 === p2 || ignoreCase && equalsIgnoreCase(p1 || '/', p2 || '/');
}
export function basename(resource) {
    return paths.posix.basename(resource.path);
}
export function extname(resource) {
    return paths.posix.extname(resource.path);
}
/**
 * Return a URI representing the directory of a URI path.
 *
 * @param resource The input URI.
 * @returns The URI representing the directory of the input URI.
 */
export function dirname(resource) {
    if (resource.path.length === 0) {
        return resource;
    }
    if (resource.scheme === Schemas.file) {
        return URI.file(paths.dirname(originalFSPath(resource)));
    }
    let dirname = paths.posix.dirname(resource.path);
    if (resource.authority && dirname.length && dirname.charCodeAt(0) !== CharCode.Slash) {
        console.error(`dirname("${resource.toString})) resulted in a relative path`);
        dirname = '/'; // If a URI contains an authority component, then the path component must either be empty or begin with a CharCode.Slash ("/") character
    }
    return resource.with({
        path: dirname
    });
}
/**
 * Join a URI path with path fragments and normalizes the resulting path.
 *
 * @param resource The input URI.
 * @param pathFragment The path fragment to add to the URI path.
 * @returns The resulting URI.
 */
export function joinPath(resource, ...pathFragment) {
    let joinedPath;
    if (resource.scheme === Schemas.file) {
        joinedPath = URI.file(paths.join(originalFSPath(resource), ...pathFragment)).path;
    }
    else {
        joinedPath = paths.posix.join(resource.path || '/', ...pathFragment);
    }
    return resource.with({
        path: joinedPath
    });
}
/**
 * Normalizes the path part of a URI: Resolves `.` and `..` elements with directory names.
 *
 * @param resource The URI to normalize the path.
 * @returns The URI with the normalized path.
 */
export function normalizePath(resource) {
    if (!resource.path.length) {
        return resource;
    }
    let normalizedPath;
    if (resource.scheme === Schemas.file) {
        normalizedPath = URI.file(paths.normalize(originalFSPath(resource))).path;
    }
    else {
        normalizedPath = paths.posix.normalize(resource.path);
    }
    return resource.with({
        path: normalizedPath
    });
}
/**
 * Returns the fsPath of an URI where the drive letter is not normalized.
 * See #56403.
 */
export function originalFSPath(uri) {
    let value;
    const uriPath = uri.path;
    if (uri.authority && uriPath.length > 1 && uri.scheme === 'file') {
        // unc path: file://shares/c$/far/boo
        value = `//${uri.authority}${uriPath}`;
    }
    else if (isWindows
        && uriPath.charCodeAt(0) === CharCode.Slash
        && extpath.isWindowsDriveLetter(uriPath.charCodeAt(1))
        && uriPath.charCodeAt(2) === CharCode.Colon) {
        value = uriPath.substr(1);
    }
    else {
        // other path
        value = uriPath;
    }
    if (isWindows) {
        value = value.replace(/\//g, '\\');
    }
    return value;
}
/**
 * Returns true if the URI path is absolute.
 */
export function isAbsolutePath(resource) {
    return !!resource.path && resource.path[0] === '/';
}
/**
 * Returns true if the URI path has a trailing path separator
 */
export function hasTrailingPathSeparator(resource) {
    if (resource.scheme === Schemas.file) {
        const fsp = originalFSPath(resource);
        return fsp.length > extpath.getRoot(fsp).length && fsp[fsp.length - 1] === paths.sep;
    }
    else {
        const p = resource.path;
        return p.length > 1 && p.charCodeAt(p.length - 1) === CharCode.Slash; // ignore the slash at offset 0
    }
}
/**
 * Removes a trailing path seperator, if theres one.
 * Important: Doesn't remove the first slash, it would make the URI invalid
 */
export function removeTrailingPathSeparator(resource) {
    if (hasTrailingPathSeparator(resource)) {
        return resource.with({ path: resource.path.substr(0, resource.path.length - 1) });
    }
    return resource;
}
/**
 * Returns a relative path between two URIs. If the URIs don't have the same schema or authority, `undefined` is returned.
 * The returned relative path always uses forward slashes.
 */
export function relativePath(from, to) {
    if (from.scheme !== to.scheme || !isEqualAuthority(from.authority, to.authority)) {
        return undefined;
    }
    if (from.scheme === Schemas.file) {
        const relativePath = paths.relative(from.path, to.path);
        return isWindows ? extpath.toSlashes(relativePath) : relativePath;
    }
    return paths.posix.relative(from.path || '/', to.path || '/');
}
/**
 * Resolves a absolute or relative path against a base URI.
 */
export function resolvePath(base, path) {
    if (base.scheme === Schemas.file) {
        const newURI = URI.file(paths.resolve(originalFSPath(base), path));
        return base.with({
            authority: newURI.authority,
            path: newURI.path
        });
    }
    return base.with({
        path: paths.posix.resolve(base.path, path)
    });
}
export function distinctParents(items, resourceAccessor) {
    const distinctParents = [];
    for (let i = 0; i < items.length; i++) {
        const candidateResource = resourceAccessor(items[i]);
        if (items.some((otherItem, index) => {
            if (index === i) {
                return false;
            }
            return isEqualOrParent(candidateResource, resourceAccessor(otherItem));
        })) {
            continue;
        }
        distinctParents.push(items[i]);
    }
    return distinctParents;
}
/**
 * Data URI related helpers.
 */
export var DataUri;
(function (DataUri) {
    DataUri.META_DATA_LABEL = 'label';
    DataUri.META_DATA_DESCRIPTION = 'description';
    DataUri.META_DATA_SIZE = 'size';
    DataUri.META_DATA_MIME = 'mime';
    function parseMetaData(dataUri) {
        const metadata = new Map();
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the metadata is: size:2313;label:SomeLabel;description:SomeDescription
        const meta = dataUri.path.substring(dataUri.path.indexOf(';') + 1, dataUri.path.lastIndexOf(';'));
        meta.split(';').forEach(property => {
            const [key, value] = property.split(':');
            if (key && value) {
                metadata.set(key, value);
            }
        });
        // Given a URI of:  data:image/png;size:2313;label:SomeLabel;description:SomeDescription;base64,77+9UE5...
        // the mime is: image/png
        const mime = dataUri.path.substring(0, dataUri.path.indexOf(';'));
        if (mime) {
            metadata.set(DataUri.META_DATA_MIME, mime);
        }
        return metadata;
    }
    DataUri.parseMetaData = parseMetaData;
})(DataUri || (DataUri = {}));
export class ResourceGlobMatcher {
    constructor(globalExpression, rootExpressions) {
        this.expressionsByRoot = TernarySearchTree.forPaths();
        this.globalExpression = parse(globalExpression);
        for (const expression of rootExpressions) {
            this.expressionsByRoot.set(expression.root.toString(), { root: expression.root, expression: parse(expression.expression) });
        }
    }
    matches(resource) {
        const rootExpression = this.expressionsByRoot.findSubstr(resource.toString());
        if (rootExpression) {
            const path = relativePath(rootExpression.root, resource);
            if (path && !!rootExpression.expression(path)) {
                return true;
            }
        }
        return !!this.globalExpression(resource.path);
    }
}
export function toLocalResource(resource, authority) {
    if (authority) {
        let path = resource.path;
        if (path && path[0] !== paths.posix.sep) {
            path = paths.posix.sep + path;
        }
        return resource.with({ scheme: Schemas.vscodeRemote, authority, path });
    }
    return resource.with({ scheme: Schemas.file });
}
//# sourceMappingURL=resources.js.map