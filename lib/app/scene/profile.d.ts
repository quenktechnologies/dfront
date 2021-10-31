import { DScene } from './';
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
    /**
     * setProfileData and show the view.
     */
    setProfileData(data: D): void;
}
