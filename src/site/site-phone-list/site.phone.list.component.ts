import {Component, OnInit} from "@angular/core";
import {SiteService} from "../site.service";

@Component({
  selector: 'site-phone-list',
  templateUrl: './site.phone.list.component.html',
  styleUrls: ['./site.phone.list.component.css']
})
export class SitePhoneListComponent implements OnInit {

  constructor(private siteService:SiteService) {
  }

  ngOnInit(): void {
  }

}