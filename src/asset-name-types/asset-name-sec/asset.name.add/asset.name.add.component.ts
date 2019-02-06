import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AssetNameType} from '../../asset.name.type';
import {AssetNameTypeService} from '../../asset.name.type.service';

@Component({
  selector: 'app-asset-name-add',
  templateUrl: './asset.name.add.component.html',
  styleUrls: ['./asset.name.add.component.css']
})

export class AssetNameAddComponent implements OnInit {

  assetNameType: FormControl;

  assetNameTypeForm: FormGroup;
  assetNameTypes: AssetNameType[];
  private pageSize = 5;
  @Output() selectedChar: EventEmitter<AssetNameType[]> = new EventEmitter();
  @Output() previous: EventEmitter<boolean> = new EventEmitter();
  @Input() selected: string[];

  constructor(private assetNameTypeService: AssetNameTypeService,
              private formBuilder: FormBuilder) {
    this.assetNameType = new FormControl('', [Validators.required]);
    this.assetNameTypeForm = formBuilder.group({
      'assetNameType': this.assetNameType
    });
  }

  ngOnInit(): void {
    this.findAssetNameTypes('');
    if (this.selected) {
      this.assetNameType.setValue(this.selected);
    }
  }

  private findAssetNameTypes(value) {
    this.assetNameTypeService
      .findAssetNameTypes(value, this.pageSize)
      .subscribe(next => { // update the data
        this.assetNameTypes = next;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  onNoClick(): void {
    this.previous.emit(true);
  }

  onAdd(): void {
    this.selectedChar.emit(this.assetNameTypes.filter(x => this.assetNameType.value.indexOf(x.assetNameTypeId) >= 0));
  }

}
