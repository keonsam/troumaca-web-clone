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
  private _description: FormControl;

  private _companyEditForm: FormGroup;

  private organization: Organization;

  private imageChangedEvent: any = '';
  private croppedImage: any = '';
  private backgroundImage: any = '';
  private updateImage: boolean = false;

  private _doNotDisplayFailureMessage: boolean;

  constructor(private partyEventService:PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.organization = new Organization();

    this.purpose = new FormControl("", [Validators.required]);
    this.name = new FormControl("", [Validators.required]);
    this.description = new FormControl("");

    this.companyEditForm = formBuilder.group({
      "purpose": this.purpose,
      "name": this.name,
      "description": this.description
    });

    this.companyEditForm
     .valueChanges
     .subscribe(value => {
       this.organization.purpose = value.purpose;
       this.organization.name = value.name;
       this.organization.description = value.description;
     }, error2 => {
       console.log(error2);
     });

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit(): void {

    this.backgroundImage = "http://i0.wp.com/www.xcelerationfit.com/wp-content/plugins/elementor/assets/images/placeholder.png?w=825)";

    this.partyService.getPartyId()
       .subscribe((partyId: string) => {
         console.log(partyId);
         this.partyId = partyId;
         this.partyService.getOrganization(this.partyId)
           .subscribe(organization =>{
             this.purpose.setValue(organization.purpose);
             this.name.setValue(organization.name);
             this.description.setValue(organization.description);
             this.organization = organization;
           }, error => {
             console.log(error);
           });

         this.partyService.getPhoto(this.partyId, "organization")
           .subscribe(imageStr => {
             if(imageStr) {
               this.updateImage = true;
               this.backgroundImage = imageStr;
             }
           },error => {
             console.log(error);
           });
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

  get description(): FormControl {
    return this._description;
  }

  set description(value: FormControl) {
    this._description = value;
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

  getBackgroundImage() {
    if(this.croppedImage && this.croppedImage !== this.backgroundImage) {
      return `url(${this.croppedImage})`;
    }
    return `url(${this.backgroundImage})`;
  }

  pictureModalClose() {
    this.croppedImage = this.backgroundImage;
  }

  uploadPhoto() {
    // New and better algorithm
    if(this.updateImage && this.croppedImage !== this.backgroundImage) {
      this.partyService
        .updatePhoto(this.partyId, this.croppedImage, "organization")
        .subscribe(value => {
          if(value){
            this.backgroundImage = this.croppedImage;
          }else {
            console.log("error");
          }
        }, error => {
          console.log(error);
        });
    }else if(this.croppedImage) {
      this.partyService
        .addPhoto(this.partyId, this.croppedImage, "organization")
        .subscribe(value => {
          if(value){
            this.backgroundImage = this.croppedImage;
          }else {
            // TODO: make errors fail to upload picture or something like that.
            console.log("error");
          }
        }, error => {
          console.log(error);
        });
    }else {
      console.log("image not uploaded");
    }
  }

  onCreate() {
    this.doNotDisplayFailureMessage = true;
      this.partyService
      .updateOrganization(this.organization)
      .subscribe(value => {
        if (value) {
           this.router.navigate(['/parties/organizations/listing']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
