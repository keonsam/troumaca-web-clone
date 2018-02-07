import {Component, OnInit} from "@angular/core";
import {Parties} from "../../parties";
import {PartyEventService} from "../../party.event.service";

@Component({
  selector: 'user-list',
  templateUrl:'./user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit {

  private _parties:Parties;
  private menuName:string = "users-menu";

  constructor(private partyEventService:PartyEventService) {
    this.parties = new Parties();
  }

  ngOnInit(): void {
    this.partyEventService.menuChangeEvent.emit(this.menuName);
  }

  get parties(): Parties {
    return this._parties;
  }

  set parties(value: Parties) {
    this._parties = value;
  }



}