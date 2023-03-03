"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatCyclesShort = void 0;
const geekfactory_js_util_1 = require("geekfactory-js-util");
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
const formatCyclesShort = (value, options) => {
    const { billionAsTrillion = true, addUnit = true, unitSeparator = " ", maximumFractionDigits, prefixOverride = { 1e9: "B" } } = options || {};
    const defaultMaximumFractionDigits = maximumFractionDigits == undefined ? 3 : maximumFractionDigits;
    const numericValueShort = (0, geekfactory_js_util_1.getNumericValueShort)(Number(value), {
        maximumFractionDigits: defaultMaximumFractionDigits,
        prefixOverride
    });
    let newShortValue = numericValueShort.shortValue;
    if (billionAsTrillion && numericValueShort.divider === 1e9) {
        // 1e9 is a billion, but we want to show it as a trillion
        // defaultMaximumFractionDigits is 3
        newShortValue = (0, geekfactory_js_util_1.roundNumber)(newShortValue / 1e3, defaultMaximumFractionDigits);
        numericValueShort.prefix = prefixOverride[1e12] == undefined ? geekfactory_js_util_1.SI_PREFIX_TERA : prefixOverride[1e12];
    }
    else if (numericValueShort.divider === 1e6) {
        // defaultMaximumFractionDigits is 0 for millions
        newShortValue = (0, geekfactory_js_util_1.roundNumber)(newShortValue, maximumFractionDigits == undefined ? 0 : maximumFractionDigits);
    }
    else if (numericValueShort.divider === 1e3) {
        // defaultMaximumFractionDigits is 0 for thousands
        newShortValue = (0, geekfactory_js_util_1.roundNumber)(newShortValue, maximumFractionDigits == undefined ? 0 : maximumFractionDigits);
    }
    if (addUnit) {
        if (numericValueShort.prefix.length > 0) {
            return `${newShortValue}${unitSeparator}${numericValueShort.prefix}`;
        }
    }
    return `${newShortValue}`;
};
exports.formatCyclesShort = formatCyclesShort;
//# sourceMappingURL=formatCyclesUtils.js.map