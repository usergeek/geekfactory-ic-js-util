export const IC0_APP__IC_DOMAIN = "ic0.app";
export const ICP0_IO__IC_DOMAIN = "icp0.io";

export const getICOrigin = (): string => {
    const rawOrigin = window.location.origin;
    if (rawOrigin.endsWith(ICP0_IO__IC_DOMAIN)) {
        return rawOrigin.replace(ICP0_IO__IC_DOMAIN, IC0_APP__IC_DOMAIN);
    }
    return rawOrigin;
}