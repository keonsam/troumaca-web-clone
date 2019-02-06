import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {AssetCharacteristicService} from '../../asset.characteristic.service';
import {AssetCharacteristic} from '../../asset.characteristic';

@Component({
  selector: 'app-asset-characteristic-add',
  templateUrl: './asset.characteristic.add.component.html',
  styleUrls: ['./asset.characteristic.add.component.css']
})

export class AssetCharacteristicAddComponent implements OnInit {

  assetCharacteristic: FormControl;

  assetCharacteristicForm: FormGroup;
  assetCharacteristics: AssetCharacteristic[];
  private pageSize = 5;
  @Output() selectedChar: EventEmitter<AssetCharacteristic[]> = new EventEmitter();
  @Output() previous: EventEmitter<boolean> = new EventEmitter();
  @Input() selected: string[];

  constructor(private assetCharacteristicService: AssetCharacteristicService,
              private formBuilder: FormBuilder) {
    this.assetCharacteristic = new FormControl('', [Validators.required]);
    this.assetCharacteristicForm = formBuilder.group({
      'assetCharacteristic': this.assetCharacteristic
    });
  }

  ngOnInit(): void {
    this.findAssetCharacteristics('');
    if (this.selected) {
      this.assetCharacteristic.setValue(this.selected);
    }
  }

  private findAssetCharacteristics(value) {
    this.assetCharacteristicService
      .findAssetCharacteristics(value, this.pageSize)
      .subscribe(next => { // update the data
        this.assetCharacteristics = next;
      }, error => {
        console.log('findAccessRole error - ' + error);
      });
  }

  onNoClick(): void {
    this.previous.emit(true);
  }

  onAdd(): void {
    this.selectedChar.emit(this.assetCharacteristics.filter(x => this.assetCharacteristic.value.indexOf(x.assetCharacteristicId) >= 0));
  }

}
