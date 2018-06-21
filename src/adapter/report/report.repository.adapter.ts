import {ReportRepository} from '../../report/report.repository';
import {ReportClient} from '../../client/report/report.client';

export class ReportRepositoryAdapter extends ReportRepository {

  constructor(private reportClient: ReportClient) {
    super();
  }

}
