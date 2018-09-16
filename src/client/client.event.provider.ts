import {ClientEvent} from './client.event';

export function clientEventFactory (): ClientEvent {
  return new ClientEvent();
}

export let clientEventProvider = {
  provide: ClientEvent,
  useFactory: clientEventFactory,
  deps: []
};
