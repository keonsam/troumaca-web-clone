import {Component, OnInit} from "@angular/core";
import {AssetService} from "../asset.service";
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AssetKind} from "../asset.kind";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/filter";
import {Asset} from "../asset";
import {AssetTypeClass} from "../../asset-type-classes/asset.type.class";
import {AssetType} from "../asset.type";

@Component({
  selector: 'asset-creation',
  templateUrl: './asset.creation.component.html',
  styleUrls: ['./asset.creation.component.css']
})
export class AssetCreationComponent implements OnInit {

  private _assetKindFormControlName: string;
  private _assetKindFormControlValue: string;
  private _assetKind: FormControl;

  private _assetTypeFormControlName: string;
  private _assetTypeFormControlValue: string;
  private _assetType: FormControl;

  private _serialNumberFormControlName: string;
  private _serialNumberFormControlValue: string;
  private _serialNumber: FormControl;

  private _quantityFormControlName: string;
  private _quantityFormControlValue: string;
  private _quantity: FormControl;

  private _unitOfMeasureFormControlName: string;
  private _unitOfMeasureFormControlValue: string;
  private _unitOfMeasure: FormControl;

  private _siteFormControlName: string;
  private _siteFormControlValue: string;
  private _site: FormControl;

  private _personFormControlName: string;
  private _personFormControlValue: string;
  private _person: FormControl;

  private _assetForm:FormGroup;

  private _assetKinds:AssetKind[];
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

  constructor(private  assetService:AssetService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder) {

    this.assetKind = new FormControl("", Validators.required);
    this.assetType = new FormControl("", Validators.required);
    this.serialNumber = new FormControl("");
    this.quantity = new FormControl("");
    this.unitOfMeasure = new FormControl("");
    this.site = new FormControl("");
    this.person = new FormControl("");

    this.assetKindFormControlName = "assetKind";
    this.assetTypeFormControlName = "assetType";
    this.serialNumberFormControlName = "serialNumber";
    this.quantityFormControlName = "quantity";
    this.unitOfMeasureFormControlName = "unitOfMeasure";
    this.siteFormControlName = "site";
    this.personFormControlName = "person";

    this.assetForm = formBuilder.group({
      "assetKind": this.assetKind,
      "assetType": this.assetType,
      "serialNumber": this.serialNumber,
      "quantity": this.quantity,
      "unitOfMeasure": this.unitOfMeasure,
      "site": this.site,
      "person": this.person
    });

    this.selectedAssetKindId = "";
    this.pageSize = 15;

    this.assetKinds = [];

    let asset = new Asset();
    asset.assetType = new AssetType();
    asset.assetTypeClass = new AssetTypeClass();
    this.asset = asset;
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
    this.assetForm.get(this.assetKindFormControlName).valueChanges
      .subscribe(value => {
        that.selectedAssetKindId = value;
        this.assetKindFormControlValue = value;
        this.asset.assetId = value;
      });

    // this.assetForm.get(this.assetKindFormControlName).valueChanges
    //   .subscribe(value => {
    //     that.assetKindFormControlValue = value;
    //     that.asset.assetKindId = value;
    //   });

  //   this.assetForm.get(this.assetTypeFormControlName).valueChanges
  //     .subscribe(value => {
  //       that.assetTypeFormControlValue = value;
  //       that.asset.assetType.assetTypeId = value;
  //     });

    this.assetForm.get(this.serialNumberFormControlName).valueChanges
      .subscribe(value => {
        that.serialNumberFormControlValue = value;
        that.asset.serialNumber = value;
      });

    this.assetForm.get(this.quantityFormControlName).valueChanges
      .subscribe(value => {
        that.quantityFormControlValue = value;
        that.asset.quantity = value;
      });

  //   this.assetForm.get(this.unitOfMeasureFormControlName).valueChanges
  //     .subscribe(value => {
  //       that.unitOfMeasureFormControlValue = value;
  //       that.asset.unitOfMeasureId = value;
  //     });
  //
  //   this.assetForm.get(this.siteFormControlName).valueChanges
  //     .subscribe(value => {
  //       that.siteFormControlValue = value;
  //       that.asset.quantity = value;
  //     });
  //
  //   this.assetForm.get(this.personFormControlName).valueChanges
  //     .subscribe(value => {
  //       that.personFormControlValue = value;
  //     });
  }

