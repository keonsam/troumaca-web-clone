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

  private attributeId: string;
  private _attributes: Attributes;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  private _routerLinkCreateAttribute = '/attributes/create';
  private _attributeName: string;

  constructor(private attributeService: AttributeService) {

     const newAttributes = new Attributes();
     newAttributes.page = new Page(0, 0, 0);
     newAttributes.sort = new Sort();
     this.attributes = newAttributes;
  }

  ngOnInit(): void {
    this.getAttributes();
  }

  getAttributes () {
    this.attributeService
    .getAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      console.log(next);
      this.attributes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log('complete');
    });
  }

  get attributeName(): string {
    return this._attributeName;
  }

  set attributeName(value: string) {
    this._attributeName = value;
  }

  get attributes(): Attributes {
    return this._attributes;
  }

  set attributes(value: Attributes) {
    this._attributes = value;
  }

  get routerLinkCreateAttribute(): string {
    return this._routerLinkCreateAttribute;
  }

  set routerLinkCreateAttribute(value: string) {
    this._routerLinkCreateAttribute = value;
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
