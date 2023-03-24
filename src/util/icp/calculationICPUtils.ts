const valueToBaseWithDecimals = (value: number, decimals: number): number => value / Math.pow(10, decimals);

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
export const e8sToICP = (value: bigint, multiplier: number = 1): number => {
    if (multiplier != 1) {
        const hugeFloat = valueToBaseWithDecimals(Number(value) * multiplier, 8)
        const e8sRoundedInt = icpToE8S(hugeFloat);
        return e8sToICP(e8sRoundedInt)
    }
    return valueToBaseWithDecimals(Number(value), 8)
};

/**
 * Convert ICP to e8s
 * @param value The value in ICP as regular float number.
 * @return {bigint} The value in e8s.
 * @example icpToE8S(1) // 100000000n
 * @example icpToE8S(0.5) // 50000000n
 */
export const icpToE8S = (value: number): bigint => BigInt(Math.round(valueToBaseWithDecimals(value, -8)))

/**
 * Convert ICP to ICP with correct rounding. This is needed because one e8 is the smallest partition of an ICP token.
 * @param value The value in ICP as regular float number.
 * @return {number} The value in ICP.
 * @example icpToICPCorrect(1.0000001) // 1.00000010
 */
export const icpToICPCorrect = (value: number): number => e8sToICP(icpToE8S(value))
