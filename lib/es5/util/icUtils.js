"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCanisterPrincipalValid = exports.isSelfAuthenticatingPrincipalValid = exports.isSelfAuthenticatingPrincipal = exports.isCanisterPrincipal = exports.isPrincipalValid = exports.accountIdentifierToBytes = exports.isAccountIdentifierValid = exports.principalToAccountIdentifier = exports.toHexString = void 0;
const lodash_1 = __importDefault(require("lodash"));
const crc_1 = __importDefault(require("crc"));
const principal_1 = require("@dfinity/principal");
const sha224_1 = require("@dfinity/principal/lib/esm/utils/sha224");
const getCrc_1 = require("@dfinity/principal/lib/esm/utils/getCrc");
////////////////////////////////////////////////
// Utils
////////////////////////////////////////////////
const hexRegexp = /^[0-9a-fA-F]+$/;
const isHex = (h) => {
    return hexRegexp.test(h);
};
/**
 * Calculate CRC32 checksum
 * @param {Uint8Array} bytes - bytes to calculate checksum
 * @returns {Uint8Array} - checksum
 */
const calculateCrc32 = (bytes) => {
    const checksumArrayBuf = new ArrayBuffer(4);
    const view = new DataView(checksumArrayBuf);
    view.setUint32(0, crc_1.default.crc32(Buffer.from(bytes)), false);
    return Buffer.from(checksumArrayBuf);
};
const toHexString = (byteArray) => {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('');
};
exports.toHexString = toHexString;
const to32bits = (num) => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
};
const getSubAccountArray = (s) => {
    if (Array.isArray(s)) {
        return s.concat(Array(32 - s.length).fill(0));
    }
    else {
        //32bit number only
        return Array(28).fill(0).concat(to32bits(s ? s : 0));
    }
};
////////////////////////////////////////////////
// Account Identifier
////////////////////////////////////////////////
const principalToAccountIdentifier = (principal, s) => {
    const padding = new Buffer("\x0Aaccount-id");
    const array = new Uint8Array([
        ...padding,
        ...principal_1.Principal.fromText(principal).toUint8Array(),
        ...getSubAccountArray(s)
    ]);
    const hash = (0, sha224_1.sha224)(array);
    const checksum = to32bits((0, getCrc_1.getCrc32)(hash));
    const array2 = new Uint8Array([
        ...checksum,
        ...hash
    ]);
    return (0, exports.toHexString)(array2);
};
exports.principalToAccountIdentifier = principalToAccountIdentifier;
const isAccountIdentifierValid = (accountIdentifier) => {
    if (accountIdentifier !== undefined && !lodash_1.default.isEmpty(accountIdentifier)) {
        if (accountIdentifier.length === 64 && isHex(accountIdentifier)) {
            const toAccountBytes = Buffer.from(accountIdentifier, "hex");
            const foundChecksum = toAccountBytes.slice(0, 4);
            const expectedChecksum = Buffer.from(calculateCrc32(toAccountBytes.slice(4)));
            const equals = expectedChecksum.equals(foundChecksum);
            if (equals) {
                return true;
            }
            if (lodash_1.default.isFinite(lodash_1.default.toNumber(accountIdentifier))) {
                return true;
            }
        }
    }
    return false;
};
exports.isAccountIdentifierValid = isAccountIdentifierValid;
const accountIdentifierToBytes = (accountIdentifier) => {
    return Uint8Array.from(Buffer.from(accountIdentifier, "hex"));
};
exports.accountIdentifierToBytes = accountIdentifierToBytes;
////////////////////////////////////////////////
// Principal
////////////////////////////////////////////////
const getPrincipalLastByte = (principal) => {
    try {
        const uint8Array = principal.toUint8Array();
        return uint8Array[uint8Array.length - 1];
    }
    catch (e) {
        return undefined;
    }
};
const isPrincipalValid = (principalText) => {
    if (!lodash_1.default.isEmpty(principalText)) {
        try {
            principal_1.Principal.fromText(principalText);
            return true;
        }
        catch (e) {
        }
    }
    return false;
};
exports.isPrincipalValid = isPrincipalValid;
const isCanisterPrincipal = (principal) => {
    const principalLastByte = getPrincipalLastByte(principal);
    return principalLastByte === 1;
};
exports.isCanisterPrincipal = isCanisterPrincipal;
const isSelfAuthenticatingPrincipal = (principal) => {
    const principalLastByte = getPrincipalLastByte(principal);
    return principalLastByte === 2;
};
exports.isSelfAuthenticatingPrincipal = isSelfAuthenticatingPrincipal;
const isSelfAuthenticatingPrincipalValid = (principalText) => {
    try {
        return (0, exports.isSelfAuthenticatingPrincipal)(principal_1.Principal.fromText(`${principalText}`));
    }
    catch (e) {
        return false;
    }
};
exports.isSelfAuthenticatingPrincipalValid = isSelfAuthenticatingPrincipalValid;
const isCanisterPrincipalValid = (principalText) => {
    try {
        return (0, exports.isCanisterPrincipal)(principal_1.Principal.fromText(`${principalText}`));
    }
    catch (e) {
        return false;
    }
};
exports.isCanisterPrincipalValid = isCanisterPrincipalValid;
////////////////////////////////////////////////
// XDR Permyriad
////////////////////////////////////////////////
/**
 * Convert xdrPermyriadPerICP to human-readable ICP value. E.g. 63990 to 6.3990 in ICP
 * @param {bigint} xdrPermyriadPerICP
 */
const xdrPermyriadPerICPToICP = (xdrPermyriadPerICP) => Number(xdrPermyriadPerICP) / 10000;
//# sourceMappingURL=icUtils.js.map