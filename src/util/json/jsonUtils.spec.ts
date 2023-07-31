import {Principal} from "@dfinity/principal";
import {jsonParse, JSONParseOptions, jsonStringify, JSONStringifyOptions} from "./jsonUtils";

describe("JSONUtils", () => {

    describe("jsonStringify", () => {

        it("common", () => {
            const getValue = (value: any, options?: JSONStringifyOptions): string => jsonStringify(value, undefined, options)
            //test "getValue" function with different nested objects of different types
            expect(getValue(0)).toStrictEqual("0")
            expect(getValue(0.123456789)).toStrictEqual("0.123456789")

            expect(getValue("")).toStrictEqual("\"\"")
            expect(getValue("test")).toStrictEqual("\"test\"")

            expect(getValue(true)).toStrictEqual("true")
            expect(getValue(false)).toStrictEqual("false")

            expect(getValue(null)).toStrictEqual("null")
            expect(getValue(undefined)).toStrictEqual(undefined)

            expect(getValue([])).toStrictEqual("[]")
            expect(getValue([1, 2, 3])).toStrictEqual("[1,2,3]")

            expect(getValue({})).toStrictEqual("{}")
            expect(getValue({a: 1, b: 2, c: 3})).toStrictEqual("{\"a\":1,\"b\":2,\"c\":3}")
            expect(getValue({a: 1, b: BigInt(2), c: 3})).toStrictEqual("{\"a\":1,\"b\":\"2n\",\"c\":3}")

            expect(getValue([1, "2", true, null, undefined, [], {}])).toStrictEqual("[1,\"2\",true,null,null,[],{}]")
            expect(getValue([1, "2", true, null, undefined, [], {a: 1, b: BigInt(2), c: 3}])).toStrictEqual("[1,\"2\",true,null,null,[],{\"a\":1,\"b\":\"2n\",\"c\":3}]")

            const date = new Date()
            expect(getValue(date)).toStrictEqual(`"${date.toISOString()}"`)
            expect(getValue([date])).toStrictEqual(`["${date.toISOString()}"]`)
            expect(getValue({a: date})).toStrictEqual(`{"a":"${date.toISOString()}"}`)
        })

        it("principal", () => {
            const getValue = (value: any, options?: JSONStringifyOptions): string => jsonStringify(value, undefined, options)
            const principalText = "myqmt-pj6bp-oenqu-pnjbc-qglgl-elokq-n54ms-gyyds-ao5hs-ldrvi-zqe";
            const canisterPrincipalText = "xdtth-dyaaa-aaaah-qc73q-cai";
            expect(getValue({principal: Principal.fromText(principalText)}, {principalAsText: false})).toStrictEqual(`{"principal":{"_arr":{"0":62,"1":11,"2":220,"3":70,"4":194,"5":143,"6":106,"7":66,"8":40,"9":25,"10":102,"11":89,"12":22,"13":229,"14":65,"15":189,"16":227,"17":36,"18":108,"19":96,"20":114,"21":3,"22":186,"23":121,"24":44,"25":113,"26":170,"27":51,"28":2},"_isPrincipal":true}}`)
            expect(getValue({principal: Principal.fromText(principalText)}, {principalAsText: true})).toStrictEqual(`{"principal":{"_arr":{"0":62,"1":11,"2":220,"3":70,"4":194,"5":143,"6":106,"7":66,"8":40,"9":25,"10":102,"11":89,"12":22,"13":229,"14":65,"15":189,"16":227,"17":36,"18":108,"19":96,"20":114,"21":3,"22":186,"23":121,"24":44,"25":113,"26":170,"27":51,"28":2},"_isPrincipal":true,"__asText":"${principalText}"}}`)
            expect(getValue({principal: Principal.fromText(canisterPrincipalText)}, {principalAsText: false})).toStrictEqual(`{"principal":{"_arr":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":240,"6":23,"7":247,"8":1,"9":1},"_isPrincipal":true}}`)
            expect(getValue({principal: Principal.fromText(canisterPrincipalText)}, {principalAsText: true})).toStrictEqual(`{"principal":{"_arr":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":240,"6":23,"7":247,"8":1,"9":1},"_isPrincipal":true,"__asText":"${canisterPrincipalText}"}}`)
        })
    })

    describe("jsonParse", () => {
        it("common", () => {

            const getValue = (value: string | undefined): any => jsonParse(value)

            expect(getValue("0")).toStrictEqual(0)
            expect(getValue("0.123456789")).toStrictEqual(0.123456789)

            expect(getValue("\"\"")).toStrictEqual("")
            expect(getValue("\"test\"")).toStrictEqual("test")

            expect(getValue("true")).toStrictEqual(true)
            expect(getValue("false")).toStrictEqual(false)

            expect(getValue("null")).toStrictEqual(null)
            expect(() => getValue(undefined)).toThrow()

            expect(getValue("[]")).toStrictEqual([])
            expect(getValue("[1, 2, 3]")).toStrictEqual([1, 2, 3])

            expect(getValue("{}")).toStrictEqual({})
            expect(getValue("{\"a\":1,\"b\":2,\"c\":3}")).toStrictEqual({a: 1, b: 2, c: 3})
            expect(getValue("{\"a\":1,\"b\":\"2n\",\"c\":3}")).toStrictEqual({a: 1, b: BigInt(2), c: 3})

            expect(getValue("[1,\"2\",true,null,null,[],{}]")).toStrictEqual([1, "2", true, null, null, [], {}])
            expect(getValue("[1,\"2\",true,null,null,[],{\"a\":1,\"b\":\"2n\",\"c\":3}]")).toStrictEqual([1, "2", true, null, null, [], {a: 1, b: BigInt(2), c: 3}])

            const date = new Date()
            expect(getValue(`"${date.toISOString()}"`)).toStrictEqual(date.toISOString())
            expect(getValue(`["${date.toISOString()}"]`)).toStrictEqual([date.toISOString()])
            expect(getValue(`{"a":"${date.toISOString()}"}`)).toStrictEqual({a: date.toISOString()})
        })

        it("principal", () => {
            const getValue = (value: any, options?: JSONParseOptions): string => jsonParse(value, options)
            const principalText = "myqmt-pj6bp-oenqu-pnjbc-qglgl-elokq-n54ms-gyyds-ao5hs-ldrvi-zqe";
            const canisterPrincipalText = "xdtth-dyaaa-aaaah-qc73q-cai";

            expect(getValue(`{"principal":{"_arr":{"0":62,"1":11,"2":220,"3":70,"4":194,"5":143,"6":106,"7":66,"8":40,"9":25,"10":102,"11":89,"12":22,"13":229,"14":65,"15":189,"16":227,"17":36,"18":108,"19":96,"20":114,"21":3,"22":186,"23":121,"24":44,"25":113,"26":170,"27":51,"28":2},"_isPrincipal":true}}`, {parsePrincipal: false})).toEqual(JSON.parse(`{"principal":{"_arr":{"0":62,"1":11,"2":220,"3":70,"4":194,"5":143,"6":106,"7":66,"8":40,"9":25,"10":102,"11":89,"12":22,"13":229,"14":65,"15":189,"16":227,"17":36,"18":108,"19":96,"20":114,"21":3,"22":186,"23":121,"24":44,"25":113,"26":170,"27":51,"28":2},"_isPrincipal":true}}`))

            const principalWrapped: Principal = getValue(`{"principal":{"_arr":{"0":62,"1":11,"2":220,"3":70,"4":194,"5":143,"6":106,"7":66,"8":40,"9":25,"10":102,"11":89,"12":22,"13":229,"14":65,"15":189,"16":227,"17":36,"18":108,"19":96,"20":114,"21":3,"22":186,"23":121,"24":44,"25":113,"26":170,"27":51,"28":2},"_isPrincipal":true,"__asText":"${principalText}"}}`, {parsePrincipal: true})["principal"]
            expect(principalWrapped.compareTo(Principal.fromText(principalText))).toEqual("eq")
            expect(principalWrapped.toUint8Array()).toEqual({"0":62,"1":11,"2":220,"3":70,"4":194,"5":143,"6":106,"7":66,"8":40,"9":25,"10":102,"11":89,"12":22,"13":229,"14":65,"15":189,"16":227,"17":36,"18":108,"19":96,"20":114,"21":3,"22":186,"23":121,"24":44,"25":113,"26":170,"27":51,"28":2})

            expect(getValue(`{"principal":{"_arr":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":240,"6":23,"7":247,"8":1,"9":1},"_isPrincipal":true}}`, {parsePrincipal: false})).toEqual(JSON.parse(`{"principal":{"_arr":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":240,"6":23,"7":247,"8":1,"9":1},"_isPrincipal":true}}`))

            let canisterPrincipalWrapped: Principal = getValue(`{"principal":{"_arr":{"0":0,"1":0,"2":0,"3":0,"4":0,"5":240,"6":23,"7":247,"8":1,"9":1},"_isPrincipal":true}}`, {parsePrincipal: true})["principal"]
            expect(canisterPrincipalWrapped.compareTo(Principal.fromText(canisterPrincipalText))).toEqual("eq")
            expect(canisterPrincipalWrapped.toUint8Array()).toEqual({"0":0,"1":0,"2":0,"3":0,"4":0,"5":240,"6":23,"7":247,"8":1,"9":1})
        })
    })
});