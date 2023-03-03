import {FormatNumericValueShortOptions, getNumericValueShort, NumericValueShort, roundNumber, SI_PREFIX_TERA} from "geekfactory-js-util";

////////////////////////////////////////////////
// formatCyclesShort
////////////////////////////////////////////////

type FormatCyclesShortOptions = FormatNumericValueShortOptions & {
    billionAsTrillion?: boolean
    addUnit?: boolean
}

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
export const formatCyclesShort = (value: bigint | number, options?: FormatCyclesShortOptions): string => {
    const {billionAsTrillion = true, addUnit = true, unitSeparator = " ", maximumFractionDigits, prefixOverride = {1e9: "B"}} = options || {}

    const defaultMaximumFractionDigits = maximumFractionDigits == undefined ? 3 : maximumFractionDigits

    const numericValueShort: NumericValueShort = getNumericValueShort(Number(value), {
        maximumFractionDigits: defaultMaximumFractionDigits,
        prefixOverride
    });
    let newShortValue = numericValueShort.shortValue;
    if (billionAsTrillion && numericValueShort.divider === 1e9) {
        // 1e9 is a billion, but we want to show it as a trillion
        // defaultMaximumFractionDigits is 3
        newShortValue = roundNumber(newShortValue / 1e3, defaultMaximumFractionDigits)
        numericValueShort.prefix = prefixOverride[1e12] == undefined ? SI_PREFIX_TERA : prefixOverride[1e12]
    } else if (numericValueShort.divider === 1e6) {
        // defaultMaximumFractionDigits is 0 for millions
        newShortValue = roundNumber(newShortValue, maximumFractionDigits == undefined ? 0 : maximumFractionDigits)
    } else if (numericValueShort.divider === 1e3) {
        // defaultMaximumFractionDigits is 0 for thousands
        newShortValue = roundNumber(newShortValue, maximumFractionDigits == undefined ? 0 : maximumFractionDigits)
    }
    if (addUnit) {
        if (numericValueShort.prefix.length > 0) {
            return `${newShortValue}${unitSeparator}${numericValueShort.prefix}`
        }
    }
    return `${newShortValue}`
}