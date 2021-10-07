/**
 * This module provides common handlers used in QT projects for fetching and
 * displaying data. Data management apps tend to have many different screens
 * that function similarly but focus on a specific kind of data item each.
 *
 * To enjoy re-usability between these screens, loading of data is usually done
 * via [[RemoteModel]] instances in combination with [[CompleteHandler]]s. This
 * way, common behaviours can be shared by simply using an instance of the
 * CompleteHandler class with the desired effect.
 *
 * As much as possible, the CompleteHandlers here try to do one thing only so
 * that they are more composable. This should allow multiple handlers to be
 * combined into one in arrangements that suit the apps needs.
 */
import { Object } from '@quenk/noni/lib/data/jsonx';
import { Response } from '@quenk/jhr/lib/response';
import { Code } from '@quenk/jhr/lib/status';
import { AbstractCompleteHandler, CompleteHandler } from '@quenk/jouvert/lib/app/remote/callback';
/**
 * ExecOnComplete invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for successful responses.
 */
export declare class ExecOnComplete<T> extends AbstractCompleteHandler<T> {
    code: Code;
    callback: (r: Response<T>) => void;
    constructor(code: Code, callback: (r: Response<T>) => void);
    onComplete(r: Response<T>): void;
}
/**
 * ExecOnClientError invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for responses that return a client error.
 */
export declare class ExecOnClientError<T> extends AbstractCompleteHandler<T> {
    code: Code;
    callback: (r: Response<Object>) => void;
    constructor(code: Code, callback: (r: Response<Object>) => void);
    onClientError(r: Response<Object>): void;
}
/**
 * OrOnComplete uses a condition to determine which of two handlers
 * to invoke on a successful response.
 */
export declare class OrOnComplete<T> extends AbstractCompleteHandler<T> {
    condition: (r: Response<T>) => boolean;
    onTrue: CompleteHandler<T>;
    onFalse: CompleteHandler<T>;
    constructor(condition: (r: Response<T>) => boolean, onTrue: CompleteHandler<T>, onFalse: CompleteHandler<T>);
    onComplete(r: Response<T>): void;
}
/**
 * OrOnClientError uses a condition to determine which of two handlers
 * to invoke on a client error response.
 */
export declare class OrOnClientError<T> extends AbstractCompleteHandler<T> {
    condition: (r: Response<Object>) => boolean;
    onTrue: CompleteHandler<Object>;
    onFalse: CompleteHandler<Object>;
    constructor(condition: (r: Response<Object>) => boolean, onTrue: CompleteHandler<Object>, onFalse: CompleteHandler<Object>);
    onClientError(r: Response<Object>): void;
}
