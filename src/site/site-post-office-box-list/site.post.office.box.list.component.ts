import {Component, OnInit} from '@angular/core';
import {PostOfficeBoxes} from '../post.office.boxes';
import {SiteService} from '../site.service';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'site-post-office-pox-list',
  templateUrl: './site.post.office.box.list.component.html',
  styleUrls: ['./site.post.office.box.list.component.css']
})
export class SitePostOfficeBoxListComponent implements OnInit {

  private postOfficeBoxId: string;
  private _postOfficeBoxes: PostOfficeBoxes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreatePostOfficeBox = '/sites/post-office-boxes/create';
  private _postOfficeBoxName: string;

  constructor(private siteService: SiteService) {
    const newPostOfficeBoxes = new PostOfficeBoxes();
    newPostOfficeBoxes.page = new Page(0, 0, 0);
    newPostOfficeBoxes.sort = new Sort();
    this.postOfficeBoxes = newPostOfficeBoxes;
  }

  ngOnInit(): void {
    this.getPostOfficeBoxes();
  }

  get postOfficeBoxName(): string {
    return this._postOfficeBoxName;
  }

  set postOfficeBoxName(value: string) {
    this._postOfficeBoxName = value;
  }

  get postOfficeBoxes(): PostOfficeBoxes {
    return this._postOfficeBoxes;
  }

  set postOfficeBoxes(value: PostOfficeBoxes) {
    this._postOfficeBoxes = value;
  }
  get routerLinkCreatePostOfficeBox(): string {
    return this._routerLinkCreatePostOfficeBox;
  }

  set routerLinkCreatePostOfficeBox(value: string) {
    this._routerLinkCreatePostOfficeBox = value;
  }

  getPostOfficeBoxes() {
  this.siteService
    .getPostOfficeBoxes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.postOfficeBoxes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(postOfficeBoxId: string, postOfficeBoxName: string) {
    this.postOfficeBoxId = postOfficeBoxId;
    this.postOfficeBoxName = postOfficeBoxName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.siteService
        .deletePostOfficeBox(this.postOfficeBoxId)
        .subscribe(value => {
          if (value) {
            this.getPostOfficeBoxes();
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
   this.getPostOfficeBoxes();
  }

}
