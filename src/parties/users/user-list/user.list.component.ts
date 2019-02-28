import {Component, OnInit} from '@angular/core';
import {Users} from '../../users';
import {Page} from '../../../page/page';
import {Sort} from '../../../sort/sort';
import { UserService } from '../user.service';
import {MatDialog, PageEvent} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {USER} from '../../../app/routes';
import {DeleteModalComponent} from '../../../delete-modal/delete.modal.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user.list.component.html',
  styleUrls: ['./user.list.component.css']
})
export class UserListComponent implements OnInit {

  username: string;
  users: Users;
  link = `/${USER}`;
  routerLinkCreateUser = `/${this.link}/create`;


  private partyId: string;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              public dialog: MatDialog) {

    const newUsers = new Users();
    newUsers.page = new Page(0, 0, 0);
    newUsers.sort = new Sort();
    this.users = newUsers;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['users']) {
      this.users = this.route.snapshot.data['users'];
    }
  }

  private getUsers() {
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
    const dialogRef = this.dialog.open(DeleteModalComponent, {
      maxWidth: '300px',
      data: {name: this.username}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) {
        this.onDelete(result);
      }
    });
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

  onRequestPage(pageEvent: PageEvent) {
   this.defaultPage = pageEvent.pageIndex + 1;
   this.defaultPageSize = pageEvent.pageSize;
   this.getUsers();
  }
}
