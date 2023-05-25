import {hasOwnProperty, KeysOfUnion} from "geekfactory-js-util";

const okResultKey = "Ok"
const errResultKey = "Err"

export type OkResult<T> = { [okResultKey]: T }
export type ErrResult<T> = { [errResultKey]: T }
export type UGResult<S, F> = OkResult<S> | ErrResult<F>

export type UGError = "retry" | "restart" | "fatal"

export const isOk = <T>(obj: T): obj is T & OkResult<unknown> => {
    return hasOwnProperty(obj, okResultKey as KeysOfUnion<T>)
}

export const isErr = <T>(obj: T): obj is T & ErrResult<unknown> => {
    return hasOwnProperty(obj, errResultKey as KeysOfUnion<T>)
}

export const createOkResult = <T>(value: T): OkResult<T> => {
    return {[okResultKey]: value}
}

export const createErrResult = <T>(value: T): ErrResult<T> => {
    return {[errResultKey]: value}
}

export const createErrFatal = (): ErrResult<UGError> => {
    return createErrResult("fatal")
}

export const createErrRetry = (): ErrResult<UGError> => {
    return createErrResult("retry")
}

export const createErrRestart = (): ErrResult<UGError> => {
    return createErrResult("restart")
}

export const isICRequestErrWithName = <X extends {}, Y extends KeysOfUnion<X> | string>(obj: X, name: Y): obj is X & Record<Y, unknown> => {
    return hasOwnProperty(obj, name as KeysOfUnion<X>)
}

export function createICOptional<T>(value?: T): [] | [T] {
    return value != undefined ? [value] : []
}

export function getICOptional<T>(value?: [] | [T]): T | undefined {
    return value != undefined ?
        value.length === 1 ? value[0] : undefined
        : undefined
}

export const getICRequestErrName = <T>(obj: T & Record<typeof errResultKey, unknown>): string => {
    // @ts-ignore
    return Object.keys(obj[errResultKey])[0]
}

export const getICFirstKey = <T>(obj: T): string => {
    return Object.keys(obj || {})[0]
}