
import {ActivityClient} from '../../client/activity/activity.client';
import {ActivityRepository} from '../../activity/activity.repository';

export class ActivityRepositoryAdapter extends ActivityRepository {
  constructor(private activityClient: ActivityClient) {
    super();
  }
}
