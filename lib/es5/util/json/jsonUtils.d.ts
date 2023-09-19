type NeuronIdAsTextTransform = (key: any, value: any) => {
    key: string;
    value: any;
} | undefined;
export type JSONStringifyOptions = {
    principalAsText?: boolean;
    neuronIdAsText?: NeuronIdAsTextTransform;
};
/**
 * Stringify a JSON object with BigInt and IC types support
 * @param value Value to stringify
 * @param space Space to use for indentation
 * @param options JSONStringifyOptions options. Default: {principalAsText: false, neuronIdAsText: undefined}
 */
export declare const jsonStringify: (value: any, space?: string | number, options?: JSONStringifyOptions) => string;
export type JSONParseOptions = {
    parsePrincipal?: boolean;
};
/**
 * Parse a JSON string with BigInt and IC types support
 * @param value Value to parse
 * @param options JSONParseOptions options. Default: {parsePrincipal: false}
 * @return Parsed value
 */
export declare const jsonParse: (value: string, options?: JSONParseOptions) => any;
export {};
