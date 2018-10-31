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
  username: string;
  users: Users;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private menuName = 'users-menu';
  routerLinkCreateUser = '/parties/users/create';

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

  private getUsers() {
    this.userService
    .getUsers(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      if (next && next.users.length > 0) {
        this.users = next;
      }
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

  onDelete(deleted: boolean) {
    if (deleted) {
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
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getUsers();
  }

}
