// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {StreetAddress} from '../street.address';
// import {SiteService} from '../site.service';
// import {ActivatedRoute} from '@angular/router';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-site-street-address-form ',
//   templateUrl: './site.street.address.form.component.html',
//   styleUrls: ['./site.street.address.form.component.css']
// })
// export class SiteStreetAddressFormComponent implements OnInit {
//
//   name: FormControl;
//   suiteOrApartment: FormControl;
//   floor: FormControl;
//   suiteOrApartmentNumber: FormControl;
//   description: FormControl;
//   streetNumber: FormControl;
//   street: FormControl;
//   city: FormControl;
//   stateOrProvince: FormControl;
//   postalCode: FormControl;
//   country: FormControl;
//
//   siteStreetAddressForm: FormGroup;
//
//   private streetAddress: StreetAddress;
//
//   doNotDisplayFailureMessage: boolean;
//   streetAddressExist = false;
//
//   constructor(private siteService: SiteService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//      this.name = new FormControl('', [Validators.required]);
//      this.suiteOrApartment = new FormControl('', [Validators.required]);
//      this.floor = new FormControl('', [Validators.required]);
//      this.suiteOrApartmentNumber = new FormControl('', [Validators.required]);
//      this.description = new FormControl('');
//      this.streetNumber = new FormControl('');
//      this.street = new FormControl('', [Validators.required]);
//      this.city = new FormControl('', [Validators.required]);
//      this.stateOrProvince = new FormControl('', [Validators.required]);
//      this.postalCode = new FormControl('', [Validators.required]);
//      this.country = new FormControl('', [Validators.required]);
//
//
//      this.siteStreetAddressForm = formBuilder.group({
//        'name': this.name,
//        'suiteOrApartment': this.suiteOrApartment,
//        'floor': this.floor,
//        'suiteOrApartmentNumber': this.suiteOrApartmentNumber,
//        'description': this.description,
//        'streetNumber': this.streetNumber,
//        'street': this.street,
//        'city': this.city,
//        'stateOrProvince': this.stateOrProvince,
//        'postalCode': this.postalCode,
//        'country': this.country
//      });
//
//      this.streetAddress = new StreetAddress();
//
//      this.siteStreetAddressForm
//      .valueChanges
//      .subscribe(value => {
//        this.streetAddress.name = value.name;
//        this.streetAddress.suiteOrApartment = value.suiteOrApartment;
//        this.streetAddress.floor = value.floor;
//        this.streetAddress.suiteOrApartmentNumber = value.suiteOrApartmentNumber;
//        this.streetAddress.description = value.description;
//        this.streetAddress.streetNumber = value.streetNumber;
//        this.streetAddress.streetName = value.street;
//        this.streetAddress.city = value.city;
//        this.streetAddress.stateOrProvince = value.stateOrProvince;
//        this.streetAddress.postalCode = value.postalCode;
//        this.streetAddress.country = value.country;
//      }, error2 => {
//        console.log(error2);
//      });
//
//      this.doNotDisplayFailureMessage = true;
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['streetAddress']) {
//       this.setInputValues(this.route.snapshot.data['streetAddress']);
//     }
//   }
//
//   private setInputValues(streetAddress: StreetAddress) {
//     this.name.setValue(streetAddress.name);
//     this.suiteOrApartment.setValue(streetAddress.suiteOrApartment);
//     this.floor.setValue(streetAddress.floor);
//     this.suiteOrApartmentNumber.setValue(streetAddress.suiteOrApartmentNumber);
//     this.description.setValue(streetAddress.description);
//     this.streetNumber.setValue(streetAddress.streetNumber);
//     this.street.setValue(streetAddress.streetName);
//     this.city.setValue(streetAddress.city);
//     this.stateOrProvince.setValue(streetAddress.stateOrProvince);
//     this.postalCode.setValue(streetAddress.postalCode);
//     this.country.setValue(streetAddress.country);
//     this.streetAddress = streetAddress;
//     this.streetAddressExist = true;
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//     this.siteService
//       .addStreetAddress(this.streetAddress)
//       .subscribe(value => {
//         if (value && value.siteId) {
//           this.router.navigate(['/sites/street-addresses']);
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
//     this.siteService
//     .updateStreetAddress(this.streetAddress.siteId, this.streetAddress)
//     .subscribe(value => {
//       if (value) {
//         this.router.navigate(['/sites/street-addresses']);
//       } else {
//         this.doNotDisplayFailureMessage = false;
//       }
//     }, error => {
//       console.log(error);
//       this.doNotDisplayFailureMessage = false;
//     });
//   }
//
//   cancel() {
//     this.router.navigate(['/sites/street-addresses']);
//   }
//
// }
