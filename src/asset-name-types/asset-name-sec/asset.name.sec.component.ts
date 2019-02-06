import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssetName} from '../asset.name';

@Component({
  selector: 'app-asset-name-sec',
  templateUrl: './asset.name.sec.component.html',
  styleUrls: ['./asset.name.sec.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})

export class AssetNameSecComponent implements OnInit, OnChanges {

  @Input() parentForm: FormGroup;
  names: FormArray;
  activePane = 'left';
  @Input() assetNames: AssetName[];

  private selected: string[];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.assetNames) {
      this.onSelectedChar(this.assetNames, true);
    }
  }

  ngOnChanges(): void {
    if (this.assetNames) {
      this.onSelectedChar(this.assetNames, true);
    }
  }

  createItem(x: AssetName, update: boolean): FormGroup {
    return this.formBuilder.group({
      assetNameTypeId: x.assetNameTypeId,
      name: x.name,
      nameVal: x.nameVal,
      description: update ? x.description : '',
      effectiveDate: x.effectiveDate,
      untilDate: x.untilDate,
    });
  }

  onSelectedChar(assetNames: any[], update?: boolean) {
    if (assetNames && assetNames.length > 0) {
      if (!this.names) {
        this.names = this.parentForm.get('names') as FormArray;
      }
      let newAssetNames = assetNames;
      if (this.selected) {
        newAssetNames = assetNames.filter( x => this.selected.indexOf(x.assetNameTypeId) === -1);
      }
      newAssetNames.forEach(x => this.names.push(this.createItem(x, update)));
      this.selected = assetNames.map(x => x.assetNameTypeId);
    }
    this.activePane = 'left';
  }

  onRemove(i: number) {
    this.names.removeAt(i);
  }
}
