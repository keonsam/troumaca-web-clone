import {Component, OnInit} from "@angular/core";
import {JoinOrganization} from "../../join.organization";
import {FormControl, FormGroup, FormBuilder, Validators} from "@angular/forms";
import { Router } from "@angular/router";
import { CompleterService, CompleterData, CompleterItem } from "ng2-completer";
import { OrganizationService } from "../organization.service";
import { debounceTime, filter, map} from "rxjs/operators";

@Component({
  selector: 'app-create-organization',
  templateUrl: 'create.organization.component.html',
  styleUrls: ['create.organization.component.css']
})
export class CreateOrganizationComponent implements OnInit {

  tab = 0;
  private requestAccess: JoinOrganization;

  requestAccessForm: FormGroup;
  organizationId: FormControl;
  organizationDataService: CompleterData;
  doNotDisplayFailureMessage = true;
  private pageSize = 15;

  constructor(private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private organizationService: OrganizationService,
              private router: Router) {
    this.organizationId = new FormControl('', [Validators.required]);
    this.requestAccess = new JoinOrganization();

    this.requestAccessForm = formBuilder.group({
      'organizationId': this.organizationId
    });
  }

  ngOnInit(): void {
    this.populateOrganizationDropDown();
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

  onOrganizationSelect(selected: CompleterItem) {
    if (selected) {
      this.requestAccess.organizationId = selected.originalObject.partyId;
    }
  }

  onJoin() {
    this.doNotDisplayFailureMessage = true;
    this.organizationService.addOrganizationRequest(this.requestAccess)
      .subscribe( value => {
        if (value && value.accessRequestId) {
          this.router.navigate(['/lobby']);
        } else {
          this.doNotDisplayFailureMessage = false;
        }
      }, error => {
        this.doNotDisplayFailureMessage = false;
        console.log(error);
      });
  }

}
