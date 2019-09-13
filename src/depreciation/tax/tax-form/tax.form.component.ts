// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//
// import {ActivatedRoute, Router} from '@angular/router';
// import { Depreciation } from '../../depreciation';
// import {DepreciationService} from '../../depreciation.service';
// import {DepreciationMethod} from '../../depreciation.method';
// import {DepreciationSystem} from '../../depreciation.system';
// import {PropertyClass} from '../../property.class';
// import { map, filter, debounceTime } from 'rxjs/operators';
//
// @Component({
//   selector: 'app-tax-form',
//   templateUrl: './tax.form.component.html',
//   styleUrls: ['./tax.form.component.css']
// })
//
// export class TaxFormComponent implements OnInit {
//
//   private _depreciationSystem: DepreciationSystem[];
//   private _propertyClasses: PropertyClass[];
//   private _depreciationMethod: DepreciationMethod[];
//
//   private _assetId: FormControl;
//   private _systemId: FormControl;
//   private _propertyClassId: FormControl;
//   private _methodId: FormControl;
//   private _serviceDate: FormControl;
//   private _cost: FormControl;
//
//   private _depreciationForm: FormGroup;
//
//   // private _assetDataService: CompleterData;
//
//   private pageSize: number;
//   private depreciation: Depreciation;
//
//   private _doNotDisplayFailureMessage: boolean;
//   private depreciationId: string;
//   private sub: any;
//   public depreciationExist = false;
//
//   constructor(private depreciationService: DepreciationService,
//               // private completerService: CompleterService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//     this.depreciation = new Depreciation();
//     this.depreciation.unitProduced = [];
//
//     this.assetId = new FormControl('', [Validators.required]);
//     this.systemId = new FormControl('', [Validators.required]);
//     this.methodId = new FormControl('', [Validators.required]);
//     this.propertyClassId = new FormControl('', [Validators.required]);
//     this.serviceDate = new FormControl('', [Validators.required]);
//     this.cost = new FormControl('', [Validators.required]);
//
//     this.depreciationForm = formBuilder.group({
//       'assetId': this.assetId,
//       'methodId': this.methodId,
//       'systemId': this.systemId,
//       'propertyClassId': this.propertyClassId,
//       'serviceDate': this.serviceDate,
//       'cost': this.cost,
//     });
//
//     this.pageSize = 15;
//
//    this.depreciationForm
//     .valueChanges
//     .subscribe(value => {
//       this.depreciation.methodId = value.methodId;
//       this.depreciation.systemId = value.systemId;
//       this.depreciation.propertyClassId = value.propertyClassId;
//       this.depreciation.serviceDate = value.serviceDate;
//       this.depreciation.cost = value.cost;
//     }, error => {
//       console.log(error);
//     });
//
//     this.depreciationSystem = [];
//     this.propertyClasses = [];
//     this.depreciationMethod = [];
//     this.doNotDisplayFailureMessage = true;
//   }
//
//   ngOnInit(): void {
//     this.depreciationService.getDepreciationSystem()
//       .subscribe( systems => {
//         if (systems) {
//           this.depreciationSystem = systems;
//           this.getPropertyClasses();
//           this.getDepreciationMethods('tax');
//         }
//       });
//
//     this.depreciationForm.get('systemId').valueChanges
//       .subscribe( value => {
//         if (value) {
//           console.log(value);
//           this.getDepreciationMethods('tax', value);
//           this.getPropertyClasses(value);
//         }
//       });
//
//     if (this.route.snapshot && this.route.snapshot.data['depreciation']) {
//       this.setInputValues(this.route.snapshot.data['depreciation']);
//     }
//
//     this.populateAssetIdDropDown();
//   }
//
//   private setInputValues(depreciation: Depreciation) {
//     this.assetId.setValue(depreciation.assetName);
//     this.systemId.setValue(depreciation.systemId);
//     this.methodId.setValue(depreciation.methodId);
//     this.propertyClassId.setValue(depreciation.propertyClassId);
//     this.serviceDate.setValue(depreciation.serviceDate);
//     this.cost.setValue(depreciation.cost);
//     this.depreciation = depreciation;
//     this.depreciationExist = true;
//   }
//
//   getPropertyClasses(system?: string) {
//     this.depreciationService.getPropertyClasses(system)
//       .subscribe( propertyClasses => {
//         if (propertyClasses) {
//           this.propertyClasses = propertyClasses;
//         }
//       })
//   }
//
//   getDepreciationMethods(type: string, system?: string) {
//     this.depreciationService.getDepreciationMethod(type, system)
//       .subscribe(methods => {
//         if (methods) {
//           this.depreciationMethod = methods;
//         }
//       });
//   }
//
//   private populateAssetIdDropDown() {
//     this.findAssets('');
//     this.depreciationForm.get('assetId').valueChanges
//       .pipe(debounceTime(1000), filter(value => { // filter out empty values
//         return !!(value);
//       }))
//       .subscribe(value => {
//         this.findAssets(value);
//       });
//   }
//
//   findAssets(value) {
//     // this.depreciationService
//     //   .findAssets(value, this.pageSize) // send search request to the backend
//     //   .pipe(map(value2 => { // convert results to dropdown data
//     //     return value2.map(v2 => {
//     //       return {
//     //         assetId: v2.assetId,
//     //         name: v2.assetType.name
//     //       };
//     //     })
//     //   }))
//     //   .subscribe(next => { // update the data
//     //     this.assetDataService = this.completerService.local(next, 'name', 'name');
//     //   }, error => {
//     //     console.log('findAssets error - ' + error);
//     //   });
//   }
//
//   get depreciationMethod(): DepreciationMethod[] {
//     return this._depreciationMethod;
//   }
//
//   set depreciationMethod(value: DepreciationMethod[]) {
//     this._depreciationMethod = value;
//   }
//
//   get assetId(): FormControl {
//     return this._assetId;
//   }
//
//   set assetId(value: FormControl) {
//     this._assetId = value;
//   }
//
//   get depreciationSystem(): DepreciationSystem[] {
//     return this._depreciationSystem;
//   }
//
//   set depreciationSystem(value: DepreciationSystem[]) {
//     this._depreciationSystem = value;
//   }
//
//   get propertyClasses(): PropertyClass[] {
//     return this._propertyClasses;
//   }
//
//   set propertyClasses(value: PropertyClass[]) {
//     this._propertyClasses = value;
//   }
//
//   get systemId(): FormControl {
//     return this._systemId;
//   }
//
//   set systemId(value: FormControl) {
//     this._systemId = value;
//   }
//
//   get propertyClassId(): FormControl {
//     return this._propertyClassId;
//   }
//
//   set propertyClassId(value: FormControl) {
//     this._propertyClassId = value;
//   }
//
//   get methodId(): FormControl {
//     return this._methodId;
//   }
//
//   set methodId(value: FormControl) {
//     this._methodId = value;
//   }
//
//   get serviceDate(): FormControl {
//     return this._serviceDate;
//   }
//
//   set serviceDate(value: FormControl) {
//     this._serviceDate = value;
//   }
//
//   get cost(): FormControl {
//     return this._cost;
//   }
//
//   set cost(value: FormControl) {
//     this._cost = value;
//   }
//
//
//   get depreciationForm(): FormGroup {
//     return this._depreciationForm;
//   }
//
//   set depreciationForm(value: FormGroup) {
//     this._depreciationForm = value;
//   }
//
//   // get assetDataService(): CompleterData {
//   //   return this._assetDataService;
//   // }
//   //
//   // set assetDataService(value: CompleterData) {
//   //   this._assetDataService = value;
//   // }
//
//   get doNotDisplayFailureMessage(): boolean {
//     return this._doNotDisplayFailureMessage;
//   }
//
//   set doNotDisplayFailureMessage(value: boolean) {
//     this._doNotDisplayFailureMessage = value;
//   }
//
//   // onAssetSelect(selected: CompleterItem) {
//   //   this.depreciation.assetId = selected.originalObject.assetId;
//   // }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//     this.depreciationService.addDepreciation(this.depreciation, 'tax')
//       .subscribe(value => {
//         if (value.depreciationId) {
//           this.router.navigate(['/depreciation/tax/schedule']);
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       });
//   }
//
//   onUpdate() {
//     this.doNotDisplayFailureMessage = true;
//       this.depreciationService.updateDepreciation(this.depreciation, 'tax')
//       .subscribe(value => {
//         if (value) {
//           this.router.navigate(['/depreciation/tax/schedule']);
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
//     this.router.navigate(['/depreciation/tax/schedule']);
//   }
//
// }
