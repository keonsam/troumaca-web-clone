import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AssetRole} from '../asset.role';
import {AssetRoleTypeService} from '../asset.role.type.service';
import {AssetRoleType} from '../asset.role.type';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-asset-role-sec',
  templateUrl: './asset.role.sec.component.html',
  styleUrls: ['./asset.role.sec.component.css']
})

export class AssetRoleSecComponent implements OnInit, OnChanges {

  ids: FormControl;
  types: AssetRoleType[];
  @Input() parentForm: FormGroup;
  roles: FormArray;
  @Input() assetRoles: AssetRole[];

  private selected: string[];
  private pageSize = 5;
  @Output() panel: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private assetRoleTypeService: AssetRoleTypeService) {
    this.types = [];
    this.selected = [];
    this.ids = new FormControl('');
  }

  ngOnInit(): void {
    this.populateIdDropDown();
    if (this.assetRoles) {
      this.setAssigned(this.assetRoles);
    }
  }

  private populateIdDropDown() {
    this.findIds('');
    this.ids.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findIds(value);
      });
  }

  private findIds(value) {
    this.assetRoleTypeService
      .findAssetRoleTypes(value, this.pageSize) // send search request to the backend
      .subscribe(next => { // update the data
        this.types = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  ngOnChanges(): void {
    if (this.assetRoles) {
      this.setAssigned(this.assetRoles);
    }
  }

  private createItem(x: any): FormGroup {
    return this.formBuilder.group({
      assetRoleTypeId: x.assetRoleTypeId,
      name: x.name,
      value: x.value,
      sequenceNum: x.sequenceNum,
    });
  }

  onSelect(id: AssetRoleType) {
    this.roles = this.parentForm.get('roles') as FormArray;
    if (this.selected.indexOf(id.assetRoleTypeId) < 0) {
      this.roles.push(this.createItem(id));
      this.selected.push(id.assetRoleTypeId);
      this.ids.setValue('');
    }
  }

  private setAssigned(assigned: AssetRole[]) {
    this.selected = assigned.map(x => x.assetRoleTypeId);
    this.roles = this.parentForm.get('roles') as FormArray;
    assigned.forEach(x => this.roles.push(this.createItem(x)));
  }

  onRemove(i: number) {
    this.roles.removeAt(i);
    this.selected = this.selected.filter((x, e) => e !== i);
  }
}
