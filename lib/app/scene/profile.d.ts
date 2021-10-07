import { Object } from '@quenk/noni/lib/data/jsonx';
import { GetResult } from '@quenk/jouvert/lib/app/remote/model';
import { ExecOnComplete } from './remote/handlers';
import { DScene } from './';
/**
 * ShowDataAfterOk displays the populated profile after receiving a response
 * with data.
 */
export declare class ShowDataAfterOk<D extends Object, M> extends ExecOnComplete<GetResult<D>> {
    profile: Profile<D, M>;
    constructor(profile: Profile<D, M>);
}
/**
 * Profile is a scene used to provide a view of a single record of data from
 * a collection.
 */
export declare abstract class Profile<D, M> extends DScene<M> {
    /**
     * values used by the view.
     */
    abstract values: {
        /**
         * data to display
         */
        data: D;
    };
}
