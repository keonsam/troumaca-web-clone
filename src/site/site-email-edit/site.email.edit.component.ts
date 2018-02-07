import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Email} from "../email";
import {SiteService} from "../site.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'site-email-edit',
  templateUrl: './site.email.edit.component.html',
  styleUrls: ['./site.email.edit.component.css']
})
export class SiteEmailEditComponent implements OnInit {

  private siteId: string;
  private sub: any;
  private _name: FormControl;
  private _description: FormControl;
  private _domainName: FormControl;
  private _emailAddress: FormControl;

  private _siteEmailEditForm: FormGroup;

  private email: Email;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.name = new FormControl("", [Validators.required]);
     this.description = new FormControl("");
     this.domainName = new FormControl("", [Validators.required]);
     this.emailAddress = new FormControl("", [Validators.required]);

     this.siteEmailEditForm = formBuilder.group({
       "name": this.name,
       "description": this.description,
       "domainName": this.domainName,
       "emailAddress": this.emailAddress
     });

     this.email = new Email();

     this.siteEmailEditForm
     .valueChanges
     .subscribe(value => {
       this.setEmailValue(value);
       console.log(value);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.siteId = params['siteId'];
       this.siteService.getEmail(this.siteId)
       .subscribe(email =>{
        this.name.setValue(email.name);
        this.description.setValue(email.description);
        this.domainName.setValue(email.domainName);
        this.emailAddress.setValue(email.emailAddress);
        this.email = email;
      }, error => {
        console.log(error);
      }, () => {
        this.siteEmailEditForm
        .valueChanges
        .subscribe(value => {
          this.setEmailValue(value);
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
  }

  get domainName(): FormControl {
    return this._domainName;
  }

  set domainName(value: FormControl) {
    this._domainName = value;
  }

  get emailAddress(): FormControl {
    return this._emailAddress;
  }

  set emailAddress(value: FormControl) {
    this._emailAddress = value
  }

  get siteEmailEditForm(): FormGroup {
    return this._siteEmailEditForm;
  }

  set siteEmailEditForm(value: FormGroup) {
    this._siteEmailEditForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  setEmailValue(value) {
    this.email.name = value.name;
    this.email.description = value.description;
    this.email.domainName = value.domainName;
    this.email.emailAddress = value.emailAddress;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.siteService
    .updateEmail(this.siteId, this.email)
    .subscribe(value => {
      console.log(value);
      if (value) {
        this.router.navigate(['/sites/emails']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/sites/emails']);
  }

}
