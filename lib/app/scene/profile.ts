import * as status from '@quenk/jhr/lib/status';

import { Object } from '@quenk/noni/lib/data/jsonx';

import { GetResult } from '@quenk/jouvert/lib/app/remote/model';

import { ExecOnComplete } from './remote/handlers';
import { DScene } from './';

/**
 * ShowDataAfterOk displays the populated profile after receiving a response 
 * with data.
 */
export class ShowDataAfterOk<D extends Object, M>
    extends
    ExecOnComplete<GetResult<D>> {

    constructor(public profile: Profile<D, M>) {

        super(status.OK, r => {

            this.profile.values.data = r.body.data;
            this.profile.show();

        });

    }

}

/**
 * Profile is a scene used to provide a view of a single record of data from 
 * a collection.
 */
export abstract class Profile<D, M> extends DScene<M> {

    /**
     * values used by the view.
     */
    abstract values: {

        /**
         * data to display
         */
        data: D

    }

}
