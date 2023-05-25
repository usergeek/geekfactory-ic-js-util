"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getICOrigin = exports.ICP0_IO__IC_DOMAIN = exports.IC0_APP__IC_DOMAIN = void 0;
exports.IC0_APP__IC_DOMAIN = "ic0.app";
exports.ICP0_IO__IC_DOMAIN = "icp0.io";
const getICOrigin = () => {
    const rawOrigin = window.location.origin;
    if (rawOrigin.endsWith(exports.ICP0_IO__IC_DOMAIN)) {
        return rawOrigin.replace(exports.ICP0_IO__IC_DOMAIN, exports.IC0_APP__IC_DOMAIN);
    }
    return rawOrigin;
};
exports.getICOrigin = getICOrigin;
//# sourceMappingURL=originUtils.js.map