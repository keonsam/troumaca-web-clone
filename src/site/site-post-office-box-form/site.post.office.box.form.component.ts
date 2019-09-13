// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {PostOfficeBox} from '../post.office.box';
// import {SiteService} from '../site.service';
// import {ActivatedRoute} from '@angular/router';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-site-post-office-box-form',
//   templateUrl: './site.post.office.box.form.component.html',
//   styleUrls: ['./site.post.office.box.form.component.css']
// })
// export class SitePostOfficeBoxFormComponent implements OnInit {
//
//   name: FormControl;
//   description: FormControl;
//   postOfficeBoxNumber: FormControl;
//   city: FormControl;
//   stateOrProvince: FormControl;
//   postalCode: FormControl;
//   country: FormControl;
//
//
//   sitePostOfficeBoxForm: FormGroup;
//
//   private postOfficeBox: PostOfficeBox;
//
//   doNotDisplayFailureMessage: boolean;
//   public postOfficeBoxExist = false;
//
//   constructor(private siteService: SiteService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//      this.name = new FormControl('', [Validators.required]);
//      this.description = new FormControl('');
//      this.postOfficeBoxNumber = new FormControl('', [Validators.required]);
//      this.city = new FormControl('', [Validators.required]);
//      this.stateOrProvince = new FormControl('', [Validators.required]);
//      this.postalCode = new FormControl('', [Validators.required]);
//      this.country = new FormControl('', [Validators.required]);
//
//
//      this.sitePostOfficeBoxForm = formBuilder.group({
//        'name': this.name,
//        'description': this.description,
//        'postOfficeBoxNumber': this.postOfficeBoxNumber,
//        'city': this.city,
//        'stateOrProvince': this.stateOrProvince,
//        'postalCode': this.postalCode,
//        'country': this.country
//      });
//
//      this.postOfficeBox = new PostOfficeBox();
//
//      this.sitePostOfficeBoxForm
//      .valueChanges
//      .subscribe(value => {
//        this.postOfficeBox.name = value.name;
//        this.postOfficeBox.description = value.description;
//        this.postOfficeBox.postOfficeBoxNumber = value.postOfficeBoxNumber;
//        this.postOfficeBox.city = value.city;
//        this.postOfficeBox.stateOrProvince = value.stateOrProvince;
//        this.postOfficeBox.postalCode = value.postalCode;
//        this.postOfficeBox.country = value.country;
//      }, error2 => {
//        console.log(error2);
//      });
//
//      this.doNotDisplayFailureMessage = true;
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['postOfficeBox']) {
//       this.setInputValues(this.route.snapshot.data['postOfficeBox']);
//     }
//   }
//
//   private setInputValues(postOfficeBox: PostOfficeBox) {
//     this.name.setValue(postOfficeBox.name);
//     this.description.setValue(postOfficeBox.description);
//     this.postOfficeBoxNumber.setValue(postOfficeBox.postOfficeBoxNumber);
//     this.city.setValue(postOfficeBox.city);
//     this.stateOrProvince.setValue(postOfficeBox.stateOrProvince);
//     this.postalCode.setValue(postOfficeBox.postalCode);
//     this.country.setValue(postOfficeBox.country);
//     this.postOfficeBox = postOfficeBox;
//     this.postOfficeBoxExist = true;
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//     this.siteService
//       .addPostOfficeBox(this.postOfficeBox)
//       .subscribe(value => {
//         if (value && value.siteId) {
//           this.router.navigate(['/sites/post-office-boxes']);
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
//     .updatePostOfficeBox(this.postOfficeBox.siteId, this.postOfficeBox)
//     .subscribe(value => {
//       if (value) {
//         this.router.navigate(['/sites/post-office-boxes']);
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
//     this.router.navigate(['/sites/post-office-boxes']);
//   }
//
// }
