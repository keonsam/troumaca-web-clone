import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AssetName} from '../asset.name';
import {AssetNameTypeService} from '../asset.name.type.service';
import {AssetNameType} from '../asset.name.type';
import {debounceTime, filter} from 'rxjs/operators';

@Component({
  selector: 'app-asset-name-sec',
  templateUrl: './asset.name.sec.component.html',
  styleUrls: ['./asset.name.sec.component.css'],
})

export class AssetNameSecComponent implements OnInit, OnChanges {

  ids: FormControl;
  types: AssetNameType[];
  @Input() parentForm: FormGroup;
  names: FormArray;
  @Input() assetNames: AssetName[];

  private selected: string[];
  private pageSize = 5;
  @Output() panel: EventEmitter<string> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private assetNameTypeService: AssetNameTypeService) {
    this.types = [];
    this.selected = [];
    this.ids = new FormControl('');
  }

  ngOnInit(): void {
    this.populateIdDropDown();
    if (this.assetNames) {
      this.setAssigned(this.assetNames);
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
    this.assetNameTypeService
      .findAssetNameTypes(value, this.pageSize) // send search request to the backend
      .subscribe(next => { // update the data
        this.types = next;
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  ngOnChanges(): void {
    if (this.assetNames) {
      this.setAssigned(this.assetNames);
    }
  }

  createItem(x: any): FormGroup {
    return this.formBuilder.group({
      assetNameTypeId: x.assetNameTypeId,
      name: x.name,
      value: x.value,
    });
  }

  onSelect(id: AssetNameType) {
    this.names = this.parentForm.get('names') as FormArray;
    if (this.selected.indexOf(id.assetNameTypeId) < 0) {
      this.names.insert(0, this.createItem(id));
      this.selected.unshift(id.assetNameTypeId);
      this.ids.setValue('');
    }
  }

  private setAssigned(assigned: AssetName[]) {
    this.selected = assigned.map(x => x.assetNameTypeId);
    this.names = this.parentForm.get('names') as FormArray;
    assigned.forEach(x => this.names.push(this.createItem(x)));
  }

  onRemove(i: number) {
    this.names.removeAt(i);
    this.selected = this.selected.filter((x, e) => e !== i);
  }
}
