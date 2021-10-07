import { Record, merge3 } from '@quenk/noni/lib/data/record';

import { Address } from '@quenk/potoo/lib/actor/address';
import { Message } from '@quenk/potoo/lib/actor/message';

import { View } from '@quenk/wml';

import { JApp } from '@quenk/jouvert/lib/app';

const defaultConf = { log: { level: 6, logger: console } };

/**
 * Show can be sent to the app to change the currently displayed view.
 */
export class Show {

    constructor(public view: View, public owner: Address) { }

}

/**
 * DApp is the interface applications using this module are expected to use.
 *
 * It provides a helper method for looking up services within in the system.
 * In the future, this may be replaced with potoo variables.
 */
export abstract class DApp extends JApp {

    constructor(public node: HTMLElement, public conf: object = {}) {

        super(merge3(defaultConf, conf,
            { accept: (m: Message) => this.accept(m) }));

    }

    services: Record<Address> = {};

    /**
     * getAddressFor provides the address for a service given a key.
     */
    getAddressFor(key: string): Address {

        return this.services[key] || '?';

    }

    /**
     * accept receives messages from the vm intended for the root actor 
     * (the app). 
     *
     * This is used by the app to listen for requests to change the view. To
     * intercept other messages, override the onMessage() method.
     */
    accept(msg: Message) {

        if (msg instanceof Show)
            this.show(msg.view);
        else
            this.onMessage(msg);

    }

    /**
     * show should be overridden to implement how the view is actually 
     * displayed.
     */
    show(_: View) { }

    /**
     * onMessage can be overridden to listen to messages sent to the root actor
     * (the app).
     */
    onMessage(_: Message) { }

}
