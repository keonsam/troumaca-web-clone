import {Component, OnInit} from "@angular/core";
import {AccessRoleService} from "../../access.role.service";
import {Page} from "../../../page/page";
import {Sort} from "../../../sort/sort";
import {Permissions} from "../../permissions";
import {Assets} from "../../../assets/assets";

@Component({
  selector: 'permission-list',
  templateUrl: './permission.list.component.html',
  styleUrls: ['./permission.list.component.css']
})
export class PermissionListComponent implements OnInit {
  private permissionId: string;
  private _permissions: Permissions;
  private permissionName: string;
  private defaultPage:number = 1;
  private defaultPageSize:number = 10;
  private defaultSortOrder = "asc";

  constructor(private accessRoleService: AccessRoleService){
    let newPermissions = new Permissions();
    newPermissions.page = new Page();
    newPermissions.sort = new Sort();
    this.permissions = newPermissions;
  }


  ngOnInit(): void {
    this.getPermissions();
  }

  getPermissions() {
    this.accessRoleService.getPermissions(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.permissions = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log("complete");
      });
  }

  get permissions(): Permissions {
    return this._permissions;
  }

  set permissions(value: Permissions) {
    this._permissions = value;
  }

  onOpenModal(permissionId:string, permissionName: string){
    this.permissionId = permissionId;
    this.permissionName = permissionName
  }

  onDelete() {
    this.accessRoleService.deletePermission(this.permissionId)
      .subscribe(next => {
        if(next) {
          this.getPermissions();
        }
      });
  }

  onRequestPage(pageNumber:number) {
    this.defaultPage = pageNumber;
    this.getPermissions();
  }
}
