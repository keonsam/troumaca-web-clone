import {Component, OnInit} from '@angular/core';
import {AssetService} from '../asset.service';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Asset} from '../asset';
import {AssetKind} from '../asset.kind';
import {Router, ActivatedRoute} from '@angular/router';
import { map, filter, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-asset-form',
  templateUrl: './asset.form.component.html',
  styleUrls: ['./asset.form.component.css']
})

export class AssetFormComponent implements OnInit {

  sub: any;

  assetKindId: FormControl;
  assetType: FormControl;
  serialNumber: FormControl;
  quantity: FormControl;
  site: FormControl;
  person: FormControl;
  description: FormControl;
  assetForm: FormGroup;

  assetTypeDataService: CompleterData;
  siteDataService: CompleterData;
  personDataService: CompleterData;

  private asset: Asset;

  unitOfMeasureId: string;
  assetKinds: AssetKind[];
  pageSize = 15;
  assetExist = false;

  doNotDisplayFailureMessage: boolean;

  constructor(private assetService: AssetService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

    this.assetKindId = new FormControl('', [Validators.required]);
    this.assetType = new FormControl('', [Validators.required]);
    this.serialNumber = new FormControl('');
    this.quantity = new FormControl('');
    this.site = new FormControl('');
    this.person = new FormControl('');
    this.description = new FormControl('');

    this.assetForm = formBuilder.group({
      'assetKindId': this.assetKindId,
      'assetType': this.assetType,
      'serialNumber': this.serialNumber,
      'quantity': this.quantity,
      'person': this.person,
      'site': this.site,
      'description': this.description
    });

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
    if (this.route.snapshot && this.route.snapshot.data['asset']) {
      this.setInputValues(this.route.snapshot.data['asset']);
    }
    this.createAndPopulateDropDowns();
  }

  private setInputValues(asset: Asset) {
    this.assetKindId.setValue(asset.assetKindId);
    this.assetType.setValue(asset.assetType ? asset.assetType.name : '');
    this.serialNumber.setValue(asset.serialNumber);
    this.quantity.setValue(asset.quantity);
    this.site.setValue(asset.site ? asset.site.name : '');
    this.person.setValue(asset.person ? asset.person.name : '');
    this.description.setValue(asset.description);
    this.unitOfMeasureId = asset.unitOfMeasure ? asset.unitOfMeasure.name : '';
    this.assetExist = true;
    this.asset = asset;
  }

  private createAndPopulateDropDowns() {
    this.populateAssetTypeDropDown();
    this.populateSiteDropDown();
    this.populatePersonDropDown();
  }

  private populateAssetTypeDropDown() {
    if (!this.asset.assetType) {
      this.findAssetTypes('');
    }
    this.assetForm.get('assetType').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findAssetTypes(value);
      });
  }

  private findAssetTypes(value) {
    this.assetService
      .findAssetTypes(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            assetTypeId: v2.assetTypeId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.assetTypeDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findAssetTypes error - ' + error);
      });
  }

  private populateSiteDropDown() {
    if (!this.asset.site) {
      this.findUnionOfPhysicalSites('');
    }
    this.assetForm.get('site').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        console.log('value: ' + value);
        this.findUnionOfPhysicalSites(value);
      });
  }

  private findUnionOfPhysicalSites(value) {
    this.assetService
      .findUnionOfPhysicalSites(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          /*let name = '';
          if (v2.postOfficeBoxNumber) {
            name = v2.postOfficeBoxNumber;
          } else {
            name = v2.streetNumber + ' ' + v2.street;
          }*/
          return {
            siteId: v2.siteId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.siteDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findUnionOfPhysicalSites error - ' + error);
      });
  }

  private populatePersonDropDown() {
    if (!this.asset.person) {
      this.findPersons('');
    }
    this.assetForm.get('person').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findPersons(value);
      });
  }

  private findPersons(value) {
    this.assetService
      .findPersons(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            partyId: v2.partyId,
            name: v2.firstName
          };
        })
      }))
      .subscribe(next => { // update the data
        this.personDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findPersons error - ' + error);
      });
  }

  onAssetTypeSelect(selected: CompleterItem) {
    this.asset.assetTypeId = selected.originalObject.assetTypeId;
  }

  onPhysicalSiteSelect(selected: CompleterItem) {
    this.asset.siteId = selected.originalObject.siteId;
  }

  onPersonSelect(selected: CompleterItem) {
    this.asset.personId = selected.originalObject.partyId;
  }

  setUnitOfMeasureId(unitOfMeasureId: string) {
    this.asset.unitOfMeasureId = unitOfMeasureId;
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
        if (value && value.assetId) {
          this.router.navigate(['/assets']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
      });
  }

  onUpdate() {
    this.doNotDisplayFailureMessage = true;
    this.assetService
      .updateAsset(this.asset.assetId, this.asset)
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
