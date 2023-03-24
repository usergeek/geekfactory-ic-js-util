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
export declare const e8sToICP: (value: bigint, multiplier?: number) => number;
/**
 * Convert ICP to e8s
 * @param value The value in ICP as regular float number.
 * @return {bigint} The value in e8s.
 * @example icpToE8S(1) // 100000000n
 * @example icpToE8S(0.5) // 50000000n
 */
export declare const icpToE8S: (value: number) => bigint;
/**
 * Convert ICP to ICP with correct rounding. This is needed because one e8 is the smallest partition of an ICP token.
 * @param value The value in ICP as regular float number.
 * @return {number} The value in ICP.
 * @example icpToICPCorrect(1.0000001) // 1.00000010
 */
export declare const icpToICPCorrect: (value: number) => number;
