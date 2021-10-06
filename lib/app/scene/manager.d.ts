import { View } from '@quenk/wml';
import { Pagination } from '@quenk/jouvert/lib/app/remote/model';
import { DScene } from './';
/**
 * TableSection
 */
export interface TableSection<D> {
    id: string;
    pagination: Pagination;
    sort: string;
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
