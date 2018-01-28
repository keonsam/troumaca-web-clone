import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CompleterService} from "ng2-completer";
import {AssetTypeClassService} from "../asset.type.class.service";
import {AssetTypeClass} from "../asset.type.class";
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'asset-type-class-edit',
  templateUrl: './asset.type.class.edit.component.html',
  styleUrls: ['./asset.type.class.edit.component.css']
})
export class AssetTypeClassEditComponent implements OnInit {

  id: string;
  private sub: any;
  private _name: FormControl;
  private _description: FormControl;
  private _assetTypeClassEditForm:FormGroup;

  constructor(private assetTypeClassService:AssetTypeClassService,
              private completerService: CompleterService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute) {

     this.name = new FormControl("", Validators.required);
     this.description = new FormControl("");


     this.assetTypeClassEditForm = formBuilder.group({
        "name": this.name,
        "description": this.description
                });
  }

  ngOnInit() {
     this.sub = this.route.params.subscribe(params => {
        this.id = params['id'];
        this.assetTypeClassService.getAssetTypeClass(this.id)
        .subscribe(assetTypeClass =>{
        //  this.name = assetTypeClass.name;
        //  this.description = assetTypeClass.description;
        });
     });

   }

   get name(): FormControl {
     return this._name;
   }

   set name(value: FormControl) {
     this._name = value;
   }

   get assetTypeClassEditForm(): FormGroup {
     return this._assetTypeClassEditForm;
   }

   set assetTypeClassEditForm(value: FormGroup) {
     this._assetTypeClassEditForm = value;
   }

   get description(): FormControl {
     return this._description;
   }

   set description(value: FormControl) {
     this._description = value;
   }

   enableSubmit():boolean {
     if (!this.name) {
       return false;
     } else {
       return true;
     }
   }

   onCreate() {
   }

   onReset() {
   }

   onSubmit() {
     if (this.name) {
      let assetTypeClasses: AssetTypeClass = new AssetTypeClass("",this.name.value,this.description.value); // validate
      this.assetTypeClassService.addAssetTypeClass(assetTypeClasses)
       .subscribe(value => {
         console.log(value);
       }, error => {
         console.log(error);
       });
     }
   }
}
