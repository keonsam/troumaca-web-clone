import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostOfficeBox} from "../post.office.box";
import {SiteService} from "../site.service";
import {Router} from "@angular/router";

@Component({
  selector: 'site-post-office-box-creation',
  templateUrl: './site.post.office.box.creation.component.html',
  styleUrls: ['./site.post.office.box.creation.component.css']
})
export class SitePostOfficeBoxCreationComponent implements OnInit {

  private _postOfficeBoxNumber: FormControl;


  private _sitePostOfficeBoxForm: FormGroup;

  private postOfficeBox: PostOfficeBox;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private router: Router) {

     this.postOfficeBoxNumber = new FormControl("", [Validators.required]);


     this.sitePostOfficeBoxForm = formBuilder.group({
       "postOfficeBoxNumber": this.postOfficeBoxNumber
     });

     this.postOfficeBox = new PostOfficeBox();

     this.sitePostOfficeBoxForm
     .valueChanges
     .subscribe(value => {
       this.postOfficeBox.postOfficeBoxNumber = value.postOfficeBoxNumber;
       console.log(value);
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
  }

  get postOfficeBoxNumber(): FormControl {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: FormControl) {
    this._postOfficeBoxNumber = value
  }

  get sitePostOfficeBoxForm(): FormGroup {
    return this._sitePostOfficeBoxForm;
  }

  set sitePostOfficeBoxForm(value: FormGroup) {
    this._sitePostOfficeBoxForm = value;
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
    .addPostOfficeBox(this.postOfficeBox)
    .subscribe(value => {
      if (value && value.siteId) {
        this.router.navigate(['/sites/post-office-boxes']);
      } else {
        this.doNotDisplayFailureMessage = false;
      }
    }, error => {
      console.log(error);
      this.doNotDisplayFailureMessage = false;
    });
  }

  cancel() {
    this.router.navigate(['/sites/post-office-boxes']);
  }

}
