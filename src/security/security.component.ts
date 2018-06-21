import {Component, OnInit} from '@angular/core';
import {SecurityService} from './security.service';

@Component({
  selector: 'security',
  templateUrl: './security.component.html',
  styleUrls: ['./security.component.css']
})
export class SecurityComponent implements OnInit {

  constructor(private securityService: SecurityService) {
  }

  ngOnInit(): void {
  }

}
