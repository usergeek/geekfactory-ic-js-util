"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatNumberToMaximumDigits = void 0;
const geekfactory_js_util_1 = require("geekfactory-js-util");
const FORMAT_NUMBER_TO_MAXIMUM_DIGITS_MAXIMUM_DIGITS = 4;
/**
 * Format number to have a total maximum number of digits.
 * If whole number part length is greater than maximumDigits, then the result is whole part of a number.
 * If whole number part length is less than maximumDigits, then the result is whole part of a number with decimal part rounded.
 * @param {number} value - number to format
 * @param {FormatNumberToMaximumDigitsOptions | undefined} options - options. Default value is {maximumDigits: 3, thousandSeparator: " "}
 * @return {string} formatted number
 */
const formatNumberToMaximumDigits = (value, options) => {
    const { maximumDigits = FORMAT_NUMBER_TO_MAXIMUM_DIGITS_MAXIMUM_DIGITS, thousandSeparator = " " } = options || {};
    let maxDigits = maximumDigits;
    if (maximumDigits <= 0) {
        maxDigits = FORMAT_NUMBER_TO_MAXIMUM_DIGITS_MAXIMUM_DIGITS;
    }
    const wholePart = Math.floor(value);
    const wholePartLength = wholePart.toString().length;
    if (wholePartLength >= maxDigits) {
        return (0, geekfactory_js_util_1.intlFormatNumber)(value, { maximumFractionDigits: 0, thousandSeparator: thousandSeparator });
    }
    const decimalPartDigits = maxDigits - wholePartLength;
    return (0, geekfactory_js_util_1.intlFormatNumber)(value, { maximumFractionDigits: Math.max(0, decimalPartDigits), thousandSeparator: thousandSeparator });
};
exports.formatNumberToMaximumDigits = formatNumberToMaximumDigits;
//# sourceMappingURL=formatICPUtils.js.map