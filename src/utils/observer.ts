export type SubscriberCb<T = any> = (payload: T) => void;

export class Observer<T = any> {

    queue: {
        [name: string]: any[];
    } = {};
    subscribers: { name: string, cb: SubscriberCb<T> }[] = []

    on(name: string, cb: SubscriberCb<T>) {
        const listener = { name, cb };
        this.subscribers.push(listener)
    }

    off(cb: SubscriberCb<T>) {
        const indexToDelete = this.subscribers.findIndex(item => item.cb === cb);
        this.subscribers.splice(indexToDelete, 1);
    }

    emit(name: string, payload: T) {
        const listeners = this.subscribers.filter(subsciber => subsciber.name === name)
        listeners.forEach(subsciber => {
            subsciber.cb(payload)
        });
    }

}