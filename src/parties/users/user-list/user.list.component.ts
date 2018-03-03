import {Component, OnInit} from "@angular/core";
import {Persons} from "../../persons";
import {PartyEventService} from "../../party.event.service";
import {PartyService} from "../../party.service";
import {Page} from "../../../page/page";
import {Sort} from "../../../sort/sort";

@Component({
  selector: 'user-list',
  templateUrl:'./user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit {

  private partyId: string;
  private username: string;
  private _persons:Persons;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";
  private menuName:string = "users-menu";
  private _routerLinkCreateUser:string = "/parties/users/create";

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService) {

    let newPersons = new Persons();
    newPersons.page = new Page(0, 0, 0);
    newPersons.sort = new Sort();
    this.persons = newPersons;

  }


  ngOnInit(): void {
    this.partyEventService.menuChangeEvent.emit(this.menuName);
    this.getPersons()
  }

  get persons(): Persons {
    return this._persons;
  }

  set persons(value: Persons) {
    this._persons = value;
  }

  get routerLinkCreateUser(): string {
    return this._routerLinkCreateUser;
  }

  set routerLinkCreateUser(value: string) {
    this._routerLinkCreateUser = value;
  }

  getPersons() {
    this.partyService
    .getPersons(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.persons = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  onOpenModal(partyId: string, username: string) {
    this.partyId = partyId;
    this.username = username;
  }

  onDelete() {
    this.partyService
    .deletePerson(this.partyId)
    .subscribe(value => {
    this.getPersons();
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
  }

  onRequestPage(pageNumber:number) {
   this.defaultPage = pageNumber;
   this.getPersons();
  }

}
