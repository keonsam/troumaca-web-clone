import {Component, OnInit} from "@angular/core";
import {PartyEventService} from "../../party.event.service";

@Component({
  selector: 'user-creation',
  templateUrl:'./user.creation.component.html',
  styleUrls: ['./user.creation.component.css']
})
export class UserCreationComponent implements OnInit {

  constructor(private partyEventService:PartyEventService) {
  }

  ngOnInit(): void {

  }

}