import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WebSite} from "../web.site";
import {SiteService} from "../site.service";
import {Router} from "@angular/router";

@Component({
  selector: 'site-web--creation',
  templateUrl: './site.web.creation.component.html',
  styleUrls: ['./site.web.creation.component.css']
})
export class SiteWebCreationComponent implements OnInit {

  private _name: FormControl;
  private _description: FormControl;
  private _uniformResourceIdentifer: FormControl;

  private _siteWebSiteForm: FormGroup;

  private webSite: WebSite;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private router: Router) {

     this.name = new FormControl("", [Validators.required]);
     this.description = new FormControl("");
     this.uniformResourceIdentifer = new FormControl("", [Validators.required]);

     this.siteWebSiteForm = formBuilder.group({
       "name": this.name,
       "description": this.description,
       "uniformResourceIdentifer": this.uniformResourceIdentifer
     });

     this.webSite = new WebSite();

     this.siteWebSiteForm
     .valueChanges
     .subscribe(value => {
       this.webSite.name = value.name;
       this.webSite.description = value.description;
       this.webSite.uniformResourceIdentifer = value.uniformResourceIdentifer;
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
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

  get uniformResourceIdentifer(): FormControl {
    return this._uniformResourceIdentifer;
  }

  set uniformResourceIdentifer(value: FormControl) {
    this._uniformResourceIdentifer = value
  }

  get siteWebSiteForm(): FormGroup {
    return this._siteWebSiteForm;
  }

  set siteWebSiteForm(value: FormGroup) {
    this._siteWebSiteForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.siteService
    .addWebSite(this.webSite)
    .subscribe(value => {
      if (value && value.siteId) {
        this.router.navigate(['/sites/web-sites']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/sites/web-sites']);
  }

}
