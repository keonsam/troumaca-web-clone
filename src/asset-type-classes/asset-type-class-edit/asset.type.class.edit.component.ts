import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
//import {CompleterService} from "ng2-completer";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClass} from "../asset.type.class";
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'asset-type-class-edit',
  templateUrl: './asset.type.class.edit.component.html',
  styleUrls: ['./asset.type.class.edit.component.css']
})
export class AssetTypeClassEditComponent implements OnInit {

  private assetTypeClassId: string;
  private sub: any;
  private _name: FormControl;
  private _description: FormControl;

  private _assetTypeClassEditForm:FormGroup;

  private assetTypeClass: AssetTypeClass;

  private _doNotDisplayFailureMessage:boolean;

  constructor(private assetTypeClassService:AssetTypeClassService,
            //  private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {

     this.name = new FormControl("", Validators.required);
     this.description = new FormControl("");

     this.assetTypeClassEditForm = formBuilder.group({
        "name": this.name,
        "description": this.description
     });

     this.assetTypeClass = new AssetTypeClass();

     this.doNotDisplayFailureMessage = true;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
       this.assetTypeClassId = params['assetTypeClassId'];
       this.assetTypeClassService.getAssetTypeClass(this.assetTypeClassId)
       .subscribe(assetTypeClass =>{
        this.name.setValue(assetTypeClass.name);
        this.description.setValue(assetTypeClass.description);
        this.assetTypeClass = assetTypeClass;
      }, error => {
        console.log(error);
      }, () => {
        this.assetTypeClassEditForm
        .valueChanges
        .subscribe(value => {
          this.assetTypeClass.name = value.name;
          this.assetTypeClass.description = value.description;
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

   get assetTypeClassEditForm(): FormGroup {
     return this._assetTypeClassEditForm;
   }

   set assetTypeClassEditForm(value: FormGroup) {
     this._assetTypeClassEditForm = value;
   }

   get doNotDisplayFailureMessage(): boolean {
     return this._doNotDisplayFailureMessage;
   }

   set doNotDisplayFailureMessage(value: boolean) {
     this._doNotDisplayFailureMessage = value;
   }

   onCreate() {
     this.doNotDisplayFailureMessage = true;
     this.assetTypeClassService
     .updateAssetTypeClass(this.assetTypeClassId, this.assetTypeClass)
     .subscribe(value => {
       if (value) {
         this.router.navigate(['/asset-type-classes']);
       } else {
         this.doNotDisplayFailureMessage = false;
       }
     }, error => {
       console.log(error);
       this.doNotDisplayFailureMessage = false;
     });
   }

   cancel() {
     this.router.navigate(['/asset-type-classes']);
   }
}
