import {Principal} from "@dfinity/principal";

type NeuronIdAsTextTransform = (key: any, value: any) => {key: string, value: any} | undefined
export type JSONStringifyOptions = {
    principalAsText?: boolean
    neuronIdAsText?: NeuronIdAsTextTransform
}
/**
 * Stringify a JSON object with BigInt and IC types support
 * @param value Value to stringify
 * @param space Space to use for indentation
 * @param options JSONStringifyOptions options. Default: {principalAsText: false, neuronIdAsText: undefined}
 */
export const jsonStringify = (value: any, space?: string | number, options?: JSONStringifyOptions) => {
    const {principalAsText = false, neuronIdAsText = undefined} = options || {}
    return JSON.stringify(value, (key, value) => {
        if (typeof value === "bigint") {
            return `${value.toString()}n`
        }

        //principalAsText
        if (principalAsText) {
            // Principal: add "__asText" property if value is a Principal
            if (typeof value === "object"
                && value !== null
                && value.hasOwnProperty("_isPrincipal") && value["_isPrincipal"] === true
                && value.hasOwnProperty("_arr")
                && typeof value["toText"] === "function"
            ) {
                try {
                    value["__asText"] = value["toText"]()
                } catch (e) {
                }
            }
        }

        //neuronIdAsText
        if (typeof neuronIdAsText === "function") {
            try {
                const neuronIdAsTextTransform: NeuronIdAsTextTransform = neuronIdAsText
                const result = neuronIdAsTextTransform(key, value)
                if (result != undefined) {
                    value[result.key] = result.value
                }
            } catch (e) {
            }
        }

        return value
    }, space)
}

export type JSONParseOptions = {
    parsePrincipal?: boolean
}
/**
 * Parse a JSON string with BigInt and IC types support
 * @param value Value to parse
 * @param options JSONParseOptions options. Default: {parsePrincipal: false}
 * @return Parsed value
 */
export const jsonParse = (value: string, options?: JSONParseOptions) => {
    const {parsePrincipal = false} = options || {}
    return JSON.parse(value, (key, value) => {
        if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1))
        }
        if (parsePrincipal) {
            if (typeof value === "object"
                && value !== null
                && value.hasOwnProperty("_isPrincipal") && value["_isPrincipal"] === true
                && value.hasOwnProperty("_arr")
            ) {
                try {
                    return Principal.from(value)
                } catch (e) {
                }
            }
        }
        return value
    })
}