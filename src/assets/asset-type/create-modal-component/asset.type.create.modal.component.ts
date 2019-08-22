import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { MatDialogRef} from '@angular/material';
import {faChevronDown, faSearch} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'asset-type-create-modal',
  templateUrl: './asset.type.create.modal.component.html',
  styleUrls: ['././asset.type.create.modal.component.css']
})
export class AssetTypeCreateModalComponent {

  search: FormControl;
  // faSearch = faSearch;
  // recentArray: string[];
  // commons: string[];
  faChevronDown = faChevronDown;
  constructor(
    public dialogRef: MatDialogRef<AssetTypeCreateModalComponent>,
    private formBuilder: FormBuilder,
  ) {
    // this.recentArray = ['RAM'];
    // this.commons = ['Building', 'vehicle', 'computer', 'manufacturing',
    //   'communication', 'measurement instrument','other discrete item',
    //   'Material Inventory', 'Lot', 'building'
    // ];
    this.search = new FormControl('');
  }
}
