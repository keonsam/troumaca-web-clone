import {Component, OnInit} from '@angular/core';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import { Depreciation } from "../../depreciation";
import {DepreciationService} from '../../depreciation.service';
import {DepreciationMethod} from "../../depreciation.method";
import { map, filter, debounceTime } from "rxjs/operators";

@Component({
  selector: 'app-book-form',
  templateUrl: './book.form.component.html',
  styleUrls: ['./book.form.component.css']
})

export class BookFormComponent implements OnInit {

  private _depreciationMethod: DepreciationMethod[];
  private _assetId: FormControl;
  private _method: FormControl;
  private _purchaseDate: FormControl;
  private _cost: FormControl;
  private _salvageVal: FormControl;
  private _usefulLife: FormControl;
  private _unitProduced: FormControl;
  private _totalUnits: FormControl;

  private _depreciationForm: FormGroup;

  private _assetDataService: CompleterData;

  private pageSize: number;
  private depreciation: Depreciation;

  private _doNotDisplayFailureMessage: boolean;
  public requiredState: boolean;
  private depreciationExist = false;

  constructor(private depreciationService: DepreciationService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.depreciation = new Depreciation();
    this.depreciation.unitProduced = [];

    this.assetId = new FormControl('', [Validators.required]);
    this.method = new FormControl('', [Validators.required]);
    this.purchaseDate = new FormControl('', [Validators.required]);
    this.cost = new FormControl('', [Validators.required]);
    this.salvageVal = new FormControl('', [Validators.required]);
    this.usefulLife = new FormControl('');
    this.unitProduced = new FormControl('');
    this.totalUnits = new FormControl('');

    this.depreciationForm = formBuilder.group({
      'assetId': this.assetId,
      'method': this.method,
      'purchaseDate': this.purchaseDate,
      'cost': this.cost,
      'salvageVal': this.salvageVal,
      'usefulLife': this.usefulLife,
      'unitProduced': this.unitProduced,
      'totalUnits': this.totalUnits
    });

    this.pageSize = 15;

   this.depreciationForm
    .valueChanges
    .subscribe(value => {
      this.depreciation.methodId = value.method;
      this.depreciation.purchaseDate = value.purchaseDate;
      this.depreciation.cost = value.cost;
      this.depreciation.salvageVal = value.salvageVal;
      this.depreciation.usefulLife = value.usefulLife;
      this.depreciation.unitProduced = value.unitProduced.split(',');
      this.depreciation.totalUnits = value.totalUnits;
    }, error => {
      console.log(error);
    });

    this.doNotDisplayFailureMessage = true;
    this.requiredState = false;
  }

  ngOnInit(): void {
    this.depreciationService.getDepreciationMethod('book')
      .subscribe( methods => {
        if (methods) {
          this.depreciationMethod = methods;
        }
      });

    if (this.route.snapshot && this.route.snapshot.data['depreciation']) {
      this.setInputValues(this.route.snapshot.data['depreciation']);
    }

    this.depreciationForm.get('method').valueChanges
      .subscribe( value => {
        if (value === 'unit-of-production') {
          this.depreciationForm.get('unitProduced').setValidators([Validators.required]);
          this.depreciationForm.get('totalUnits').setValidators([Validators.required]);
          this.depreciationForm.get('usefulLife').setValidators(null);
          this.requiredState = true;
        } else {
          this.depreciationForm.get('unitProduced').setValidators(null);
          this.depreciationForm.get('totalUnits').setValidators(null);
          this.depreciationForm.get('usefulLife').setValidators([Validators.required]);
          this.requiredState = false;
        }
        this.depreciationForm.get('unitProduced').updateValueAndValidity();
        this.depreciationForm.get('totalUnits').updateValueAndValidity();
        this.depreciationForm.get('usefulLife').updateValueAndValidity();
        this.depreciationForm.updateValueAndValidity();
      });

    this.populateAssetIdDropDown();
  }

  private setInputValues(depreciation: Depreciation) {
    this.assetId.setValue(depreciation.assetName);
    this.method.setValue(depreciation.methodId);
    this.purchaseDate.setValue(depreciation.purchaseDate);
    this.cost.setValue(depreciation.cost);
    this.salvageVal.setValue(depreciation.salvageVal);
    this.usefulLife.setValue(depreciation.usefulLife);
    this.unitProduced.setValue(depreciation.unitProduced.join(','));
    this.totalUnits.setValue(depreciation.totalUnits);
    this.depreciationExist = true;
    this.depreciation = depreciation;
  }

  private populateAssetIdDropDown() {
    this.findAssets('');
    this.depreciationForm.get('assetId').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAssets(value);
      });
  }

  findAssets(value) {
    this.depreciationService
      .findAssets(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            assetId: v2.assetId,
            name: v2.assetTypeName
          };
        })
      }))
      .subscribe(next => { // update the data
        this.assetDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findAssets error - ' + error);
      });
  }

  get depreciationMethod(): DepreciationMethod[] {
    return this._depreciationMethod;
  }

  set depreciationMethod(value: DepreciationMethod[]) {
    this._depreciationMethod = value;
  }

  get assetId(): FormControl {
    return this._assetId;
  }

  set assetId(value: FormControl) {
    this._assetId = value;
  }

  get method(): FormControl {
    return this._method;
  }

  set method(value: FormControl) {
    this._method = value;
  }

  get purchaseDate(): FormControl {
    return this._purchaseDate;
  }

  set purchaseDate(value: FormControl) {
    this._purchaseDate = value;
  }

  get cost(): FormControl {
    return this._cost;
  }

  set cost(value: FormControl) {
    this._cost = value;
  }

  get salvageVal(): FormControl {
    return this._salvageVal;
  }

  set salvageVal(value: FormControl) {
    this._salvageVal = value;
  }

  get usefulLife(): FormControl {
    return this._usefulLife;
  }

  set usefulLife(value: FormControl) {
    this._usefulLife = value;
  }

  get unitProduced(): FormControl {
    return this._unitProduced;
  }

  set unitProduced(value: FormControl) {
    this._unitProduced = value;
  }

  get totalUnits(): FormControl {
    return this._totalUnits;
  }

  set totalUnits(value: FormControl) {
    this._totalUnits = value;
  }

  get depreciationForm(): FormGroup {
    return this._depreciationForm;
  }

  set depreciationForm(value: FormGroup) {
    this._depreciationForm = value;
  }

  get assetDataService(): CompleterData {
    return this._assetDataService;
  }

  set assetDataService(value: CompleterData) {
    this._assetDataService = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onAssetSelect(selected: CompleterItem) {
    this.depreciation.assetId = selected.originalObject.assetId;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.depreciationService.addDepreciation(this.depreciation, 'book')
      .subscribe(value => {
        if (value.depreciationId) {
          this.router.navigate(['/depreciation/book/schedule']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
      this.depreciationService.updateDepreciation(this.depreciation, 'book')
      .subscribe(value => {
        if (value) {
          this.router.navigate(['/depreciation/book/schedule']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/depreciation/book/schedule']);
  }

}
