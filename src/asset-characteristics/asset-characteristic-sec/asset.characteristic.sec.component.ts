import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {AssetCharacteristic} from '../asset.characteristic';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssignedCharacteristic} from '../assigned.characteristic';

@Component({
  selector: 'app-asset-characteristic-sec',
  templateUrl: './asset.characteristic.sec.component.html',
  styleUrls: ['./asset.characteristic.sec.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})

export class AssetCharacteristicSecComponent implements OnInit, OnChanges {

  chars: AssetCharacteristic[];
  @Input() parentForm: FormGroup;
  characteristics: FormArray;
  activePane = 'left';
  @Input() assignedChars: AssignedCharacteristic[];
  @Input() asset: boolean;

  private selected: string[];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.assignedChars) {
      this.onSelectedChar(this.assignedChars);
    }
  }

  ngOnChanges(): void {
    if (this.assignedChars) {
      this.onSelectedChar(this.assignedChars);
    }
  }

  createItem(x: AssignedCharacteristic): FormGroup {
    if (this.asset) {
      return this.formBuilder.group({
        assetCharacteristicId: x.assetCharacteristicId,
        name: x.name,
        effectiveDate: x.effectiveDate,
        untilDate: x.untilDate,
        charVal: x.charVal,
      }, {
        validators: x.optional ? Validators.required : null
      });
    } else {
      return this.formBuilder.group({
        assetCharacteristicId: x.assetCharacteristicId,
        name: x.name,
        effectiveDate: x.effectiveDate,
        untilDate: x.untilDate,
        optional: !!x.optional,
      });
    }
  }

  onSelectedChar(assetCharacteristics: any[]) {
    if (assetCharacteristics && assetCharacteristics.length > 0) {
      if (!this.characteristics) {
        this.characteristics = this.parentForm.get('characteristics') as FormArray;
      }
      let newAssetCharacteristics = assetCharacteristics;
      if (this.selected) {
        newAssetCharacteristics = assetCharacteristics.filter( x => this.selected.indexOf(x.assetCharacteristicId) === -1);
      }
      newAssetCharacteristics.forEach(x => this.characteristics.push(this.createItem(x)));
      this.selected = assetCharacteristics.map(x => x.assetCharacteristicId);
    }
    this.activePane = 'left';
  }

  onRemove(i: number) {
    this.characteristics.removeAt(i);
  }
}
