import {Component, OnInit} from "@angular/core";
import { AttributeService } from "../attribute.service";
import {Attributes} from "../attributes";
import {Page} from "../../page/page";
import {Sort} from "../../sort/sort";
import {Router} from "@angular/router";

@Component({
  selector: 'attribute-list',
  templateUrl: './attribute.list.component.html',
  styleUrls: ['./attribute.list.component.css']
})
export class AttributeListComponent implements OnInit {

  private attributeId: string;
  private _attributes: Attributes;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

  constructor(private attributeService: AttributeService,
              private router: Router) {

     let newAttributes = new Attributes();
     newAttributes.page = new Page(0, 0, 0);
     newAttributes.sort = new Sort();
     this.attributes = newAttributes;
  }

  ngOnInit(): void {
    this.attributeService
    .getAttributes(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
    .subscribe(next => {
      console.log(next);
      this.attributes = next;
    }, error => {
      console.log(error);
    }, () => {
      console.log("complete");
    });
  }

  get attributes(): Attributes {
    return this._attributes;
  }

  set attributes(value: Attributes) {
    this._attributes = value;
  }

  onOpenModal(attributeId: string) {
    this.attributeId = attributeId
  }

  onDelete() {
    this.attributeService
    .deleteAttribute(this.attributeId)
    .subscribe(value => {
    this.router.navigate(['/attributes']);
    }, error => {
    console.log(error);
    }, () => {
    console.log("complete");
    });
  }

}
