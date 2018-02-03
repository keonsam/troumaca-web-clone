import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService} from "ng2-completer";

@Component({
  selector: 'site-creation',
  templateUrl: './site.creation.component.html',
  styleUrls: ['./site.creation.component.css']
})
export class SiteCreationComponent implements OnInit {

 private _siteForm: FormGroup;

 constructor(private completerService: CompleterService,
             private formBuilder: FormBuilder ){

  this.siteForm = formBuilder.group({

    });
 }

  ngOnInit(): void {

  }

  get siteForm(): FormGroup {
    return this._siteForm;
  }

  set siteForm(value: FormGroup) {
    this._siteForm = value;
  }
  onSubmit() {

  }
  
}
