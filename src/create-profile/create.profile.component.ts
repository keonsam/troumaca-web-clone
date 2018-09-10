import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserResponse} from '../parties/user.response';
import {CompleterService, CompleterData, CompleterItem} from 'ng2-completer';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {debounceTime, filter, map} from 'rxjs/operators';
import {OrganizationService} from '../parties/organizations/organization.service';
import { MatStepper } from '@angular/material';
import {EventService} from '../event/event.service';
import {Event} from '../authentication/event';

@Component({
  selector: 'app-create-profile',
  templateUrl: 'create.profile.component.html',
  styleUrls: ['create.profile.component.css']
})

export class CreateProfileComponent implements OnInit {
  private _organizationId: FormControl;
  private _requestAccessForm: FormGroup;
  organizationDataService: CompleterData;
  selectedOrganization: any;

  private pageSize: number;

  userCompleted = false;
  organizationCompleted = false;
  userResponse: UserResponse;
  doNotDisplayFailureMessage = true;
  @ViewChild('stepper') stepper: MatStepper;
  requestAccessed = false;
  tab = 0;
  createdOrganization = false;

  constructor(private route: ActivatedRoute,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
              private eventService: EventService,
              private router: Router) {

    this.organizationId = new FormControl('', [Validators.required]);
    this.requestAccessForm = formBuilder.group({
      'organizationId': this.organizationId
    });
    this.pageSize = 15;
    this.selectedOrganization = {
      name: 'not an organization',
      partyId: undefined
    }
  }

  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['userResponse']) {
      this.userResponse = this.route.snapshot.data['userResponse'];
    }


    this.populateOrganizationDropDown();
  }

  toggleTab(index) {
    this.tab = index;
  }

  private populateOrganizationDropDown() {
    this.requestAccessForm.get('organizationId').valueChanges
      .pipe(debounceTime(1000), filter(value => { // filter out empty values
        return !!(value);
      }))
      .subscribe(value => {
        this.findOrganization(value);
      });
  }

  private findOrganization(value) {
    this.organizationService
      .findOrganizations(value, this.pageSize) // send search request to the backend
      .pipe(map(value2 => { // convert results to dropdown data
        return value2.map(v2 => {
          return {
            partyId: v2.partyId,
            name: v2.name
          };
        })
      }))
      .subscribe(next => { // update the data
        this.organizationDataService = this.completerService.local(next, 'name', 'name');
      }, error => {
        console.log('findOrganizations error - ' + error);
      });
  }

  get organizationId(): FormControl {
    return this._organizationId;
  }

  set organizationId(value: FormControl) {
    this._organizationId = value;
  }

  get requestAccessForm(): FormGroup {
    return this._requestAccessForm;
  }

  set requestAccessForm(value: FormGroup) {
    this._requestAccessForm = value;
  }

  onOrganizationSelect(selected: CompleterItem) {
    if (selected) {
      this.selectedOrganization = selected.originalObject;
    }
  }

  nextStep(created: boolean, index: number) {
    if (created) {
      this.organizationCompleted = true;
      setTimeout(() => {
        this.stepper.selectedIndex = index;
      }, 500);
    }else {
      if (this.stepper.selectedIndex !== index) {
        this.stepper.selectedIndex = index;
      }
    }
  }

  private createEventModel() {
    const event: Event = new Event();
    event.partyId = '123';
    event.timestamp = new Date().getTime();
    event.source = 'create.profile.component';
    event.name = 'login';

    return event;
  }

  loginUserIn() {
    this.eventService.sendLoginEvent(this.createEventModel());
    this.router.navigate(['/lobby']);
  }

  onNext() {
    if (this.userCompleted) {
      this.sendRequest();
    }else {
      this.requestAccessed = true;
      this.nextStep(true, 1);
    }
  }

  private sendRequest() {
    this.organizationService.sendOrganizationRequest(this.selectedOrganization.partyId)
      .subscribe(value => {
        if (value) {
          this.loginUserIn();
        }else {
          // This needs more logic what is the organization is set to not accept requests
          this.doNotDisplayFailureMessage = false;
          this.nextStep(false, 0);
        }
      });
  }

  doOrganizationCreated() {
    this.createdOrganization = true;
  }

  doUserCreated(created: boolean) {
    this.userCompleted = true;
    if (created && this.requestAccessed) {
      this.sendRequest();
    }else if (created) {
      this.loginUserIn();
    }
  }

  onCancel() {
    this.organizationId.setValue('');
    this.requestAccessed = false;
    this.organizationCompleted = false;
  }
}
