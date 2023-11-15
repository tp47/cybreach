type Subscribers = {
  [key: string]: Subscriber[];
};

type Subscriber = (...args: any[]) => any;

interface IEventBus {
  dispatch(event: string, arg: unknown): void;
  register(event: string, callback: () => unknown): void;
  unregister(event: string, callback: () => unknown): void;
}

export type { Subscribers, Subscriber, IEventBus };
