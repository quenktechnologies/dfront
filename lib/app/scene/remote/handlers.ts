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

import { 
  AbstractCompleteHandler, 
  CompleteHandler 
} from '@quenk/jouvert/lib/app/remote/callback';

/**
 * ExecOnComplete invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for successful responses.
 */
export class ExecOnComplete<T> extends AbstractCompleteHandler<T> {

    constructor(public code: Code, public callback: (r: Response<T>) => void) {

        super();

    }

    onComplete(r: Response<T>) {

        if (r.code === this.code) this.callback(r);

    }

}

/**
 * ExecOnClientError invokes the provided callback when the HTTP response code
 * is matched.
 *
 * This happens only for responses that return a client error.
 */
export class ExecOnClientError<T> extends AbstractCompleteHandler<T> {

    constructor(
        public code: Code,
        public callback: (r: Response<Object>) => void) { super(); }

    onClientError(r: Response<Object>) {

        if (r.code === this.code) this.callback(r);

    }

}

/**
 * OrOnComplete uses a condition to determine which of two handlers
 * to invoke on a successful response.
 */
export class OrOnComplete<T> extends AbstractCompleteHandler<T> {

    constructor(
        public condition: (r: Response<T>) => boolean,
        public onTrue: CompleteHandler<T>,
        public onFalse: CompleteHandler<T>) { super(); }

    onComplete(r: Response<T>) {

        let target = this.condition(r) ? this.onTrue : this.onFalse;

        target.onComplete(r);

    }

}

/**
 * OrOnClientError uses a condition to determine which of two handlers
 * to invoke on a client error response.
 */
export class OrOnClientError<T> extends AbstractCompleteHandler<T> {

    constructor(
        public condition: (r: Response<Object>) => boolean,
        public onTrue: CompleteHandler<Object>,
        public onFalse: CompleteHandler<Object>) { super(); }

    onClientError(r: Response<Object>) {

        let target = this.condition(r) ? this.onTrue : this.onFalse;

        target.onClientError(r);

    }

}
