import { FormatNumericValueShortOptions } from "geekfactory-js-util";
type FormatCyclesShortOptions = FormatNumericValueShortOptions & {
    billionAsTrillion?: boolean;
    addUnit?: boolean;
};
/**
 * Format cycles and return a string based on passed number
 * @param {bigint | number} value number of cycles to format
 * @param {FormatCyclesShortOptions | undefined} options options for formatting. Defaults to {billionAsTrillion: true, addUnit: true, unitSeparator: " ", maximumFractionDigits: 3, prefixOverride: {1e9: "B"}}.
 * @return Formatted number
 * @example formatCyclesShort(1e12) => "1T"
 * @example formatCyclesShort(1.23e12, 2) => "1.23T"
 * @example formatCyclesShort(1.23e9, 2) => "1.23B"
 * @example formatCyclesShort(1.23e9, 2, {billionAsTrillion:true}) => "1.23T"
 */
export declare const formatCyclesShort: (value: bigint | number, options?: FormatCyclesShortOptions) => string;
export {};
