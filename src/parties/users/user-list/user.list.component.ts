import {Component, OnInit} from "@angular/core";
import {Users} from "../../users";
import {PartyEventService} from "../../party.event.service";
import {PartyService} from "../../party.service";
import {Page} from "../../../page/page";
import {Sort} from "../../../sort/sort";
import {PartyAccessRole} from "../../party.access.role";

@Component({
  selector: 'user-list',
  templateUrl:'./user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit {

  private partyId: string;
  private username: string;
  private _users:Users;
  private _partyAccessRoles: PartyAccessRole[];
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";
  private menuName:string = "users-menu";
  private _routerLinkCreateUser:string = "/parties/users/create";

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService) {

    let newUsers = new Users();
    newUsers.page = new Page(0, 0, 0);
    newUsers.sort = new Sort();
    this.users = newUsers;

  }


  ngOnInit(): void {
    this.partyEventService.menuChangeEvent.emit(this.menuName);
    this.getPartyAccessRoles();
    this.getUsers();
  }

  get users(): Users {
    return this._users;
  }

  set users(value: Users) {
    this._users = value;
  }

  get partyAccessRoles(): PartyAccessRole[] {
    return this._partyAccessRoles;
  }

  set partyAccessRoles(value: PartyAccessRole[]) {
    this._partyAccessRoles = value;
  }

  get routerLinkCreateUser(): string {
    return this._routerLinkCreateUser;
  }

  set routerLinkCreateUser(value: string) {
    this._routerLinkCreateUser = value;
  }

  getPartyAccessRoles() {
    this.partyService
      .getPartyAccessRoles()
      .subscribe(next => {
        this.partyAccessRoles = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log("complete");
      });
  }

  getUsers() {
    this.partyService
    .getUsers(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.users = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  getUserAccessRole(partyId) {
    let values = [];
    this.partyAccessRoles.forEach(value => {
      if(value.partyId === partyId && value.accessRole.name) {
        values.push(value.accessRole.name);
      }
    });
    return values;
  }

  onOpenModal(partyId: string, username: string) {
    this.partyId = partyId;
    this.username = username;
  }

  onDelete() {
    this.partyService
    .deleteUser(this.partyId)
    .subscribe(value => {
    this.getUsers();
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
  }

  onRequestPage(pageNumber:number) {
   this.defaultPage = pageNumber;
   this.getUsers();
  }

}
