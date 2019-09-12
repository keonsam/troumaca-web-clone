// import {Component, OnInit} from '@angular/core';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {WebSite} from '../web.site';
// import {SiteService} from '../site.service';
// import {ActivatedRoute} from '@angular/router';
//
// import {Router} from '@angular/router';
//
// @Component({
//   selector: 'app-site-web--form',
//   templateUrl: './site.web.form.component.html',
//   styleUrls: ['./site.web.form.component.css']
// })
// export class SiteWebFormComponent implements OnInit {
//
//   name: FormControl;
//   description: FormControl;
//   uniformResourceIdentifier: FormControl;
//
//   siteWebSiteForm: FormGroup;
//
//   private webSite: WebSite;
//
//   doNotDisplayFailureMessage: boolean;
//   webSiteExist = false;
//
//   constructor(private siteService: SiteService,
//               private formBuilder: FormBuilder,
//               private route: ActivatedRoute,
//               private router: Router) {
//
//      this.name = new FormControl('', [Validators.required]);
//      this.description = new FormControl('');
//      this.uniformResourceIdentifier = new FormControl('', [Validators.required]);
//
//      this.siteWebSiteForm = formBuilder.group({
//        'name': this.name,
//        'description': this.description,
//        'uniformResourceIdentifier': this.uniformResourceIdentifier
//      });
//
//      this.webSite = new WebSite();
//
//      this.siteWebSiteForm
//      .valueChanges
//      .subscribe(value => {
//        this.webSite.name = value.name;
//        this.webSite.description = value.description;
//        this.webSite.uniformResourceIdentifier = value.uniformResourceIdentifier;
//      }, error2 => {
//        console.log(error2);
//      });
//
//      this.doNotDisplayFailureMessage = true;
//   }
//
//   ngOnInit(): void {
//     if (this.route.snapshot && this.route.snapshot.data['webSite']) {
//       this.setInputValues(this.route.snapshot.data['webSite']);
//     }
//   }
//
//   private setInputValues(webSite: WebSite) {
//     this.name.setValue(webSite.name);
//     this.description.setValue(webSite.description);
//     this.uniformResourceIdentifier.setValue(webSite.uniformResourceIdentifier);
//     this.webSite = webSite;
//     this.webSiteExist = true;
//   }
//
//   onCreate() {
//     this.doNotDisplayFailureMessage = true;
//     this.siteService
//       .addWebSite(this.webSite)
//       .subscribe(value => {
//         if (value && value.siteId) {
//           this.router.navigate(['/sites/web-sites']);
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
//     .updateWebSite(this.webSite.siteId, this.webSite)
//     .subscribe(value => {
//       if (value) {
//         this.router.navigate(['/sites/web-sites']);
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
//     this.router.navigate(['/sites/web-sites']);
//   }
//
// }
