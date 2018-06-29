import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';

import {PartyEventService} from '../../party.event.service';
import {PartyService} from '../../party.service';
import {Organization} from '../../organization';
import {Photo} from '../../photo';

@Component({
  selector: 'organization-company',
  templateUrl: './organization.company.component.html',
  styleUrls: ['./organization.company.component.css']
})
export class OrganizationCompanyComponent implements OnInit {

  @ViewChild('modalCloseButton') private modalCloseButton: ElementRef;

  private partyId: string;
  private _purpose: FormControl;
  private _name: FormControl;
  private _description: FormControl;

  private _companyEditForm: FormGroup;

  private _organization: Organization;
  private photo: Photo;

  private _imageChangedEvent: any = '';
  private croppedImage: any = '';
  private _backgroundImage: any = '';

  private _doNotDisplayFailureMessage: boolean;
  private _doNotDisplayFailureMessage2: boolean;


  constructor(private partyEventService: PartyEventService,
              private partyService: PartyService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.organization = new Organization();
    this.photo = new Photo();

    this.purpose = new FormControl('', [Validators.required]);
    this.name = new FormControl('', [Validators.required]);
    this.description = new FormControl('');

    this.companyEditForm = formBuilder.group({
      'purpose': this.purpose,
      'name': this.name,
      'description': this.description
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
    this.doNotDisplayFailureMessage2 = true;

  }

  ngOnInit(): void {

    this.partyService.getPartyId()
       .subscribe((partyId: string) => {
         this.partyId = partyId;
         this.partyService.getOrganization(this.partyId)
           .subscribe(organization => {
             this.purpose.setValue(organization.purpose);
             this.name.setValue(organization.name);
             this.description.setValue(organization.description);
             this.organization = organization;
           }, error => {
             console.log(error);
           });
         this.getOrganizationPhoto();
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

  get organization(): Organization {
    return this._organization;
  }

  set organization(value: Organization) {
    this._organization = value;
  }

  get imageChangedEvent(): any {
    return this._imageChangedEvent;
  }

  set imageChangedEvent(value: any) {
    this._imageChangedEvent = value;
  }

  get backgroundImage(): any {
    return this._backgroundImage;
  }

  set backgroundImage(value: any) {
    this._backgroundImage = value;
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

  get doNotDisplayFailureMessage2(): boolean {
    return this._doNotDisplayFailureMessage2;
  }

  set doNotDisplayFailureMessage2(value: boolean) {
    this._doNotDisplayFailureMessage2 = value;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }

  imageCropped(image: string) {
    this.croppedImage = image;
  }

  getOrganizationPhoto() {
      this.partyService.getPhoto(this.partyId, 'organization')
        .subscribe(photo => {
          if (photo) {
            this.backgroundImage = `url(${photo.imageStr})`;
            this.photo = photo
          } else {
            this.backgroundImage = 'url(http://backgroundcheckall.com/wp-content/uploads/2017/12/windows-7-default-background-4.jpg)';
          }
        }, error => {
          this.backgroundImage = 'url(http://backgroundcheckall.com/wp-content/uploads/2017/12/windows-7-default-background-4.jpg)';
          console.log(error);
        });
  }


  uploadPhoto() {
    this.doNotDisplayFailureMessage2 = true;
    if (this.photo.imageStr) {
      this.photo.imageStr = this.croppedImage;
      this.partyService
        .updatePhoto(this.partyId, this.photo, 'organization')
        .subscribe(value => {
          if (value) {
            this.getOrganizationPhoto();
            this.modalCloseButton.nativeElement.click();
          }else {
            this.doNotDisplayFailureMessage2 = false;
            console.log('error');
          }
        }, error => {
          this.doNotDisplayFailureMessage2 = false;
          console.log(error);
        });
    }else if (this.croppedImage) {
      this.photo.partyId = this.partyId;
      this.photo.imageStr = this.croppedImage;
      this.partyService
        .addPhoto(this.partyId, this.photo, 'organization')
        .subscribe(value => {
          if (value) {
            this.getOrganizationPhoto();
            this.modalCloseButton.nativeElement.click();
          } else {
            this.doNotDisplayFailureMessage2 = false;
            console.log('error');
          }
        }, error => {
          this.doNotDisplayFailureMessage2 = false;
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
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        console.log(error);
        this.doNotDisplayFailureMessage = false;
      });
  }

}
