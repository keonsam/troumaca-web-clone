import "rxjs/add/operator/map";
import {ActivityClient} from "../../client/activities/activity.client";
import {ActivityRepository} from "../../activity/activity.repository";

export class ActivityRepositoryAdapter extends ActivityRepository {
  constructor(private activityClient: ActivityClient) {
    super();
  }
}