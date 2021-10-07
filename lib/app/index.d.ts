import { Record } from '@quenk/noni/lib/data/record';
import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';
import { View } from '@quenk/wml';
import { JApp } from '@quenk/jouvert/lib/app';
/**
 * Show can be sent to the app to change the currently displayed view.
 */
export declare class Show {
    view: View;
    owner: Address;
    constructor(view: View, owner: Address);
}
/**
 * DApp is the interface applications using this module are expected to use.
 *
 * It provides a helper method for looking up services within in the system.
 * In the future, this may be replaced with potoo variables.
 */
export declare abstract class DApp extends JApp {
    node: HTMLElement;
    conf: object;
    constructor(node: HTMLElement, conf?: object);
    services: Record<Address>;
    /**
     * getAddressFor provides the address for a service given a key.
     */
    getAddressFor(key: string): Address;
    /**
     * accept receives messages from the vm intended for the root actor
     * (the app).
     *
     * This is used by the app to listen for requests to change the view. To
     * intercept other messages, override the onMessage() method.
     */
    accept(msg: Message): void;
    /**
     * show should be overridden to implement how the view is actually
     * displayed.
     */
    show(_: View): void;
    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    onMessage(_: Message): void;
}
