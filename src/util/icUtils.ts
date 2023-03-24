import _ from "lodash"
import crc from 'crc';
import {Principal} from "@dfinity/principal";
import {sha224} from "@dfinity/principal/lib/esm/utils/sha224";
import {getCrc32} from "@dfinity/principal/lib/esm/utils/getCrc";

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
const calculateCrc32 = (bytes: Uint8Array): Uint8Array => {
    const checksumArrayBuf = new ArrayBuffer(4);
    const view = new DataView(checksumArrayBuf);
    view.setUint32(0, crc.crc32(Buffer.from(bytes)), false);
    return Buffer.from(checksumArrayBuf);
};

export const toHexString = (byteArray: Uint8Array | Array<number>): string => {
    return Array.from(byteArray, function (byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
    }).join('')
}

const to32bits = (num: number): Array<number> => {
    let b = new ArrayBuffer(4);
    new DataView(b).setUint32(0, num);
    return Array.from(new Uint8Array(b));
}

const getSubAccountArray = (s: Array<number> | number) => {
    if (Array.isArray(s)) {
        return s.concat(Array(32 - s.length).fill(0));
    } else {
        //32bit number only
        return Array(28).fill(0).concat(to32bits(s ? s : 0))
    }
};

////////////////////////////////////////////////
// Account Identifier
////////////////////////////////////////////////

export const principalToAccountIdentifier = (principal: string, s: Array<number> | number): string => {
    const padding = new Buffer("\x0Aaccount-id");
    const array = new Uint8Array([
        ...padding,
        ...Principal.fromText(principal).toUint8Array(),
        ...getSubAccountArray(s)
    ]);
    const hash = sha224(array);
    const checksum = to32bits(getCrc32(hash));
    const array2 = new Uint8Array([
        ...checksum,
        ...hash
    ]);
    return toHexString(array2);
};

export const isAccountIdentifierValid = (accountIdentifier: string | undefined) => {
    if (accountIdentifier !== undefined && !_.isEmpty(accountIdentifier)) {
        if (accountIdentifier.length === 64 && isHex(accountIdentifier)) {
            const toAccountBytes = Buffer.from(accountIdentifier, "hex");
            const foundChecksum = toAccountBytes.slice(0, 4);
            const expectedChecksum = Buffer.from(
                calculateCrc32(toAccountBytes.slice(4))
            );
            const equals = expectedChecksum.equals(foundChecksum);
            if (equals) {
                return true
            }
            if (_.isFinite(_.toNumber(accountIdentifier))) {
                return true
            }
        }
    }
    return false
}

export const accountIdentifierToBytes = (accountIdentifier: string): Uint8Array => {
    return Uint8Array.from(Buffer.from(accountIdentifier, "hex"))
}

////////////////////////////////////////////////
// Principal
////////////////////////////////////////////////

const getPrincipalLastByte = (principal: Principal): number | undefined => {
    try {
        const uint8Array = principal.toUint8Array();
        return uint8Array[uint8Array.length - 1]
    } catch (e) {
        return undefined
    }
}

export const isPrincipalValid = (principalText: string | undefined): boolean => {
    if (!_.isEmpty(principalText)) {
        try {
            Principal.fromText(principalText!)
            return true
        } catch (e) {
        }
    }
    return false
};

export const isCanisterPrincipal = (principal: Principal): boolean => {
    const principalLastByte = getPrincipalLastByte(principal);
    return principalLastByte === 1
};

export const isSelfAuthenticatingPrincipal = (principal: Principal): boolean => {
    const principalLastByte = getPrincipalLastByte(principal);
    return principalLastByte === 2
};

export const isSelfAuthenticatingPrincipalValid = (principalText: string | undefined): boolean => {
    try {
        return isSelfAuthenticatingPrincipal(Principal.fromText(`${principalText}`))
    } catch (e) {
        return false
    }
};

export const isCanisterPrincipalValid = (principalText: string | undefined): boolean => {
    try {
        return isCanisterPrincipal(Principal.fromText(`${principalText}`))
    } catch (e) {
        return false
    }
};

////////////////////////////////////////////////
// XDR Permyriad
////////////////////////////////////////////////

/**
 * Convert xdrPermyriadPerICP to human-readable ICP value. E.g. 63990 to 6.3990 in ICP
 * @param {bigint} xdrPermyriadPerICP
 */
const xdrPermyriadPerICPToICP = (xdrPermyriadPerICP: bigint): number => Number(xdrPermyriadPerICP) / 10_000
