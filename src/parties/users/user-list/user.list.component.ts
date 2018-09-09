import {Component, OnInit} from '@angular/core';
import {Users} from '../../users';
import {PartyEventService} from '../../party.event.service';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit {

  private partyId: string;
  private _username: string;
  private _users: Users;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private menuName = 'users-menu';
  private _routerLinkCreateUser = '/parties/users/create';

  constructor(private partyEventService: PartyEventService,
              private userService: UserService) {

    const newUsers = new Users();
    newUsers.page = new Page(0, 0, 0);
    newUsers.sort = new Sort();
    this.users = newUsers;

  }


  ngOnInit(): void {
    this.partyEventService.menuChangeEvent.emit(this.menuName);
    this.getUsers();
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }

  get users(): Users {
    return this._users;
  }

  set users(value: Users) {
    this._users = value;
  }

  get routerLinkCreateUser(): string {
    return this._routerLinkCreateUser;
  }

  set routerLinkCreateUser(value: string) {
    this._routerLinkCreateUser = value;
  }

  getUsers() {
    this.userService
    .getUsers(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.users = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(partyId: string, username: string) {
    this.partyId = partyId;
    this.username = username;
  }

  onDelete() {
    this.userService
    .deleteUser(this.partyId)
    .subscribe(value => {
      if (value) {
        this.getUsers();
      }
    }, error => {
    console.log(error);
    }, () => {
    console.log('complete');
    });
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getUsers();
  }

}