  private populateAssetTypeDropDown() {
    let that = this;
    this.assetForm.get(this.assetKindFormControlName).valueChanges
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
    this.assetForm.get(this.unitOfMeasureFormControlName).valueChanges
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
    this.assetForm.get(this.siteFormControlName).valueChanges
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
    this.assetForm.get(this.personFormControlName).valueChanges
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

  get assetForm(): FormGroup {
    return this._assetForm;
  }

  set assetForm(value: FormGroup) {
    this._assetForm = value;
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

  get assetKind(): FormControl {
    return this._assetKind;
  }

  set assetKind(value: FormControl) {
    this._assetKind = value;
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

  get personFormControlValue(): string {
    return this._personFormControlValue;
  }

  set personFormControlValue(value: string) {
    this._personFormControlValue = value;
  }

  get assetKindFormControlValue(): string {
    return this._assetKindFormControlValue;
  }

  set assetKindFormControlValue(value: string) {
    this._assetKindFormControlValue = value;
  }

  get assetTypeFormControlValue(): string {
    return this._assetTypeFormControlValue;
  }

  set assetTypeFormControlValue(value: string) {
    this._assetTypeFormControlValue = value;
  }

  get serialNumberFormControlValue(): string {
    return this._serialNumberFormControlValue;
  }

  set serialNumberFormControlValue(value: string) {
    this._serialNumberFormControlValue = value;
  }

  get quantityFormControlValue(): string {
    return this._quantityFormControlValue;
  }

  set quantityFormControlValue(value: string) {
    this._quantityFormControlValue = value;
  }

  get unitOfMeasureFormControlValue(): string {
    return this._unitOfMeasureFormControlValue;
  }

  set unitOfMeasureFormControlValue(value: string) {
    this._unitOfMeasureFormControlValue = value;
  }

  get siteFormControlValue(): string {
    return this._siteFormControlValue;
  }

  set siteFormControlValue(value: string) {
    this._siteFormControlValue = value;
  }

  isInventory() {
    let typeId = "65694257-0aa8-4fb6-abb7-e6c7b83cf4f2";
    return this.selectedAssetKindId.toUpperCase() === typeId.toUpperCase();
  }

  isDiscreteItem() {
    let typeId = "4cf11077-c5e3-41f3-b40b-6e89dce6e9c8";

    return this.selectedAssetKindId.toUpperCase() === typeId.toUpperCase();
  }

  onCreate() {
    console.log(this.asset);
    if (this.isDiscreteItem()) {
      this.assetService.addDiscreteAsset(this.asset);
    } else if(this.isInventory()) {
      this.assetService.addInventoryAsset(this.asset);
    } else {
      console.log("Cannot create an unknown asset kind")
    }
  }

  onReset() {
    //not working
    this.assetForm.reset();
  }

  onAssetTypeSelect(selected: CompleterItem) {
    if (selected) {
      //this.assetTypeFormControlValue = selected.originalObject.assetTypeId;
      this.asset.assetKindId = selected.originalObject.assetTypeId;
      //this.asset.assetType.assetTypeId = selected.originalObject.assetTypeId;
    }
  }

  onUnitOfMeasureSelect(selected: CompleterItem) {
    if (selected) {
      // this.unitOfMeasureFormControlValue = selected.originalObject.unitOfMeasureId;
      this.asset.unitOfMeasure.unitOfMeasureId = selected.originalObject.unitOfMeasureId;
    }
  }

  onPhysicalSiteSelect(selected: CompleterItem) {
    if (selected) {
    //  this.siteFormControlValue = selected.originalObject.siteId;
      this.asset.site = selected.originalObject.siteId;
    }
  }

  onPersonSelect(selected: CompleterItem) {
    if (selected) {
    //  this.personFormControlValue = selected.originalObject.partyId;
      this.asset.person.partyId = selected.originalObject.partyId;
    }
  }

  isValidInventory() {

    if (!this.asset.assetId) {
      return false;
    }

    if (!this.asset.assetKindId) {
      return false;
    }

    if (!this.asset.quantity) {
      return false;
    }

    if (!this.asset.unitOfMeasure.unitOfMeasureId) {
      return false;
    }

    return this.asset.site ? true:false;
  }

  isValidDiscreteItem() {

    if (!this.asset.assetId) {
      return false;
    }

    if (!this.asset.assetKindId) {
      return false;
    }

    if (!this.asset.serialNumber) {
      return false;
    }
    return this.asset.site ? true:false;
  }

  enableSubmit() {

    if (this.isInventory() && this.isValidInventory()) {
      return true;
    }
    return !!(this.isDiscreteItem() && this.isValidDiscreteItem());
  }

  onSubmit() {
    if (this.isInventory() && this.isValidInventory()) {

      let assetInventory:Asset = new Asset(); // validate
      this.assetService.addInventoryAsset(assetInventory);

    } else if (this.isDiscreteItem() && this.isValidDiscreteItem()) {

      let assetDiscrete:Asset = new Asset(); // validate
      this.assetService.addDiscreteAsset(assetDiscrete);

    }
    console.log("onSubmit");
  }


}
