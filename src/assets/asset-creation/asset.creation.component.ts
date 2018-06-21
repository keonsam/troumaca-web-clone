import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/filter';
import {Asset} from '../asset';
import {AssetKind} from '../asset.kind';
import {Router} from '@angular/router';

@Component({
  selector: 'asset-creation',
  templateUrl: './asset.creation.component.html',
  styleUrls: ['./asset.creation.component.css']
})

export class AssetCreationComponent implements OnInit {

  private _assetKindId: FormControl;
  private _assetType: FormControl;
  private _serialNumber: FormControl;
  private _quantity: FormControl;
  private _unitOfMeasure: FormControl;
  private _site: FormControl;
  private _person: FormControl;
  private _description: FormControl;


  private _assetForm: FormGroup;

  private _assetKinds: AssetKind[];
  private _assetTypeDataService: CompleterData;
  private _unitOfMeasureDataService: CompleterData;
  private _siteDataService: CompleterData;
  private _personDataService: CompleterData;

  private pageSize: number;
  private asset: Asset;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private assetService: AssetService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.assetKindId = new FormControl('', [Validators.required]);
    this.assetType = new FormControl('', [Validators.required]);
    this.serialNumber = new FormControl('');
    this.quantity = new FormControl('');
    this.unitOfMeasure = new FormControl('');
    this.site = new FormControl('');
    this.person = new FormControl('');
    this.description = new FormControl('');

    this.assetForm = formBuilder.group({
      'assetKindId': this.assetKindId,
      'assetType': this.assetType,
      'serialNumber': this.serialNumber,
      'quantity': this.quantity,
      'unitOfMeasure': this.unitOfMeasure,
      'person': this.person,
      'site': this.site,
      'description': this.description
    });


    this.pageSize = 15;

    this.assetKinds = [];

    this.asset = new Asset();

   this.assetForm
    .valueChanges
    .subscribe(value => {
      this.asset.assetKindId = value.assetKindId;
      this.asset.serialNumber = value.serialNumber;
      this.asset.quantity = value.quantity;
      this.asset.description = value.description;
    }, error2 => {
      console.log(error2);
    });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    const that = this;
    this.assetService
    .getAssetKinds()
    .subscribe(assetKinds => {
      if (assetKinds) {
        that.assetKinds = assetKinds.assetKinds;
      }
    }, onError => {
      console.log(onError);
    });

