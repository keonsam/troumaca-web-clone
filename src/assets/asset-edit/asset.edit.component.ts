import {Component, OnInit} from "@angular/core";
import {AssetService} from "../asset.service";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {Asset} from "../asset";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {AssetKind} from "../asset.kind";
import {AssetType} from "../../asset-types/asset.type";
import {UnitOfMeasure} from "../asset.unit.of.measure";
import {AssetPerson} from "../asset.person";
import {Site} from "../asset.site";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'asset-edit',
  templateUrl: './asset.edit.component.html',
  styleUrls: ['./asset.edit.component.css']
})

export class AssetEditComponent implements OnInit {

  private assetId: string;
  private sub: any;

  private _assetKindFormControlName: string;
  private _assetKindId: FormControl;

  private _assetTypeFormControlName: string;
  private _assetType: FormControl;

  private _serialNumberFormControlName: string;
  private _serialNumber: FormControl;

  private _quantityFormControlName: string;
  private _quantity: FormControl;

  private _unitOfMeasureFormControlName: string;
  private _unitOfMeasure: FormControl;

  private _siteFormControlName: string;
  private _site: FormControl;

  private _personFormControlName: string;
  private _person: FormControl;

  private _description: FormControl;

  private _assetEditForm:FormGroup;

  private _assetKinds: AssetKind[];
  private _searchStr: string;
  private _assetTypeDataService: CompleterData;
  private _unitOfMeasureDataService: CompleterData;
  private _siteDataService: CompleterData;
  private _personDataService: CompleterData;
  private _placeholder:string;

  private selectedAssetType:CompleterItem;
  private selectedAssignee:CompleterItem;
  private selectedSite:CompleterItem;
  private selectedUnitOfMeasure:CompleterItem;

  private selectedAssetKindId:string;
  private pageSize:number;
  private asset:Asset;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private  assetService:AssetService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetKindId = new FormControl("", [Validators.required]);
    this.assetType = new FormControl("", [Validators.required]);
    this.serialNumber = new FormControl("", [Validators.required]);
    this.quantity = new FormControl("", [Validators.required]);
    this.unitOfMeasure = new FormControl("");
    this.site = new FormControl("");
    this.person = new FormControl("");
    this.description = new FormControl("");

    this.assetKindFormControlName = "assetKindId";
    this.assetTypeFormControlName = "assetType";
    this.serialNumberFormControlName = "serialNumber";
    this.quantityFormControlName = "quantity";
    this.unitOfMeasureFormControlName = "unitOfMeasure";
    this.siteFormControlName = "site";
    this.personFormControlName = "person";

    this.assetEditForm = formBuilder.group({
      "assetKindId": this.assetKindId,
      "assetType": this.assetType,
      "serialNumber": this.serialNumber,
      "quantity": this.quantity,
      "unitOfMeasure": this.unitOfMeasure,
      "person": this.person,
      "site": this.site,
      "description": this.description
    });

    this.selectedAssetKindId = "";
    this.pageSize = 15;

    this.assetKinds = [];

    let asset = new Asset();
    asset.assetType = new AssetType();
    asset.unitOfMeasure = new UnitOfMeasure();
    asset.person = new AssetPerson();
    asset.site = new Site();
    //asset.assetTypeClass = new AssetTypeClass();
    this.asset = asset;

   this.assetEditForm
    .valueChanges
    .subscribe(value => {
      this.asset.assetKindId = value.assetKindId;
      this.asset.serialNumber = value.serialNumber;
      this.asset.quantity = value.quantity;
      this.asset.description = value.description;
      console.log(value);
    }, error2 => {
      console.log(error2);
    });

    this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    let that = this;
    this.assetService
    .getAssetKinds()
    .subscribe(assetKinds => {
      if (assetKinds) {
        that.assetKinds = assetKinds.assetKinds;
      }
    }, onError => {
      console.log(onError);
    });

    this.controlSubscriptions();

    this.createAndPopulateDropDowns();

