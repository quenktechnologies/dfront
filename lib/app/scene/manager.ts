import * as status from '@quenk/jhr/lib/status';

import { Object } from '@quenk/noni/lib/data/jsonx';

import { View } from '@quenk/wml';

import { Pagination, SearchResult } from '@quenk/jouvert/lib/app/remote/model';

import { getById } from '@quenk/wml-widgets/lib/util';
import { Updatable } from '@quenk/wml-widgets/lib/data/updatable';

import { ExecOnComplete } from './remote/handlers';
import { DScene } from './';

/**
 * ShowTableAfterOk populates and displays the table after receiving a response 
 * with data.
 */
export class ShowTableAfterOk<D extends Object, M>
    extends
    ExecOnComplete<SearchResult<D>> {

    constructor(public manager: DManager<D, M>) {

        super(status.OK, r => {

            this.manager.values.table.data = r.body.data;
            this.manager.values.table.pagination = r.body.meta.pagination;
            this.manager.show();

        });

    }

}

/**
 * ShowTableAfterNoContent displays the table without data after receiving a 
 * response with no data.
 */
export class ShowTableAfterNoContent<D extends Object, M>
    extends
    ExecOnComplete<SearchResult<D>> {

    constructor(public manager: DManager<D, M>) {

        super(status.NO_CONTENT, () => {

            this.manager.values.table.data = [];
            this.manager.show();

        });

    }

}

/**
 * UpdateTableAfterOk updates the table with data received from a response.
 */
export class UpdateTableAfterOk<D extends Object, M>
    extends
    ExecOnComplete<SearchResult<D>> {

    constructor(public manager: DManager<D, M>) {

        super(status.OK, r => {

            let mtable = getById<Updatable<D>>(this.manager.view,
                this.manager.values.table.id);

            if (mtable.isJust())
                mtable.get().update(r.body.data);

        });

    }

}

/**
 * UpdateTableAfterNoContent updates the table after a response with no data
 * is received.
 */
export class UpdateTableAfterNoContent<D extends Object, M>
    extends
    ExecOnComplete<SearchResult<D>> {

    constructor(public manager: DManager<D, M>) {

        super(status.NO_CONTENT, () => {

            let mtable = getById<Updatable<D>>(this.manager.view,
                this.manager.values.table.id);

            if (mtable.isJust())
                mtable.get().update([]);

        });

    }

}

/**
 * TableSection
 */
export interface TableSection<D> {

    id: string,

    pagination: Pagination,

    sort: string,

    data: D[]

}

/**
 * DManager is a scene used to provide a management interface for a single 
 * data collection in an application.
 *
 * This scene is designed around a view that usually consists of a single
 * search bar and a data table that displays the results of successful searches.
 * Searches are expected to take place via http requests (via remote actors) and
 * children of this actor can react to them via the CompleteHandler apis.
 */
export abstract class DManager<D, M> extends DScene<M> {

    /**
     * view is the main view of the DManager.
     */
    abstract view: View;

    /**
     * values used in the view.
     */
    abstract values: {

        /**
         * table are the properties relating to the data table part of the view.
         */
        table: TableSection<D>

    }

}
