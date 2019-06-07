import { Fn } from '@chego/chego-api';

export interface IValidator<T> {
    check(condition: (...args: any[]) => boolean, ...args: any[]): IValidator<T>;
    thenCall(fn: Fn<T>, ...args: any[]): T;
}