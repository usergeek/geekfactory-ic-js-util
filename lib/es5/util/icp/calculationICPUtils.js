"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.icpToICPCorrect = exports.icpToE8S = exports.e8sToICP = void 0;
const valueToBaseWithDecimals = (value, decimals) => value / Math.pow(10, decimals);
/**
 * Convert e8s to ICP
 * @param value The value in e8s.
 * @param multiplier The multiplier to apply to the value before converting to ICP.
 * @return {number} The value in ICP.
 * @see https://internetcomputer.org/docs/current/references/cli-reference/dfx-ledger#options
 * @example e8sToICP(100000000n) // 1
 * @example e8sToICP(100000000n, 2) // 2
 * @example e8sToICP(100000000n, 0.5) // 0.5
 */
const e8sToICP = (value, multiplier = 1) => {
    if (multiplier != 1) {
        const hugeFloat = valueToBaseWithDecimals(Number(value) * multiplier, 8);
        const e8sRoundedInt = (0, exports.icpToE8S)(hugeFloat);
        return (0, exports.e8sToICP)(e8sRoundedInt);
    }
    return valueToBaseWithDecimals(Number(value), 8);
};
exports.e8sToICP = e8sToICP;
/**
 * Convert ICP to e8s
 * @param value The value in ICP as regular float number.
 * @return {bigint} The value in e8s.
 * @example icpToE8S(1) // 100000000n
 * @example icpToE8S(0.5) // 50000000n
 */
const icpToE8S = (value) => BigInt(Math.round(valueToBaseWithDecimals(value, -8)));
exports.icpToE8S = icpToE8S;
/**
 * Convert ICP to ICP with correct rounding. This is needed because one e8 is the smallest partition of an ICP token.
 * @param value The value in ICP as regular float number.
 * @return {number} The value in ICP.
 * @example icpToICPCorrect(1.0000001) // 1.00000010
 */
const icpToICPCorrect = (value) => (0, exports.e8sToICP)((0, exports.icpToE8S)(value));
exports.icpToICPCorrect = icpToICPCorrect;
//# sourceMappingURL=calculationICPUtils.js.map