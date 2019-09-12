// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
//
// import {ResourceType} from '../../resource.type';
// import {AccessRoleService} from '../../access.role.service';
// import {ActivatedRoute, Router} from '@angular/router';
//
// @Component({
//   selector: 'app-resource-type-form',
//   templateUrl: './resource.type.form.component.html',
//   styleUrls: ['./resource.type.form.component.css']
// })
// export class ResourceTypeFormComponent implements OnInit {
//   name: FormControl;
//   description: FormControl;
//   resourceTypeForm: FormGroup;
//   doNotDisplayFailureMessage: boolean;
//   resourceExist = false;
//
//   private resourceType: ResourceType;
//
//   constructor(private accessRoleService: AccessRoleService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//     this.name = new FormControl('', [Validators.required]);
//     this.description = new FormControl('');
//
//     this.resourceTypeForm = formBuilder.group({
//       'name': this.name,
//       'description': this.description
//     });
//
//     this.resourceTypeForm
//       .valueChanges
//       .subscribe(value => {
//         this.resourceType.name = value.name;
//         this.resourceType.description = value.description;
//       }, error2 => {
//         console.log(error2);
//       });
//
//     this.resourceType = new ResourceType();
//
//     this.doNotDisplayFailureMessage = true;
//   }
//
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['resourceType']) {
//       this.setInputValues(this.route.snapshot.data['resourceType']);
//     }
//   }
//
//   private setInputValues(resourceType: ResourceType) {
//     this.name.setValue(resourceType.name);
//     this.description.setValue(resourceType.description);
//     this.resourceExist = true;
//     this.resourceType = resourceType;
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//
//     this.accessRoleService.addResourceType(this.resourceType)
//       .subscribe( resourceType => {
//         if (resourceType.resourceTypeId) {
//           this.router.navigate(['/access-roles/resource-types']);
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
//
//     this.accessRoleService.updateResourceType(this.resourceType)
//       .subscribe( resourceType => {
//         if (resourceType) {
//           this.router.navigate(['/access-roles/resource-types']);
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         this.doNotDisplayFailureMessage = false;
//       });
//   }
//
//   cancel() {
//     this.router.navigate(['/access-roles/resource-types']);
//   }
//
// }
