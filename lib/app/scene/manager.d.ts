import { Object } from '@quenk/noni/lib/data/jsonx';
import { View } from '@quenk/wml';
import { Pagination, SearchResult } from '@quenk/jouvert/lib/app/remote/model';
import { ExecOnComplete } from './remote/handlers';
import { DScene } from './';
/**
 * ShowTableAfterOk populates and displays the table after receiving a response
 * with data.
 */
export declare class ShowTableAfterOk<D extends Object, M> extends ExecOnComplete<SearchResult<D>> {
    manager: DManager<D, M>;
    constructor(manager: DManager<D, M>);
}
/**
 * ShowTableAfterNoContent displays the table without data after receiving a
 * response with no data.
 */
export declare class ShowTableAfterNoContent<D extends Object, M> extends ExecOnComplete<SearchResult<D>> {
    manager: DManager<D, M>;
    constructor(manager: DManager<D, M>);
}
/**
 * UpdateTableAfterOk updates the table with data received from a response.
 */
export declare class UpdateTableAfterOk<D extends Object, M> extends ExecOnComplete<SearchResult<D>> {
    manager: DManager<D, M>;
    constructor(manager: DManager<D, M>);
}
/**
 * UpdateTableAfterNoContent updates the table after a response with no data
 * is received.
 */
export declare class UpdateTableAfterNoContent<D extends Object, M> extends ExecOnComplete<SearchResult<D>> {
    manager: DManager<D, M>;
    constructor(manager: DManager<D, M>);
}
/**
 * TableSection
 */
export interface TableSection<D> {
    id: string;
    pagination?: Pagination;
    data: D[];
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
export declare abstract class DManager<D, M> extends DScene<M> {
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
        table: TableSection<D>;
    };
}
