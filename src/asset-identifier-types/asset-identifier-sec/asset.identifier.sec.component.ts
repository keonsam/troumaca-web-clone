import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AssetIdentifier} from '../asset.identifier';
import {AssetIdentifierTypeService} from '../asset.identifier.type.service';
import {debounceTime, filter} from 'rxjs/operators';
import {AssetIdentifierType} from '../asset.identifier.type';

@Component({
  selector: 'app-asset-identifier-sec',
  templateUrl: './asset.identifier.sec.component.html',
  styleUrls: ['./asset.identifier.sec.component.css'],
})

export class AssetIdentifierSecComponent implements OnInit, OnChanges {

  ids: FormControl;
  @Input() parentForm: FormGroup;
  assetIds: AssetIdentifierType[];
  identifiers: FormArray;
  @Input() assetIdentifiers: AssetIdentifier[];

  private selected: string[];
  private pageSize = 5;
  @Output() panel: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private assetIdentifierTypeService: AssetIdentifierTypeService) {
    this.assetIds = [];
    this.selected = [];
    this.ids = new FormControl('');
  }

  ngOnInit(): void {
    this.populateIdDropDown();
    if (this.assetIdentifiers) {
      this.setAssigned(this.assetIdentifiers);
    }
  }

  private populateIdDropDown() {
    this.findIds('');
    this.ids.valueChanges
      .pipe(debounceTime(1000))
      .subscribe(value => {
        this.findIds(value);
      });
  }

  private findIds(value) {
    this.assetIdentifierTypeService
      .findAssetIdentifierTypes(value, this.pageSize) // send search request to the backend
      .subscribe(next => { // update the data
        this.assetIds = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  ngOnChanges(): void {
    if (this.assetIdentifiers) {
      this.setAssigned(this.assetIdentifiers);
    }
  }

  createItem(x: any): FormGroup {
    return this.formBuilder.group({
      assetIdentifierTypeId: x.assetIdentifierTypeId,
      name: x.name,
      value: x.value,
    });
  }

  onIdSelect(id: AssetIdentifierType) {
    this.identifiers = this.parentForm.get('identifiers') as FormArray;
    if (this.selected.indexOf(id.assetIdentifierTypeId) < 0) {
      this.identifiers.insert(0, this.createItem(id));
      this.selected.unshift(id.assetIdentifierTypeId);
      this.ids.setValue('');
    }
  }

  private setAssigned(assigned: AssetIdentifier[]) {
    this.selected = assigned.map(x => x.assetIdentifierTypeId);
    this.identifiers = this.parentForm.get('identifiers') as FormArray;
    assigned.forEach(x => this.identifiers.push(this.createItem(x)));
  }

  onRemove(i: number) {
    this.identifiers.removeAt(i);
    this.selected = this.selected.filter((x, e) => e !== i);
  }
}
