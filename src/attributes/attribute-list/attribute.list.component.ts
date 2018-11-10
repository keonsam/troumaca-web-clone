import {Component, OnInit} from '@angular/core';
import { AttributeService } from '../attribute.service';
import {Attributes} from '../attributes';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';

@Component({
  selector: 'attribute-list',
  templateUrl: './attribute.list.component.html',
  styleUrls: ['./attribute.list.component.css']
})
export class AttributeListComponent implements OnInit {

  attributeId: string;
  attributes: Attributes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  routerLinkCreateAttribute = '/attributes/create';
  attributeName: string;

  constructor(private attributeService: AttributeService) {

     const newAttributes = new Attributes();
     newAttributes.page = new Page(0, 0, 0);
     newAttributes.sort = new Sort();
     this.attributes = newAttributes;
  }

  ngOnInit(): void {
    this.getAttributes();
  }

  private getAttributes () {
    this.attributeService
    .getAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      this.attributes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  onOpenModal(attributeId: string, attributeName: string ) {
    this.attributeId = attributeId;
    this.attributeName = attributeName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.attributeService
        .deleteAttribute(this.attributeId)
        .subscribe(value => {
          this.getAttributes();
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }

  onRequestPage(pageNumber: number) {
   this.defaultPage = pageNumber;
   this.getAttributes();
  }
}
