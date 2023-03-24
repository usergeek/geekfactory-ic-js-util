import {e8sToICP, icpToE8S, icpToICPCorrect} from "./calculationICPUtils"

describe("calculationICPUtils", () => {
    it("e8sToICP", () => {
        expect(e8sToICP(BigInt(1e8))).toEqual(1)
        expect(e8sToICP(BigInt(1e8), 2)).toEqual(2)
        expect(e8sToICP(BigInt(1e8), 0.5)).toEqual(0.5)
    })

    it("icpToE8S", () => {
        expect(icpToE8S(1)).toEqual(BigInt(1e8))
        expect(icpToE8S(0.5)).toEqual(BigInt(5e7))
        expect(icpToE8S(0.000000001)).toEqual(BigInt(0))
        expect(icpToE8S(0.00000001)).toEqual(BigInt(1))
        expect(icpToE8S(1.000000009)).toEqual(BigInt(1e8 + 1))
    })

    it("icpToICPCorrect", () => {
        expect(icpToICPCorrect(1)).toEqual(1)
        expect(icpToICPCorrect(0.5)).toEqual(0.5)
        expect(icpToICPCorrect(0.00000001)).toEqual(0.00000001)
        expect(icpToICPCorrect(1.000000009)).toEqual(1.00000001)
    })
});