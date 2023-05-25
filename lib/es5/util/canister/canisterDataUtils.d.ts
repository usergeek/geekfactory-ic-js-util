import { KeysOfUnion } from "geekfactory-js-util";
declare const okResultKey = "Ok";
declare const errResultKey = "Err";
export type OkResult<T> = {
    [okResultKey]: T;
};
export type ErrResult<T> = {
    [errResultKey]: T;
};
export type UGResult<S, F> = OkResult<S> | ErrResult<F>;
export type UGError = "retry" | "restart" | "fatal";
export declare const isOk: <T>(obj: T) => obj is T & OkResult<unknown>;
export declare const isErr: <T>(obj: T) => obj is T & ErrResult<unknown>;
export declare const createOkResult: <T>(value: T) => OkResult<T>;
export declare const createErrResult: <T>(value: T) => ErrResult<T>;
export declare const createErrFatal: () => ErrResult<UGError>;
export declare const createErrRetry: () => ErrResult<UGError>;
export declare const createErrRestart: () => ErrResult<UGError>;
export declare const isICRequestErrWithName: <X extends {}, Y extends string | KeysOfUnion<X>>(obj: X, name: Y) => obj is X & Record<Y, unknown>;
export declare function createICOptional<T>(value?: T): [] | [T];
export declare function getICOptional<T>(value?: [] | [T]): T | undefined;
export declare const getICRequestErrName: <T>(obj: T & Record<"Err", unknown>) => string;
export declare const getICFirstKey: <T>(obj: T) => string;
export {};
