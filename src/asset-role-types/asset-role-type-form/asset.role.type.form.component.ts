// import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {ActivatedRoute, Router} from '@angular/router';
// import {AssetRoleType} from '../asset.role.type';
// import {AssetRoleTypeService} from '../asset.role.type.service';
// import {ASSET_ROLE_TYPE, ASSET_SETTING} from '../../app/routes';
//
// @Component({
//   selector: 'app-asset-role-type-form',
//   templateUrl: './asset.role.type.form.component.html',
//   styleUrls: ['./asset.role.type.form.component.css']
// })
// export class AssetRoleTypeFormComponent implements OnInit {
//
//   name: FormControl;
//   description: FormControl;
//   assetRoleTypeForm: FormGroup;
//
//   update = false;
//   doNotDisplayFailureMessage = true;
//
//   private assetRoleType: AssetRoleType;
//   private assetRoleTypeLink = `/${ASSET_SETTING}/${ASSET_ROLE_TYPE}/listing`;
//   @Input() trans: boolean;
//   @Output() panel: EventEmitter<string> = new EventEmitter();
//   constructor(private assetRoleTypeService: AssetRoleTypeService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//     this.assetRoleType = new AssetRoleType();
//
//     this.name = new FormControl('', Validators.required);
//     this.description = new FormControl('');
//
//     this.assetRoleTypeForm = formBuilder.group({
//       'name': this.name,
//       'description': this.description
//     });
//
//     this.assetRoleTypeForm
//       .valueChanges
//       .subscribe(value => {
//         this.assetRoleType.name = value.name;
//         this.assetRoleType.description = value.description;
//       });
//
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['assetRoleType']) {
//       const assetRoleType = this.route.snapshot.data['assetRoleType'];
//       this.setInputValues(assetRoleType);
//       this.update = true;
//       this.assetRoleType = assetRoleType;
//     }
//   }
//
//   setInputValues(assetRoleType: AssetRoleType) {
//     this.name.setValue(assetRoleType.name);
//     this.description.setValue(assetRoleType.description);
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//
//     this.assetRoleTypeService.addAssetRoleType(this.assetRoleType)
//       .subscribe( value => {
//         if (value && value.assetRoleTypeId) {
//           this.goRoute();
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       })
//   }
//
//   onUpdate() {
//     this.doNotDisplayFailureMessage = true;
//
//     this.assetRoleTypeService.updateAssetRoleType(this.assetRoleType)
//       .subscribe( value => {
//         if (value) {
//           this.goRoute();
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       })
//   }
//
//   cancel() {
//     this.goRoute();
//   }
//
//   private goRoute() {
//     if (this.trans) {
//       this.panel.emit('home');
//     }else {
//       this.router.navigate([this.assetRoleTypeLink]);
//     }
//   }
// }
