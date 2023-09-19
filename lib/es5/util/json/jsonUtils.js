"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jsonParse = exports.jsonStringify = void 0;
const principal_1 = require("@dfinity/principal");
/**
 * Stringify a JSON object with BigInt and IC types support
 * @param value Value to stringify
 * @param space Space to use for indentation
 * @param options JSONStringifyOptions options. Default: {principalAsText: false, neuronIdAsText: undefined}
 */
const jsonStringify = (value, space, options) => {
    const { principalAsText = false, neuronIdAsText = undefined } = options || {};
    return JSON.stringify(value, (key, value) => {
        if (typeof value === "bigint") {
            return `${value.toString()}n`;
        }
        //principalAsText
        if (principalAsText) {
            // Principal: add "__asText" property if value is a Principal
            if (typeof value === "object"
                && value !== null
                && value.hasOwnProperty("_isPrincipal") && value["_isPrincipal"] === true
                && value.hasOwnProperty("_arr")
                && typeof value["toText"] === "function") {
                try {
                    value["__asText"] = value["toText"]();
                }
                catch (e) {
                }
            }
        }
        //neuronIdAsText
        if (typeof neuronIdAsText === "function") {
            try {
                const neuronIdAsTextTransform = neuronIdAsText;
                const result = neuronIdAsTextTransform(key, value);
                if (result != undefined) {
                    value[result.key] = result.value;
                }
            }
            catch (e) {
            }
        }
        return value;
    }, space);
};
exports.jsonStringify = jsonStringify;
/**
 * Parse a JSON string with BigInt and IC types support
 * @param value Value to parse
 * @param options JSONParseOptions options. Default: {parsePrincipal: false}
 * @return Parsed value
 */
const jsonParse = (value, options) => {
    const { parsePrincipal = false } = options || {};
    return JSON.parse(value, (key, value) => {
        if (typeof value === "string" && /^\d+n$/.test(value)) {
            return BigInt(value.slice(0, -1));
        }
        if (parsePrincipal) {
            if (typeof value === "object"
                && value !== null
                && value.hasOwnProperty("_isPrincipal") && value["_isPrincipal"] === true
                && value.hasOwnProperty("_arr")) {
                try {
                    return principal_1.Principal.from(value);
                }
                catch (e) {
                }
            }
        }
        return value;
    });
};
exports.jsonParse = jsonParse;
//# sourceMappingURL=jsonUtils.js.map