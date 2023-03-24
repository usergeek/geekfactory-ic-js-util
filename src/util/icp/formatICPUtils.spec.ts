import {formatNumberToMaximumDigits} from "./formatICPUtils";
import {e8sToICP} from "./calculationICPUtils";

describe("formatICPUtils", () => {
    describe("formatNumberToMaximumDigits", () => {
        const fn = formatNumberToMaximumDigits
        it("fn", () => {
            expect(fn(0)).toEqual("0")
            expect(fn(0, {maximumDigits: 0})).toEqual("0")
            expect(fn(0, {maximumDigits: 1})).toEqual("0")
            expect(fn(0, {maximumDigits: 2})).toEqual("0")

            expect(fn(0.987654321)).toEqual("0.988")
            expect(fn(0.987654321, {maximumDigits: -1})).toEqual("0.988")
            expect(fn(0.987654321, {maximumDigits: 0})).toEqual("0.988")
            expect(fn(0.987654321, {maximumDigits: 1})).toEqual("1")
            expect(fn(0.987654321, {maximumDigits: 4})).toEqual("0.988")
            expect(fn(0.987654321, {maximumDigits: 5})).toEqual("0.9877")
            expect(fn(0.987654321, {maximumDigits: 6})).toEqual("0.98765")

            expect(fn(7.987654321)).toEqual("7.988")
            expect(fn(7.987654321, {maximumDigits: 1})).toEqual("8")
            expect(fn(7.987654321, {maximumDigits: 6})).toEqual("7.98765")

            expect(fn(12.987654321)).toEqual("12.99")
            expect(fn(12.987654321, {maximumDigits: 1})).toEqual("13")
            expect(fn(12.987654321, {maximumDigits: 6})).toEqual("12.9877")

            expect(fn(123.987654321)).toEqual("124")
            expect(fn(123.987654321, {maximumDigits: 1})).toEqual("124")
            expect(fn(123.987654321, {maximumDigits: 6})).toEqual("123.988")

            expect(fn(1234.987654321)).toEqual("1 235")
            expect(fn(1234.987654321, {maximumDigits: 1})).toEqual("1 235")
            expect(fn(1234.987654321, {maximumDigits: 6})).toEqual("1 234.99")

            expect(fn(e8sToICP(BigInt(500130591324222)), {maximumDigits: 15})).toEqual("5 001 305.91324222")
            expect(fn(e8sToICP(BigInt(500130591324222)), {maximumDigits: 15, thousandSeparator: ""})).toEqual("5001305.91324222")
        })
    })
})