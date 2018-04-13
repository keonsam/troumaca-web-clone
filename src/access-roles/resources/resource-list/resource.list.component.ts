import {Component, OnInit} from "@angular/core";
import {AccessRoleService} from "../../access.role.service";
import {Page} from "../../../page/page";
import {Sort} from "../../../sort/sort";
import {Resources} from "../../resources";

@Component({
  selector: 'resource-list',
  templateUrl: './resource.list.component.html',
  styleUrls: ['./resource.list.component.css']
})
export class ResourceListComponent implements OnInit {
  private resourceId: string;
  private _resources: Resources;
  private resourceName: string;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

  constructor(private accessRoleService: AccessRoleService){
    let newResources = new Resources();
    newResources.page = new Page();
    newResources.sort = new Sort();
    this.resources = newResources;
  }


  ngOnInit(): void {
    this.getResources();
  }

  getResources() {
    this.accessRoleService.getResources(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.resources = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log("complete");
      });
  }

  get resources(): Resources {
    return this._resources;
  }

  set resources(value: Resources) {
    this._resources = value;
  }

  onOpenModal(resourceId:string, resourceName: string){
    this.resourceId = resourceId;
    this.resourceName = resourceName
  }

  onDelete() {
    this.accessRoleService.deleteResource(this.resourceId)
      .subscribe(next => {
        if(next) {
          this.getResources();
        }
      });
  }

  onRequestPage(pageNumber:number) {
    this.defaultPage = pageNumber;
    this.getResources();
  }
}
