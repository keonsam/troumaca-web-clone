import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {PostOfficeBox} from "../post.office.box";
import {SiteService} from "../site.service";
import {ActivatedRoute} from '@angular/router';
import {Router} from "@angular/router";

@Component({
  selector: 'site-post-office-box-edit',
  templateUrl: './site.post.office.box.edit.component.html',
  styleUrls: ['./site.post.office.box.edit.component.css']
})
export class SitePostOfficeBoxEditComponent implements OnInit {

  private siteId: string;
  private sub: any;
  private _postOfficeBoxNumber: FormControl;


  private _sitePostOfficeBoxEditForm: FormGroup;

  private postOfficeBox: PostOfficeBox;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private siteService:SiteService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.postOfficeBoxNumber = new FormControl("", [Validators.required]);


     this.sitePostOfficeBoxEditForm = formBuilder.group({
       "postOfficeBoxNumber": this.postOfficeBoxNumber
     });

     this.postOfficeBox = new PostOfficeBox();

     this.sitePostOfficeBoxEditForm
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
    this.sub = this.route.params.subscribe(params => {
       this.siteId = params['siteId'];
       this.siteService.getPostOfficeBox(this.siteId)
       .subscribe(postOfficeBox =>{
        this.postOfficeBoxNumber.setValue(postOfficeBox.postOfficeBoxNumber);
      }, error => {
        console.log(error);
      }, () => {
        this.sitePostOfficeBoxEditForm
        .valueChanges
        .subscribe(value => {
          this.postOfficeBox.postOfficeBoxNumber = value.postOfficeBoxNumber;
          console.log(value);
        }, error2 => {
          console.log(error2);
        });
      })
    });
  }

  get postOfficeBoxNumber(): FormControl {
    return this._postOfficeBoxNumber;
  }

  set postOfficeBoxNumber(value: FormControl) {
    this._postOfficeBoxNumber = value
  }

  get sitePostOfficeBoxEditForm(): FormGroup {
    return this._sitePostOfficeBoxEditForm;
  }

  set sitePostOfficeBoxEditForm(value: FormGroup) {
    this._sitePostOfficeBoxEditForm = value;
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
    .updatePostOfficeBox(this.siteId, this.postOfficeBox)
    .subscribe(value => {
      if (value) {
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
