import {Component} from '@angular/core';
import {faBox} from '@fortawesome/free-solid-svg-icons/faBox';
import {FormControl} from '@angular/forms';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faFilter, faList, faSortAmountDown} from '@fortawesome/free-solid-svg-icons';
import {Assets} from './assets';
import {DialogPosition, MatDialog} from '@angular/material';
import {AssetCreateModal} from './asset-create-modal/asset.create.modal';

@Component({
  selector: 'assets',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent {
  faBox = faBox;
  faSearch = faSearch;
  faCheck = faCheck;
  faFilter = faFilter;
  faSortAmountDown = faSortAmountDown;
  faList = faList;
  search: FormControl;
  assets: Assets;
  constructor(public dialog: MatDialog) {
    this.assets = new Assets();
    this.search = new FormControl();
  }


  openAssetCreate() {
    const dialogPosition: DialogPosition = {
      top: '0',
      left: '0'
    };
    const dialogRef = this.dialog.open(AssetCreateModal,  {
      height: '100%',
      width: '423px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel'],
    })
  }
}