    this.sub = this.route.params.subscribe(params => {
       this.assetId = params['assetId'];
       this.assetService.getAssetById(this.assetId)
       .subscribe(asset =>{
        this.assetKindId.setValue(asset.assetKindId);
        this.assetType.setValue(asset.assetType.name);
        this.serialNumber.setValue(asset.serialNumber);
        this.quantity.setValue(asset.quantity);
        this.unitOfMeasure.setValue(asset.unitOfMeasure.name);
        this.site.setValue(asset.site.name);
        this.person.setValue(asset.person.name);
        this.description.setValue(asset.description);
        this.asset = asset;
      }, error => {
        console.log(error);
      }, () => {
        this.assetEditForm
        .valueChanges
        .subscribe(value => {
          this.asset.assetKindId = value.assetKindId;
          this.asset.serialNumber = value.serialNumber;
          this.asset.quantity = value.quantity;
          this.asset.description = value.description;
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });
  }

  private createAndPopulateDropDowns() {
    this.assetTypeDataService = this.completerService.local([], 'name', 'name');
    this.unitOfMeasureDataService = this.completerService.local([], 'name', 'unitOfMeasureId');
    this.siteDataService = this.completerService.local([], 'name', 'name');
    this.personDataService = this.completerService.local([], 'name', 'name');

    this.populateAssetTypeDropDown();
    this.populateUnitOfMeasureDropDown();
    this.populateSiteDropDown();
    this.populatePersonDropDown();
  }

  private controlSubscriptions() {
    let that = this;
    this.assetEditForm.get(this.assetKindFormControlName).valueChanges
      .subscribe(value => {
        that.selectedAssetKindId = value;
        //this.assetKindFormControlValue = value;
        this.asset.assetKindId = value;
      });

    // this.assetEditForm.get(this.assetKindFormControlName).valueChanges
    //   .subscribe(value => {
    //     that.assetKindFormControlValue = value;
    //     that.asset.assetKindId = value;
    //   });

  //   this.assetEditForm.get(this.assetTypeFormControlName).valueChanges
  //     .subscribe(value => {
  //       that.assetTypeFormControlValue = value;
  //       that.asset.assetType.assetTypeId = value;
  //     });

    this.assetEditForm.get(this.serialNumberFormControlName).valueChanges
      .subscribe(value => {
        //that.serialNumberFormControlValue = value;
        that.asset.serialNumber = value;
      });

    this.assetEditForm.get(this.quantityFormControlName).valueChanges
      .subscribe(value => {
        //that.quantityFormControlValue = value;
        that.asset.quantity = value;
      });
  }

  private populateAssetTypeDropDown() {
    let that = this;
    this.assetEditForm.get(this.assetKindFormControlName).valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.assetService
          .findAssetTypes(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.assetTypes.map(v2 => {
              return {
                assetTypeId: v2.assetTypeId,
                name: v2.name
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findAssetTypes next - " + next);
            this.assetTypeDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("findAssetTypes error - " + error);
          });
      });
  }

  private populateUnitOfMeasureDropDown() {
    let that = this;
    this.assetEditForm.get(this.unitOfMeasureFormControlName).valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.assetService
          .findUnitOfMeasures(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.unitOfMeasures.map(v2 => {
              return {
                unitOfMeasureId: v2.unitOfMeasureId,
                name: v2.name
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findUnitOfMeasures next - " + next);
            this.unitOfMeasureDataService = this.completerService
              .local(next, 'name', 'name');
          }, error => {
            console.log("findAssetTypes error - " + error);
          });
      });
  }

  private populateSiteDropDown() {
    let that = this;
    this.assetEditForm.get(this.siteFormControlName).valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.assetService
          .findUnionOfPhysicalSites(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.unionOfPhysicalSites.map(v2 => {
              let name = "";
              if (v2.postOfficeBoxNumber) {
                name = v2.postOfficeBoxNumber;
              } else {
                name = v2.streetNumber + " " + v2.street;
              }
              return {
                siteId: v2.siteId,
                name: name
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findUnionOfPhysicalSites next - " + next);
            this.siteDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("findUnionOfPhysicalSites error - " + error);
          });
      });
  }

  private populatePersonDropDown() {
    let that = this;
    this.assetEditForm.get(this.personFormControlName).valueChanges
      .debounceTime(1000) // debounce
      .filter(value => { // filter out empty values
        return !!(value);
      })
      .subscribe(value => {
        console.log("value: " + value);
        that.assetService
          .findPersons(value, that.pageSize) // send search request to the backend
          .map(value2 => { // convert results to dropdown data
            return value2.persons.map(v2 => {
              return {
                partyId: v2.partyId,
                name: v2.firstName
              };
            })
          })
          .subscribe(next => { // update the data
            console.log("findPersons next - " + next);
            this.personDataService = this.completerService.local(next, 'name', 'name');
          }, error => {
            console.log("findPersons error - " + error);
          });
      });
  }

  get assetEditForm(): FormGroup {
    return this._assetEditForm;
  }

  set assetEditForm(value: FormGroup) {
    this._assetEditForm = value;
  }

  get placeholder(): string {
    return this._placeholder;
  }

  set placeholder(value: string) {
    this._placeholder = value;
  }

  get searchStr(): string {
    return this._searchStr;
  }

  set searchStr(value: string) {
    this._searchStr = value;
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

  get assetKindFormControlName(): string {
    return this._assetKindFormControlName;
  }

  set assetKindFormControlName(value: string) {
    this._assetKindFormControlName = value;
  }

  get assetTypeFormControlName(): string {
    return this._assetTypeFormControlName;
  }

  set assetTypeFormControlName(value: string) {
    this._assetTypeFormControlName = value;
  }

  get serialNumberFormControlName(): string {
    return this._serialNumberFormControlName;
  }

  set serialNumberFormControlName(value: string) {
    this._serialNumberFormControlName = value;
  }

  get quantityFormControlName(): string {
    return this._quantityFormControlName;
  }

  set quantityFormControlName(value: string) {
    this._quantityFormControlName = value;
  }

  get unitOfMeasureFormControlName(): string {
    return this._unitOfMeasureFormControlName;
  }

  set unitOfMeasureFormControlName(value: string) {
    this._unitOfMeasureFormControlName = value;
  }

  get siteFormControlName(): string {
    return this._siteFormControlName;
  }

  set siteFormControlName(value: string) {
    this._siteFormControlName = value;
  }

  get personFormControlName(): string {
    return this._personFormControlName;
  }

  set personFormControlName(value: string) {
    this._personFormControlName = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  isInventory() {
    let typeId = "65694257-0aa8-4fb6-abb7-e6c7b83cf4f2";
    return this.selectedAssetKindId.toUpperCase() === typeId.toUpperCase();
  }

  isDiscreteItem() {
    let typeId = "4cf11077-c5e3-41f3-b40b-6e89dce6e9c8";
    return this.selectedAssetKindId.toUpperCase() === typeId.toUpperCase();
  }

  onReset() {
    this.assetEditForm.reset();
  }

  onAssetTypeSelect(selected: CompleterItem) {
    if (selected) {
      this.assetType = selected.originalObject.name;
      //this.assetTypeFormControlValue = selected.originalObject.assetTypeId;
      //this.asset.assetKindId = selected.originalObject.assetTypeId;
      this.asset.assetType = selected.originalObject;
    }
  }

  onUnitOfMeasureSelect(selected: CompleterItem) {
    if (selected) {
      // this.unitOfMeasureFormControlValue = selected.originalObject.unitOfMeasureId;
      this.unitOfMeasure
      this.asset.unitOfMeasure = selected.originalObject;
    }
  }

  onPhysicalSiteSelect(selected: CompleterItem) {
    if (selected) {
    //  this.siteFormControlValue = selected.originalObject.siteId;
      this.asset.site = selected.originalObject;
    }
  }

  onPersonSelect(selected: CompleterItem) {
    if (selected) {
    //  this.personFormControlValue = selected.originalObject.partyId;

      this.asset.person = selected.originalObject;
    }
  }

  onCreate() {
    console.log(this.asset);
    this.doNotDisplayFailureMessage = true;
    this.assetService
    .updateAsset(this.assetId, this.asset)
    .subscribe(value => {
      if (value) {
        this.router.navigate(['/assets']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });

  }

  cancel() {
    this.router.navigate(['/assets']);
  }

}
