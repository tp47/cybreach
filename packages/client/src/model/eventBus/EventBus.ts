import { IEventBus, Subscriber, Subscribers } from "./eventBus.types";

class EventBus implements IEventBus {
  private subscribers: Subscribers;

  constructor() {
    this.subscribers = {};
  }

  dispatch(event: string, ...args: unknown[]): void {
    if (this.subscribers[event] === undefined) {
      return;
    }
    this.subscribers[event].forEach((subscriber: Subscriber) => {
      subscriber(...args);
    });
  }

  register(event: string, callback: Subscriber): void {
    if (this.subscribers[event] === undefined) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }

  unregister(event: string, callback: Subscriber): void {
    if (this.subscribers[event] === undefined) {
      return;
    }

    this.subscribers[event] = this.subscribers[event].filter(
      (subscriber) => subscriber !== callback
    );
  }
}

export default EventBus;
