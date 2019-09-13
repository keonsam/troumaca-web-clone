import {Component} from '@angular/core';
import {faBox} from '@fortawesome/free-solid-svg-icons/faBox';
import {FormControl} from '@angular/forms';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faCheck} from '@fortawesome/free-solid-svg-icons/faCheck';
import {faEdit, faEllipsisV, faFilter, faList, faSortAmountDown, faTh, faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {Assets} from './assets';
import {DialogPosition, MatDialog} from '@angular/material';
import {AssetCreateModal} from './asset-create-modal/asset.create.modal';
import {Asset} from './asset';

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
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faEllipsisV = faEllipsisV;
  faTh = faTh;
  search: FormControl;
  assets: Assets;
  listType= 'list';
  constructor(public dialog: MatDialog) {
    this.assets = new Assets();
    this.search = new FormControl();
    // this.assets.assets = [
    //   new Asset('Macbook Pro 13 inch'),
    //   new Asset('Magic  Mouse'),
    //   new Asset( 'Printer Laser Jet'),
    //   new Asset('Macbook Pro 13 inch'),
    //   new Asset( 'Magic  Mouse'),
    //   new Asset( 'Printer Laser Jet'),
    //   // list
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset('Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset( 'Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset('Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset( 'Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset('Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset( 'Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset('Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    //   // new Asset('Macbook Pro 13 inch'),
    //   // new Asset( 'Magic  Mouse'),
    //   // new Asset( 'Printer Laser Jet'),
    // ]
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

  switchList(type: string) {
    this.listType = type;
  }
}
