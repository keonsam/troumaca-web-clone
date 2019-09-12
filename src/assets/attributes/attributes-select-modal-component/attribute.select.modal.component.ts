import {Component, OnInit} from '@angular/core';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl} from '@angular/forms';
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import {AttributeCreateModalComponent} from '../attributes-create-modal-component/attribute.create.modal.component';
import {attributeFont} from '../attribute.font';
import {AttributeService} from '../attribute.service';
import {Attribute} from '../attribute';
import {Attributes} from '../attributes';

@Component({
  selector: 'app-attribute-select',
  templateUrl: './attribute.select.modal.component.html',
  styleUrls: ['./attribute.select.modal.component.css']
})
export class AttributeSelectModalComponent implements OnInit {
  search: FormControl;
  faSearch = faSearch;
  faMapMarker = faMapMarkerAlt;
  recentArray: string[];
  commons: string[];
  attributes: Attribute[];
  constructor(
    public dialogRef: MatDialogRef<AttributeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    // this.recentArray = ['Color'];
    // this.commons = ['Purchase Date', 'Storage Location'];
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.getAttributes();
  }

  getAttributes() {
    this.attributeService.getAttributes()
      .subscribe( val => {
        if (val && val.assetCharacteristics) {
          this.attributes = val.assetCharacteristics;
        }else {
          console.log('failed');
        }
      }, error => {
        console.log(error);
      })
  }

  openCreateNew() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AttributeCreateModalComponent,  {
      height: 'calc(100% - 138px)',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2'],
    })
  }

  getIcon(assetCharacteristicTypeId: string) {
    return attributeFont(assetCharacteristicTypeId);
  }
}
