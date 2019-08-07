import { Fn } from '@chego/chego-api';

export type ValidationReport = { valid:boolean, errors:string[] };

export interface IValidator<T> {
    check(condition: (...args: any[]) => boolean, ...args: any[]): IValidator<T>;
    thenCall(fn: Fn<T>, ...args: any[]): T;
    report():ValidationReport;
}