    this.createAndPopulateDropDowns();
  }

  private createAndPopulateDropDowns() {
    this.populateAssetTypeDropDown();
    this.populateUnitOfMeasureDropDown();
    this.populateSiteDropDown();
    this.populatePersonDropDown();
  }

  private populateAssetTypeDropDown() {
    this.findAssetTypes('');
    this.assetForm.get('assetType').valueChanges
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findAssetTypes(value);
      });
  }

  findAssetTypes(value) {
    this.assetService
      .findAssetTypes(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            assetTypeId: v2.assetTypeId,
            name: v2.name
          };
        })
      })
      .subscribe(next => { // update the data
        this.assetTypeDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findAssetTypes error - ' + error);
      });
  }

  private populateUnitOfMeasureDropDown() {
    this.findUnitOfMeasures('');
    this.assetForm.get('unitOfMeasure').valueChanges
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findUnitOfMeasures(value);
      });
  }

  findUnitOfMeasures(value) {
    this.assetService
      .findUnitOfMeasures(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => { // updated to new method
          return {
            unitOfMeasureId: v2.unitOfMeasureId,
            name: v2.name
          };
        })
      })
      .subscribe(next => { // update the data
        this.unitOfMeasureDataService = this.completerService
          .local(next, 'name', 'name');
      }, error => {
        console.log('findAssetTypes error - ' + error);
      });
  }

  private populateSiteDropDown() {
    this.findUnionOfPhysicalSites('');
    this.assetForm.get('site').valueChanges
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log('value: ' + value);
        this.findUnionOfPhysicalSites(value);
      });
  }

  findUnionOfPhysicalSites(value) {
    this.assetService
      .findUnionOfPhysicalSites(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          /*let name = "";
          if (v2.postOfficeBoxNumber) {
            name = v2.postOfficeBoxNumber;
          } else {
            name = v2.streetNumber + " " + v2.street;
          }*/
          return {
            siteId: v2.siteId,
            name: v2.name
          };
        })
      })
      .subscribe(next => { // update the data
        this.siteDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findUnionOfPhysicalSites error - ' + error);
      });
  }

  private populatePersonDropDown() {
    this.findPersons('');
    this.assetForm.get('person').valueChanges
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        this.findPersons(value);
      });
  }

  findPersons(value) {
    this.assetService
      .findPersons(value, this.pageSize) // send search request to the backend
      .map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            partyId: v2.partyId,
            name: v2.firstName
          };
        })
      })
      .subscribe(next => { // update the data
        this.personDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findPersons error - ' + error);
      });
  }

  get assetForm(): FormGroup {
    return this._assetForm;
  }

  set assetForm(value: FormGroup) {
    this._assetForm = value;
  }

  get assetTypeDataService(): CompleterData {
    return this._assetTypeDataService;
  }

  set assetTypeDataService(value: CompleterData) {
    this._assetTypeDataService = value;
  }

  get unitOfMeasureDataService(): CompleterData {
    return this._unitOfMeasureDataService;
  }

  set unitOfMeasureDataService(value: CompleterData) {
    this._unitOfMeasureDataService = value;
  }

  get siteDataService(): CompleterData {
    return this._siteDataService;
  }

  set siteDataService(value: CompleterData) {
    this._siteDataService = value;
  }

  get personDataService(): CompleterData {
    return this._personDataService;
  }

  set personDataService(value: CompleterData) {
    this._personDataService = value;
  }

  get assetKindId(): FormControl {
    return this._assetKindId;
  }

  set assetKindId(value: FormControl) {
    this._assetKindId = value;
  }

  get assetType(): FormControl {
    return this._assetType;
  }

  set assetType(value: FormControl) {
    this._assetType = value;
  }

  get serialNumber(): FormControl {
    return this._serialNumber;
  }

  set serialNumber(value: FormControl) {
    this._serialNumber = value;
  }

  get quantity(): FormControl {
    return this._quantity;
  }

  set quantity(value: FormControl) {
    this._quantity = value;
  }

  get unitOfMeasure(): FormControl {
    return this._unitOfMeasure;
  }

  set unitOfMeasure(value: FormControl) {
    this._unitOfMeasure = value;
  }

  get site(): FormControl {
    return this._site;
  }

  set site(value: FormControl) {
    this._site = value;
  }

  get person(): FormControl {
    return this._person;
  }

  set person(value: FormControl) {
    this._person = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get assetKinds(): AssetKind[] {
    return this._assetKinds;
  }

  set assetKinds(value: AssetKind[]) {
    this._assetKinds = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onAssetTypeSelect(selected: CompleterItem) {
      this.asset.assetTypeId = selected.originalObject.assetTypeId;
  }

  onUnitOfMeasureSelect(selected: CompleterItem) {
      this.asset.unitOfMeasureId = selected.originalObject.unitOfMeasureId;
  }

  onPhysicalSiteSelect(selected: CompleterItem) {
      this.asset.siteId = selected.originalObject.siteId;
  }

  onPersonSelect(selected: CompleterItem) {
      this.asset.personId = selected.originalObject.partyId;
  }

  isDiscreteItem() {
    return this.assetKindId.value === '4cf11077-c5e3-41f3-b40b-6e89dce6e9c8';
  }

  isInventory() {
    return this.assetKindId.value === '65694257-0aa8-4fb6-abb7-e6c7b83cf4f2';
  }

  onCreate() {

    this.doNotDisplayFailureMessage = true;

      this.assetService.addAsset(this.asset)
      .subscribe(value => {
        if (value.assetId) {
          this.router.navigate(['/assets']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  cancel() {
    this.router.navigate(['/assets']);
  }

}
