import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AssetCharacteristic} from '../asset.characteristic';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AssignedCharacteristic} from '../assigned.characteristic';
import {debounceTime, filter} from 'rxjs/operators';
import {AssetCharacteristicService} from '../asset.characteristic.service';

@Component({
  selector: 'app-asset-characteristic-sec',
  templateUrl: './asset.characteristic.sec.component.html',
  styleUrls: ['./asset.characteristic.sec.component.css']
})

export class AssetCharacteristicSecComponent implements OnInit {

  ids: FormControl;
  chars: AssetCharacteristic[];
  @Input() parentForm: FormGroup;
  characteristics: FormArray;
  activePane = 'left';
  @Input() assignedChars: AssignedCharacteristic[];
  @Input() asset: boolean;

  private selected: string[];
  private pageSize = 5;
  @Output() panel: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private assetCharacteristicService: AssetCharacteristicService) {
    this.chars = [];
    this.selected = [];
    this.ids = new FormControl('');
  }

  ngOnInit(): void {
    this.populateCharsDropDown();
    if (this.assignedChars) {
      this.setAssigned(this.assignedChars);
    }
  }

  private populateCharsDropDown() {
    this.findChars('');
    this.ids.valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findChars(value);
      });
  }

  private findChars(value) {
    this.assetCharacteristicService
      .findAssetCharacteristics(value, this.pageSize) // send search request to the backend
      .subscribe(next => { // update the data
        this.chars = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  private createItem(x: any): FormGroup {
    return this.formBuilder.group({
      assetCharacteristicId: x.assetCharacteristicId,
      name: x.name,
      value: x.value || x.defaultValue,
      min: x.minValue,
      max: x.maxValue,
      unit: x.unitOfMeasureId
    });
  }

  onCharSelect(char: AssetCharacteristic) {
    this.characteristics = this.parentForm.get('characteristics') as FormArray;
    if (this.selected.indexOf(char.assetCharacteristicId) < 0) {
      this.characteristics.push(this.createItem(char));
      this.selected.push(char.assetCharacteristicId);
      this.ids.setValue('');
    }
  }

  private setAssigned(assigned: AssignedCharacteristic[]) {
    this.selected = assigned.map(x => x.assetCharacteristicId);
    this.characteristics = this.parentForm.get('characteristics') as FormArray;
    assigned.forEach(x => this.characteristics.push(this.createItem(x)));
  }

  onRemove(i: number) {
    this.characteristics.removeAt(i);
    this.selected = this.selected.filter((x, e) => e !== i);
  }

}
