import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { AssetIdentifierType} from '../../asset.identifier.type';
import {AssetIdentifierTypeService} from '../../asset.identifier.type.service';

@Component({
  selector: 'app-asset-identifier-add',
  templateUrl: './asset.identifier.add.component.html',
  styleUrls: ['./asset.identifier.add.component.css']
})

export class AssetIdentifierAddComponent implements OnInit, OnChanges {

  assetIdentifierType: FormControl;

  assetIdentifierTypeForm: FormGroup;
  assetIdentifierTypes: AssetIdentifierType[];
  private pageSize = 5;
  @Output() selectedChar: EventEmitter<AssetIdentifierType[]> = new EventEmitter();
  @Output() previous: EventEmitter<boolean> = new EventEmitter();
  @Input() selected: string[];

  constructor(private assetIdentifierTypeService: AssetIdentifierTypeService,
              private formBuilder: FormBuilder) {
    this.assetIdentifierType = new FormControl('', [Validators.required]);
    this.assetIdentifierTypeForm = formBuilder.group({
      'assetIdentifierType': this.assetIdentifierType
    });
  }

  ngOnInit(): void {
    this.findAssetIdentifierTypes('');
    if (this.selected) {
      this.assetIdentifierType.setValue(this.selected);
    }
  }

  ngOnChanges(): void {
    this.assetIdentifierType.setValue(this.selected);
  }

  private findAssetIdentifierTypes(value) {
    this.assetIdentifierTypeService
      .findAssetIdentifierTypes(value, this.pageSize)
      .subscribe(next => { // update the data
        this.assetIdentifierTypes = next;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  onNoClick(): void {
    this.previous.emit(true);
  }

  onAdd(): void {
    this.selectedChar.emit(this.assetIdentifierTypes.filter(x => this.assetIdentifierType.value.indexOf(x.assetIdentifierTypeId) >= 0));
  }

}
