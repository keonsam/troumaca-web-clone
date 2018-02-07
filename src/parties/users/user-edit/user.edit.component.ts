import {Component, OnInit} from "@angular/core";
import {PartyEventService} from "../../party.event.service";

@Component({
  selector: 'user-edit',
  templateUrl:'./user.edit.component.html',
  styleUrls: ['./user.edit.component.css']
})
export class UserEditComponent implements OnInit {

  constructor(private partyEventService:PartyEventService) {
  }

  ngOnInit(): void {
  }

}