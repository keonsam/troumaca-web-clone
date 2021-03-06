// import {Component, OnInit} from '@angular/core';
// import {AssetService} from '../asset.service';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {Asset} from '../asset';
// import {Router, ActivatedRoute} from '@angular/router';
// import {filter, debounceTime } from 'rxjs/operators';
// import {AssetType} from '../../asset-types/asset.type';
// import {ASSET} from '../../app/routes';
//
// @Component({
//   selector: 'app-asset-form',
//   templateUrl: './asset.form.component.html',
//   styleUrls: ['./asset.form.component.css']
// })
//
// export class AssetFormComponent implements OnInit {
//
//   assetType: FormControl;
//
//   name: FormControl;
//   createdOn: FormControl;
//   destroyOn: FormControl;
//   description: FormControl;
//
//   serialNumber: FormControl;
//   inventoryID: FormControl;
//   quantity: FormControl;
//   buildingNumber: FormControl;
//   lotNumber: FormControl;
//   numberOfShares: FormControl;
//
//   assetForm: FormGroup;
//
//   assetTypes: AssetType[];
//   assetTypeSelected: string;
//
//   pageSize = 5;
//   update = false;
//   doNotDisplayFailureMessage = true;
//
//   private asset: Asset;
//   private assetLink = `/${ASSET}`;
//   activePane = 'home';
//
//   constructor(private assetService: AssetService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//     this.asset = new Asset();
//
//
//     this.assetType = new FormControl('', [Validators.required]);
//
//     this.name = new FormControl('', [Validators.required]);
//     this.createdOn = new FormControl('');
//     this.destroyOn = new FormControl('');
//     this.description = new FormControl('');
//
//     this.serialNumber = new FormControl('');
//     this.inventoryID = new FormControl('');
//     this.quantity = new FormControl('');
//     this.buildingNumber = new FormControl('');
//     this.lotNumber = new FormControl('');
//     this.numberOfShares = new FormControl('');
//
//     this.assetForm = formBuilder.group({
//       'name': this.name,
//       'createdOn': this.createdOn,
//       'destroyOn': this.destroyOn,
//       'description': this.description,
//       'serialNumber': this.serialNumber,
//       'inventoryID': this.inventoryID,
//       'quantity': this.quantity,
//       'buildingNumber': this.buildingNumber,
//       'lotNumber': this.lotNumber,
//       'numberOfShares': this.numberOfShares,
//     });
//
//
//     this.assetForm
//       .valueChanges
//       .subscribe(value => {
//         this.asset.name = value.name;
//         this.asset.createdOn = value.createdOn;
//         this.asset.destroyOn = value.destroyOn;
//         this.asset.description = value.description;
//
//         this.asset.discreteItem.serialNumber = value.serialNumber;
//         this.asset.inventoryItem.inventoryID = value.inventoryID;
//         this.asset.inventoryItem.quantity = value.quantity;
//         this.asset.building.buildingNumber = value.buildingNumber;
//         this.asset.lot.lotNumber = value.lotNumber;
//         this.asset.lot.numberOfShares = value.numberOfShares;
//       });
//   }
//
//   ngOnInit(): void {
//     this.populateAssetTypesDropDown();
//     if (this.route.snapshot && this.route.snapshot.data['asset']) {
//       const asset = this.route.snapshot.data['asset'];
//       this.setInputValues(asset);
//       this.update = true;
//       this.asset = asset;
//     }
//   }
//
//   private populateAssetTypesDropDown() {
//     this.findAssetTypes('');
//     this.assetType.valueChanges
//       .pipe(debounceTime(1000), filter(value => { // filter out empty values
//         return !!(value);
//       }))
//       .subscribe(value => {
//         this.findAssetTypes(value);
//       });
//   }
//
//   private findAssetTypes(value) {
//     this.assetService
//       .findAssetTypes(value, this.pageSize) // send search request to the backend
//       .subscribe(next => { // update the data
//         this.assetTypes = next;
//       }, error => {
//         console.log('findAssets error - ' + error);
//       });
//   }
//
//   private setInputValues(asset: Asset) {
//     this.name.setValue(asset.name);
//     this.assetType.setValue(asset.assetType ? asset.assetType.name : '');
//     this.assetTypeSelected = asset.assetType.initialId ? asset.assetType.initialId : asset.assetType.assetTypeId;
//     this.createdOn.setValue(asset.createdOn);
//     this.destroyOn.setValue(asset.destroyOn);
//     this.description.setValue(asset.description);
//     this.serialNumber.setValue(asset.discreteItem.serialNumber);
//     this.inventoryID.setValue(asset.inventoryItem.inventoryID);
//     this.quantity.setValue(asset.inventoryItem.quantity);
//     this.buildingNumber.setValue(asset.building.buildingNumber);
//     this.lotNumber.setValue(asset.lot.lotNumber);
//     this.numberOfShares.setValue(asset.lot.numberOfShares);
//   }
//
//   onAssetTypeSelect(assetType: AssetType) {
//     this.asset.assetTypeId = assetType.assetTypeId;
//     if (!assetType.initialId) {
//       this.assetTypeSelected = assetType.assetTypeId;
//     } else {
//       this.assetTypeSelected = assetType.initialId;
//     }
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//
//     this.assetService.addAsset(this.asset)
//       .subscribe(value => {
//         if (value && value.assetId) {
//           this.router.navigate([this.assetLink])
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         this.doNotDisplayFailureMessage = false;
//       });
//   }
//
//   onUpdate() {
//     this.doNotDisplayFailureMessage = true;
//     this.assetService
//       .updateAsset(this.asset.assetId, this.asset)
//       .subscribe(value => {
//         if (value) {
//           this.router.navigate([this.assetLink])
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       });
//   }
//
//   cancel() {
//     this.router.navigate([this.assetLink]);
//   }
//
//   setPanel(event: string) {
//     if (event) {
//       this.activePane = event;
//     }
//   }
//
// }
