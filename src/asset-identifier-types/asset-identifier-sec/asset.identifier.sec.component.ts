import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup} from '@angular/forms';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {AssetIdentifier} from '../asset.identifier';

@Component({
  selector: 'app-asset-identifier-sec',
  templateUrl: './asset.identifier.sec.component.html',
  styleUrls: ['./asset.identifier.sec.component.css'],
  animations: [
    trigger('slide', [
      state('left', style({ transform: 'translateX(0)' })),
      state('right', style({ transform: 'translateX(-50%)' })),
      transition('* => *', animate(300))
    ])
  ]
})

export class AssetIdentifierSecComponent implements OnInit, OnChanges {

  @Input() parentForm: FormGroup;
  identifiers: FormArray;
  activePane = 'left';
  @Input() assetIdentifiers: AssetIdentifier[];

  private selected: string[];

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.assetIdentifiers) {
      this.onSelectedChar(this.assetIdentifiers);
    }
  }

  ngOnChanges(): void {
    if (this.assetIdentifiers) {
      this.onSelectedChar(this.assetIdentifiers);
    }
  }

  createItem(x: AssetIdentifier): FormGroup {
    return this.formBuilder.group({
      assetIdentifierTypeId: x.assetIdentifierTypeId,
      name: x.name,
      identifierVal: x.identifierVal,
      effectiveDate: x.effectiveDate,
      untilDate: x.untilDate,
    });
  }

  onSelectedChar(assetIdentifiers: any[]) {
    if (assetIdentifiers && assetIdentifiers.length > 0) {
      if (!this.identifiers) {
        this.identifiers = this.parentForm.get('identifiers') as FormArray;
      }
      let newAssetIdentifiers = assetIdentifiers;
      if (this.selected) {
        newAssetIdentifiers = assetIdentifiers.filter( x => this.selected.indexOf(x.assetIdentifierTypeId) === -1);
      }
      newAssetIdentifiers.forEach(x => this.identifiers.push(this.createItem(x)));
    }
    this.selected = assetIdentifiers.map(x => x.assetIdentifierTypeId);

    this.activePane = 'left';
  }

  onRemove(i: number) {
    this.identifiers.removeAt(i);
    this.selected = this.selected.filter((x, e) => e !== i);
  }
}
