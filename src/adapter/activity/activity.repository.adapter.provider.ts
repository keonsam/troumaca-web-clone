import {ActivityRepositoryAdapter} from "./activity.repository.adapter";
import {ActivityClient} from "../../client/activities/activity.client";
import {ActivityRepository} from "../../activity/activity.repository";

export function activityRepositoryProviderFactory (activityClient:ActivityClient):ActivityRepository {
  let activityRepositoryAdapter: ActivityRepositoryAdapter;
  if (!activityRepositoryAdapter) {
    activityRepositoryAdapter = new ActivityRepositoryAdapter(activityClient);
  }
  return activityRepositoryAdapter;
}

export let activityRepositoryProvider = {
  provide: ActivityRepository,
  useFactory: activityRepositoryProviderFactory,
  deps: [ActivityClient]
};