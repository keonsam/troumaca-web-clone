import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {ReportComponent} from './report.component';
import {ReportService} from './report.service';
import {ReportRepository} from './report.repository';
import {reportRouting} from './report.routing';
import {RouterModule} from '@angular/router';
import {LeftMenuModule} from '../left-menu/left.menu.module';

@NgModule({
  imports: [
    CommonModule,
    NgbModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    reportRouting,
    LeftMenuModule
  ],
  declarations: [
    ReportComponent
  ],
  providers: [{
    provide: ReportService,
    useFactory(reportRepository: ReportRepository) {
      let reportService: ReportService;
      if (!reportService) {
        reportService = new ReportService(reportRepository);
      }
      return reportService;
    },
    deps: [ReportRepository]
  }],
  exports: [
    ReportComponent
  ]
})
export class ReportModule {}
