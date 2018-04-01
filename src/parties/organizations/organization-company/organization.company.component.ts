import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";


import {PartyEventService} from "../../party.event.service";
import {PartyService} from "../../party.service";
import {Organization} from "../../organization";

@Component({
  selector: 'organization-company',
  templateUrl:'./organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  private partyId: string;
  private _purpose: FormControl;
  private _name: FormControl;


  private _companyEditForm: FormGroup;

  private organization: Organization;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private backgroundImage: any = '';
  private defaultImage: string;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.organization = new Organization();

    this.purpose = new FormControl("", [Validators.required]);
    this.name = new FormControl("", [Validators.required]);

    this.companyEditForm = formBuilder.group({
      "purpose": this.purpose,
      "name": this.name
    });

    this.companyEditForm
     .valueChanges
     .subscribe(value => {
       this.organization.purpose = value.purpose;
       this.organization.name = value.name;
     }, error2 => {
       console.log(error2);
     });

     this.defaultImage = "url(http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)";

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {
     this.partyId = "83e51087-cc18-4a91-93dd-62fc41f5d513";
     this.partyService.getOrganization(this.partyId)
     .subscribe(organization =>{
      this.purpose.setValue(organization.purpose);
      this.name.setValue(organization.name);
      this.organization = organization;
    }, error => {
      console.log(error);
    });

    this.partyService.getPhoto(this.partyId)
    .subscribe(imageStr => {
      if(imageStr) {
        this.backgroundImage= `url(${imageStr})`;
      }else {
        // default image moved to the front end
        this.backgroundImage= this.defaultImage;
      }
    },error => {
      console.log(error);
    });
  }


  get purpose(): FormControl {
    return this._purpose;
  }

  set purpose(value: FormControl) {
    this._purpose = value;
  }

  get name(): FormControl {
    return this._name;
  }

  set name(value: FormControl) {
    this._name = value;
  }

  get companyEditForm(): FormGroup {
    return this._companyEditForm;
  }

  set companyEditForm(value: FormGroup) {
    this._companyEditForm = value;
  }

  get doNotDisplayFailureMessage(): boolean {
    return this._doNotDisplayFailureMessage;
  }

  set doNotDisplayFailureMessage(value: boolean) {
    this._doNotDisplayFailureMessage = value;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }


  uploadPhoto() {
    if(this.backgroundImage === this.defaultImage) {
      this.partyService
      .addPhoto(this.partyId, this.croppedImage)
      .subscribe(value => {
        if(value){
        this.backgroundImage = `url(${this.croppedImage})`;
        }else {
          console.log("error");
        }
      }, error => {
        console.log(error);
      });
    }else {
      this.partyService
      .updatePhoto(this.partyId, this.croppedImage)
      .subscribe(value => {
        if(value){
        this.backgroundImage = `url(${this.croppedImage})`;
        }else {
          console.log("error");
        }
      }, error => {
        console.log(error);
      });
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
      this.partyService
      .updateOrganization(this.organization)
      .subscribe(value => {
        if (value) {
           this.router.navigate(['/parties/organizations/listing']);
           //this.updateCredential();
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
