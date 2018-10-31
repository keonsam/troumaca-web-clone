export class Subscription {
  subscriptionId: string;
  moduleId: string;
  subscribed: boolean;
  name: string;
  cost: string;

  constructor(moduleId?: string) {
    this.moduleId = moduleId;
  }
}
