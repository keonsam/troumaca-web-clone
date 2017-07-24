import {Component, OnInit} from "@angular/core";
import {SiteService} from "./site.service";

@Component({
  selector: 'site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.css']
})
export class SiteComponent implements OnInit {

  constructor(private siteService:SiteService) {
  }

  ngOnInit(): void {
  }

}