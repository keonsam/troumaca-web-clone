import {ReportClient} from "../../client/report/report.client";
import {ReportRepository} from "../../report/report.repository";
import {ReportRepositoryAdapter} from "./report.repository.adapter";
export function reportRepositoryProviderFactory (reportClient:ReportClient):ReportRepository {
  let reportRepositoryAdapter: ReportRepositoryAdapter;
  if (!reportRepositoryAdapter) {
    reportRepositoryAdapter = new ReportRepositoryAdapter(reportClient);
  }
  return reportRepositoryAdapter;
}

export let reportRepositoryProvider = {
  provide: ReportRepository,
  useFactory: reportRepositoryProviderFactory,
  deps: [ReportClient]
};