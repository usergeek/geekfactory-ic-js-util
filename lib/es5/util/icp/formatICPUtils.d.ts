export type FormatNumberToMaximumDigitsOptions = {
    maximumDigits?: number;
    thousandSeparator?: string;
};
/**
 * Format number to have a total maximum number of digits.
 * If whole number part length is greater than maximumDigits, then the result is whole part of a number.
 * If whole number part length is less than maximumDigits, then the result is whole part of a number with decimal part rounded.
 * @param {number} value - number to format
 * @param {FormatNumberToMaximumDigitsOptions | undefined} options - options. Default value is {maximumDigits: 3, thousandSeparator: " "}
 * @return {string} formatted number
 */
export declare const formatNumberToMaximumDigits: (value: number, options?: FormatNumberToMaximumDigitsOptions) => string;
