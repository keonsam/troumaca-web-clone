import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {WebSite} from "../web.site";
import {SiteService} from "../site.service";
import {ActivatedRoute} from '@angular/router';

import {Router} from "@angular/router";

@Component({
  selector: 'site-web--edit',
  templateUrl: './site.web.edit.component.html',
  styleUrls: ['./site.web.edit.component.css']
})
export class SiteWebEditComponent implements OnInit {

  private siteId: string;
  private sub: any;
  private _name: FormControl;
  private _description: FormControl;
  private _uniformResourceIdentifer: FormControl;

  private _siteWebSiteEditForm: FormGroup;

  private webSite: WebSite;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.name = new FormControl("", [Validators.required]);
     this.description = new FormControl("");
     this.uniformResourceIdentifer = new FormControl("", [Validators.required]);

     this.siteWebSiteEditForm = formBuilder.group({
       "name": this.name,
       "description": this.description,
       "uniformResourceIdentifer": this.uniformResourceIdentifer
     });

     this.webSite = new WebSite();

     this.siteWebSiteEditForm
     .valueChanges
     .subscribe(value => {
       this.setWebSiteValue(value);
       console.log(value);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
       this.siteId = params['siteId'];
       this.siteService.getWebSite(this.siteId)
       .subscribe(webSite =>{
        this.name.setValue(webSite.name);
        this.description.setValue(webSite.description);
        this.uniformResourceIdentifer.setValue(webSite.uniformResourceIdentifer);
        this.webSite = webSite;
      }, error => {
        console.log(error);
      }, () => {
        this.siteWebSiteEditForm
        .valueChanges
        .subscribe(value => {
          this.setWebSiteValue(value);
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

  get uniformResourceIdentifer(): FormControl {
    return this._uniformResourceIdentifer;
  }

  set uniformResourceIdentifer(value: FormControl) {
    this._uniformResourceIdentifer = value
  }

  get siteWebSiteEditForm(): FormGroup {
    return this._siteWebSiteEditForm;
  }

  set siteWebSiteEditForm(value: FormGroup) {
    this._siteWebSiteEditForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  setWebSiteValue(value) {
    this.webSite.name = value.name;
    this.webSite.description = value.description;
    this.webSite.uniformResourceIdentifer = value.uniformResourceIdentifer;
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
    this.siteService
    .updateWebSite(this.siteId,this.webSite)
    .subscribe(value => {
      console.log(value);
      if (value) {
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
