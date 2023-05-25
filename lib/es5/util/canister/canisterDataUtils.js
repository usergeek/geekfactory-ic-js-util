"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getICFirstKey = exports.getICRequestErrName = exports.getICOptional = exports.createICOptional = exports.isICRequestErrWithName = exports.createErrRestart = exports.createErrRetry = exports.createErrFatal = exports.createErrResult = exports.createOkResult = exports.isErr = exports.isOk = void 0;
const geekfactory_js_util_1 = require("geekfactory-js-util");
const okResultKey = "Ok";
const errResultKey = "Err";
const isOk = (obj) => {
    return (0, geekfactory_js_util_1.hasOwnProperty)(obj, okResultKey);
};
exports.isOk = isOk;
const isErr = (obj) => {
    return (0, geekfactory_js_util_1.hasOwnProperty)(obj, errResultKey);
};
exports.isErr = isErr;
const createOkResult = (value) => {
    return { [okResultKey]: value };
};
exports.createOkResult = createOkResult;
const createErrResult = (value) => {
    return { [errResultKey]: value };
};
exports.createErrResult = createErrResult;
const createErrFatal = () => {
    return (0, exports.createErrResult)("fatal");
};
exports.createErrFatal = createErrFatal;
const createErrRetry = () => {
    return (0, exports.createErrResult)("retry");
};
exports.createErrRetry = createErrRetry;
const createErrRestart = () => {
    return (0, exports.createErrResult)("restart");
};
exports.createErrRestart = createErrRestart;
const isICRequestErrWithName = (obj, name) => {
    return (0, geekfactory_js_util_1.hasOwnProperty)(obj, name);
};
exports.isICRequestErrWithName = isICRequestErrWithName;
function createICOptional(value) {
    return value != undefined ? [value] : [];
}
exports.createICOptional = createICOptional;
function getICOptional(value) {
    return value != undefined ?
        value.length === 1 ? value[0] : undefined
        : undefined;
}
exports.getICOptional = getICOptional;
const getICRequestErrName = (obj) => {
    // @ts-ignore
    return Object.keys(obj[errResultKey])[0];
};
exports.getICRequestErrName = getICRequestErrName;
const getICFirstKey = (obj) => {
    return Object.keys(obj || {})[0];
};
exports.getICFirstKey = getICFirstKey;
//# sourceMappingURL=canisterDataUtils.js.map