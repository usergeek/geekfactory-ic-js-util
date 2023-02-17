import {formatCyclesShort} from "./formatCyclesUtils";

describe("FormatCyclesUtils", () => {
    it("formatCyclesShort", () => {
        expect(formatCyclesShort(1)).toEqual("1")
        expect(formatCyclesShort(1e3)).toEqual("1 K")
        expect(formatCyclesShort(1.23e3, {maximumFractionDigits: 2})).toEqual("1.23 K")
        expect(formatCyclesShort(1e6)).toEqual("1 M")
        expect(formatCyclesShort(1.23e6, {maximumFractionDigits: 2})).toEqual("1.23 M")
        expect(formatCyclesShort(1e9)).toEqual("1 B")
        expect(formatCyclesShort(1e9, {billionAsTrillion: true})).toEqual("0.001 T")
        expect(formatCyclesShort(1.23e9, {maximumFractionDigits: 2})).toEqual("1.23 B")
        expect(formatCyclesShort(1.23456e9, {billionAsTrillion: true})).toEqual("0.001 T")
        expect(formatCyclesShort(1.23456e9, {maximumFractionDigits: 6, billionAsTrillion: true})).toEqual("0.001235 T")
        expect(formatCyclesShort(1e12)).toEqual("1 T")
        expect(formatCyclesShort(1e12, {addUnit: false})).toEqual("1")
        expect(formatCyclesShort(1e12, {addUnit: true, unitSeparator: ""})).toEqual("1T")
        expect(formatCyclesShort(1.23456e12)).toEqual("1.235 T")
        expect(formatCyclesShort(1.23456e12, {maximumFractionDigits: 2})).toEqual("1.23 T")
        expect(formatCyclesShort(1.23456e9, {maximumFractionDigits: 6, billionAsTrillion: true})).toEqual("0.001235 T")
    })
});