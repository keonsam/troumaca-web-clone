import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssetRole} from '../asset.role';

@Component({
  selector: 'app-asset-role-sec',
  templateUrl: './asset.role.sec.component.html',
  styleUrls: ['./asset.role.sec.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})

export class AssetRoleSecComponent implements OnInit, OnChanges {

  @Input() parentForm: FormGroup;
  roles: FormArray;
  activePane = 'left';
  @Input() assetRoles: AssetRole[];

  private selected: string[];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.assetRoles) {
      this.onSelectedChar(this.assetRoles);
    }
  }

  ngOnChanges(): void {
    if (this.assetRoles) {
      this.onSelectedChar(this.assetRoles);
    }
  }

  createItem(x: AssetRole): FormGroup {
    return this.formBuilder.group({
      assetRoleTypeId: x.assetRoleTypeId,
      name: x.name,
      sequenceNum: x.sequenceNum,
      effectiveDate: x.effectiveDate,
      untilDate: x.untilDate,
    });
  }

  onSelectedChar(assetRoles: any[]) {
    if (assetRoles && assetRoles.length > 0) {
      if (!this.roles) {
        this.roles = this.parentForm.get('roles') as FormArray;
      }
      let newAssetRoles = assetRoles;
      if (this.selected) {
        newAssetRoles = assetRoles.filter( x => this.selected.indexOf(x.assetRoleTypeId) === -1);
      }
      newAssetRoles.forEach(x => this.roles.push(this.createItem(x)));
      this.selected = assetRoles.map(x => x.assetRoleTypeId);
    }
    this.activePane = 'left';
  }

  onRemove(i: number) {
    this.roles.removeAt(i);
    this.selected = this.selected.filter((x, e) => e !== i);
  }
}
