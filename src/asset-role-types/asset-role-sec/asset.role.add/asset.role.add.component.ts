import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AssetRoleType} from '../../asset.role.type';
import {AssetRoleTypeService} from '../../asset.role.type.service';

@Component({
  selector: 'app-asset-role-add',
  templateUrl: './asset.role.add.component.html',
  styleUrls: ['./asset.role.add.component.css']
})

export class AssetRoleAddComponent implements OnInit {

  assetRoleType: FormControl;

  assetRoleTypeForm: FormGroup;
  assetRoleTypes: AssetRoleType[];
  private pageSize = 5;
  @Output() selectedChar: EventEmitter<AssetRoleType[]> = new EventEmitter();
  @Output() previous: EventEmitter<boolean> = new EventEmitter();
  @Input() selected: string[];

  constructor(private assetRoleTypeService: AssetRoleTypeService,
              private formBuilder: FormBuilder) {
    this.assetRoleType = new FormControl('', [Validators.required]);
    this.assetRoleTypeForm = formBuilder.group({
      'assetRoleType': this.assetRoleType
    });
  }

  ngOnInit(): void {
    this.findAssetRoleTypes('');
    if (this.selected) {
      this.assetRoleType.setValue(this.selected);
    }
  }

  private findAssetRoleTypes(value) {
    this.assetRoleTypeService
      .findAssetRoleTypes(value, this.pageSize)
      .subscribe(next => { // update the data
        this.assetRoleTypes = next;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  onNoClick(): void {
    this.previous.emit(true);
  }

  onAdd(): void {
    this.selectedChar.emit(this.assetRoleTypes.filter(x => this.assetRoleType.value.indexOf(x.assetRoleTypeId) >= 0));
  }

}
