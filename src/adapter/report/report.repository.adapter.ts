import {ReportRepository} from "../../report/report.repository";
import {ReportClient} from "../../client/reports/report.client";

export class ReportRepositoryAdapter extends ReportRepository {

  constructor(private reportClient: ReportClient) {
    super();
  }

}