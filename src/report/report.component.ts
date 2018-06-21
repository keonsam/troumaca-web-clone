import {Component, OnInit} from '@angular/core';
import {ReportService} from './report.service';

@Component({
  selector: 'report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  constructor(private reportService: ReportService) {
  }

  ngOnInit(): void {
  }

}
