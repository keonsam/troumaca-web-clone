export class Subscription {
  subscriptionId: string;
  moduleId: string;
  subscribed: boolean;
  name: string;
  cost: string;

  constructor(moduleId?: string, cost?: string) {
    this.moduleId = moduleId;
    this.cost = cost;
  }
}
