import {Component, OnInit} from '@angular/core';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {faMapMarkerAlt, faSearch} from '@fortawesome/free-solid-svg-icons';
import {AttributeCreateModalComponent} from '../attributes-create-modal-component/attribute.create.modal.component';
import {attributeFont} from '../attribute.font';
import {AttributeService} from '../attribute.service';
import {Attribute} from '../attribute';
import {Attributes} from '../attributes';
import {debounceTime, distinctUntilChanged, filter} from 'rxjs/operators';

@Component({
  selector: 'app-attribute-select',
  templateUrl: './attribute.select.modal.component.html',
  styleUrls: ['./attribute.select.modal.component.css']
})
export class AttributeSelectModalComponent implements OnInit {
  search: FormControl;
  faSearch = faSearch;
  recentArray: string[];
  commons: string[];
  attributes: Attribute[];
  selected: string[] = [];
  selectedAttribute: Attribute[] = [];
  constructor(
    public dialogRef: MatDialogRef<AttributeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    this.search = new FormControl('');
  }

  ngOnInit(): void {
    this.getAttributes();
    this.subscribeToSearch();
  }

  private getAttributes(search?: string) {
    this.attributeService.getAttributes(search, this.selected)
      .subscribe( val => {
        if (val && val.assetCharacteristics) {
          this.attributes = val.assetCharacteristics;
        }else {
          console.log('failed');
        }
      }, error => {
        console.log(error);
      });
  }

  private subscribeToSearch() {
    this.search
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe( val => {
        this.getAttributes(val);
      });
  }

  attributeSelect(attribute: Attribute) {
    this.selected.push(attribute.assetCharacteristicId);
    this.selectedAttribute.push(attribute);
    this.attributes = this.attributes.filter( val => val.assetCharacteristicId !== attribute.assetCharacteristicId);
  }

  openCreateNew() {
    const dialogPosition: DialogPosition = {
      bottom: '0',
      left: '418px'
    };
    const dialogRef = this.dialog.open(AttributeCreateModalComponent, {
      height: 'calc(100% - 48px)',
      width: '706px',
      position: dialogPosition,
      hasBackdrop: true,
      backdropClass: 'backdrop-left',
      closeOnNavigation: true,
      disableClose: false,
      panelClass: ['left-panel-2', 'left-panel-3'],
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAttributes();
      }
    });
  }

  getIcon(assetCharacteristicTypeId: string) {
    return attributeFont(assetCharacteristicTypeId);
  }

  closeModal() {
    this.dialogRef.close(this.selectedAttribute);
  }
}
