// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {Email} from '../email';
// import {SiteService} from '../site.service';
// import {ActivatedRoute} from '@angular/router';
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-site-email-form',
//   templateUrl: './site.email.form.component.html',
//   styleUrls: ['./site.email.form.component.css']
// })
// export class SiteEmailFormComponent implements OnInit {
//
//   name: FormControl;
//   description: FormControl;
//   domainName: FormControl;
//   emailAddress: FormControl;
//
//   siteEmailForm: FormGroup;
//
//   private email: Email;
//
//   doNotDisplayFailureMessage: boolean;
//   emailExist = false;
//
//   constructor(private siteService: SiteService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//      this.name = new FormControl('', [Validators.required]);
//      this.description = new FormControl('');
//      this.domainName = new FormControl('', [Validators.required]);
//      this.emailAddress = new FormControl('', [Validators.required]);
//
//      this.siteEmailForm = formBuilder.group({
//        'name': this.name,
//        'description': this.description,
//        'domainName': this.domainName,
//        'emailAddress': this.emailAddress
//      });
//
//      this.email = new Email();
//
//      this.siteEmailForm
//      .valueChanges
//      .subscribe(value => {
//        this.email.name = value.name;
//        this.email.description = value.description;
//        this.email.domainName = value.domainName;
//        this.email.emailAddress = value.emailAddress;
//      }, error2 => {
//        console.log(error2);
//      });
//
//      this.doNotDisplayFailureMessage = true;
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['email']) {
//       this.setInputValues(this.route.snapshot.data['email']);
//     }
//   }
//
//   private setInputValues(email: Email) {
//     this.name.setValue(email.name);
//     this.description.setValue(email.description);
//     this.domainName.setValue(email.domainName);
//     this.emailAddress.setValue(email.emailAddress);
//     this.email = email;
//     this.emailExist = true;
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//     this.siteService
//       .addEmail(this.email)
//       .subscribe( value => {
//         if (value.siteId) {
//           this.router.navigate(['/sites/emails']);
//         } else {
//           this.doNotDisplayFailureMessage = false;
//         }
//       });
//   }
//
//   onUpdate() {
//     this.doNotDisplayFailureMessage = true;
//     this.siteService
//     .updateEmail(this.email.siteId, this.email)
//     .subscribe(value => {
//       if (value) {
//         this.router.navigate(['/sites/emails']);
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
//     this.router.navigate(['/sites/emails']);
//   }
//
// }
