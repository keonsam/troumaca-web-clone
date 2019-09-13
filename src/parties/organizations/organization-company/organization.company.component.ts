// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {Organization} from '../../organization';
// import {ActivatedRoute} from '@angular/router';
// import {OrganizationService} from '../organization.service';
// import {animate, state, style, transition, trigger} from '@angular/animations';
// import {CompanyInfo} from './company.info';
//
// @Component({
//   selector: 'app-organization-company',
//   templateUrl: './organization.company.component.html',
//   styleUrls: ['./organization.company.component.css'],
//   animations: [
//     trigger('slide', [
//       state('left', style({ transform: 'translateX(0)' })),
//       state('right', style({ transform: 'translateX(-50%)' })),
//       transition('* => *', animate(300))
//     ])
//   ]
// })
// export class OrganizationCompanyComponent implements OnInit {
//
//   name: FormControl;
//   purpose: FormControl;
//   organizationForm: FormGroup;
//   doNotDisplayFailureMessage = true;
//
//   organization: Organization;
//   company: CompanyInfo;
//   activePane = 'left';
//
//   constructor(private formBuilder: FormBuilder,
//               private organizationService: OrganizationService,
//               private route: ActivatedRoute) {
//     this.organization = new Organization();
//     this.purpose = new FormControl('');
//     this.name = new FormControl('', [Validators.required]);
//
//     this.organizationForm = formBuilder.group({
//       'purpose': this.purpose,
//       'name': this.name,
//     });
//
//     this.organizationForm.valueChanges
//       .subscribe(value => {
//         this.organization.name = value.name;
//         this.organization.purpose = value.purpose;
//       }, error2 => {
//         console.log(error2);
//       });
//
//     this.doNotDisplayFailureMessage = true;
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['company']) {
//       this.company = this.route.snapshot.data['company'];
//       this.setInputValues(this.company.organization);
//     }
//   }
//
//   private setInputValues(organization: Organization) {
//     this.name.setValue(organization.name);
//     this.purpose.setValue(organization.purpose);
//     this.organization = organization;
//   }
//
//   getOrganization() {
//     this.organizationService.getCompany()
//       .subscribe(value => {
//         this.company = value;
//         this.setInputValues(value.organization);
//         this.activePane = 'left';
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       });
//   }
//
//   onUpdate(): void {
//     this.doNotDisplayFailureMessage = true;
//     this.organizationService.updateOrganization(this.organization)
//       .subscribe(num => {
//         if (num) {
//           this.activePane = 'left';
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       }, error => {
//         console.log(error);
//         this.doNotDisplayFailureMessage = false;
//       });
//   }
//
//   cancel(): void {
//     this.getOrganization();
//   }
//
//   setActivePane(place: string) {
//     this.activePane = place;
//   }
//
// }
