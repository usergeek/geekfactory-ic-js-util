import reusePromise from "reuse-promise";

export type RunCancelled = { state: "cancelled", error?: Error }
export type RunFailed = { state: "error", error: Error }
export type RunSuccess<R> = { state: "success", result: R }
type RunPromiseResult<R> = RunSuccess<R> | RunCancelled | RunFailed
export type CancellableAsync<R, T extends (...args: any) => Promise<R>> = {
    run: (...args: Parameters<T>) => Promise<RunPromiseResult<R>>
    cancel: () => void
}

export const makeCancelableAsync = <R, T extends (...args: any) => Promise<R>>(callback: T): CancellableAsync<R, T> => {
    let hasCanceled_ = false;
    const run = async (...args: Parameters<T>): Promise<RunPromiseResult<R>> => {
        try {
            const result = await callback.apply(null, args)
            if (hasCanceled_) {
                return {state: "cancelled"}
            }
            return {state: "success", result: result}
        } catch (error) {
            if (hasCanceled_) {
                return {state: "cancelled", error: error}
            }
            return {state: "error", error: error}
        }
    }
    const cancel = () => {
        hasCanceled_ = true;
    };
    return {
        run: run,
        cancel: cancel,
    };
};

export const isCancellableAsyncSuccess = <T>(obj: RunPromiseResult<T>): obj is RunSuccess<T> & { state: "success" } => {
    return obj.state === "success"
}

export const isCancellableAsyncCancelled = <T>(obj: RunPromiseResult<T>): obj is RunCancelled & { state: "cancelled" } => {
    return obj.state === "cancelled"
}

export const isCancellableAsyncError = <T>(obj: RunPromiseResult<T>): obj is RunFailed & { state: "error" } => {
    return obj.state === "error"
}

export function delayPromise(duration) {
    return new Promise(resolve => setTimeout(resolve, duration));
}

export function reusePromiseWrapper<A extends any[], R extends any, T extends (...args: A) => R>(promiseSourceFn: T) {
    return reusePromise(promiseSourceFn) as (...args: Parameters<T>) => ReturnType<T>
}

export const OneAtATimePromiseFacade = (() => {
    type PromiseFactory<T> = () => Promise<T>
    const create = () => {
        let oneAtATimePromiseInProgressPromise = Promise.resolve();
        const oneAtATimePromise = <T>(promiseFactory: PromiseFactory<T>, ctx: string): Promise<T> => {
            return new Promise<T>((resolve, reject) => {
                // if (!!process.env.IS_TEST_SERVER) {
                //     console.log(new Date().getTime(), "oneAtATime2: start with", ctx);
                // }
                oneAtATimePromiseInProgressPromise = oneAtATimePromiseInProgressPromise.then(() => {
                    // if (!!process.env.IS_TEST_SERVER) {
                    //     console.log(new Date().getTime(), "oneAtATime2: oneAtATimePromiseInProgressPromise then...", ctx);
                    // }
                    return new Promise((resolveInner, rejectInner) => {
                        // if (!!process.env.IS_TEST_SERVER) {
                        //     console.log(new Date().getTime(), "oneAtATime2: will create promiseFactory result...", ctx);
                        // }
                        promiseFactory().then((promiseFactoryResult) => {
                            // if (!!process.env.IS_TEST_SERVER) {
                            //     console.log(new Date().getTime(), "oneAtATime2: promiseFactoryResult", promiseFactoryResult, ctx);
                            // }
                            resolveInner(promiseFactoryResult)
                        }).catch(rejectInner);
                    })
                }).then((value: T) => {
                    // if (!!process.env.IS_TEST_SERVER) {
                    //     console.log(new Date().getTime(), "oneAtATime2: then value", value, ctx);
                    // }
                    resolve(value)
                }).catch(reject)
            });
        }
        return {
            oneAtATimePromise: oneAtATimePromise
        }
    }
    return {
        create: create
    }
})()