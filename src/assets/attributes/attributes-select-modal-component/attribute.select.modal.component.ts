import {Component, ElementRef, EventEmitter, OnInit} from '@angular/core';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {Form, FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {faSearch} from '@fortawesome/free-solid-svg-icons';
import {AttributeCreateModalComponent} from '../attributes-create-modal-component/attribute.create.modal.component';
import {attributeFont} from '../attribute.font';
import {AttributeService} from '../attribute.service';
import {Attribute} from '../attribute';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {SelectedAttribute} from '../selected.attribute';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-attribute-select',
  templateUrl: './attribute.select.modal.component.html',
  styleUrls: ['./attribute.select.modal.component.css']
})
export class AttributeSelectModalComponent implements OnInit {
  private _search: FormControl;
  private _attributes: Attribute[];
  private _selected: string[] = [];
  private _selectedAttribute: SelectedAttribute[] = [];
  private _selectForm: FormGroup;
  private _tab: string;
  private _searchStr: string;
  private _charBox: boolean;
  private _selectedId: string;
  offsetLeft: number;
  offsetTop: number;
  private _items: FormArray;

  constructor(
    public dialogRef: MatDialogRef<AttributeSelectModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService,
  ) {
    this._tab = 'All';
    this._searchStr = '';
    this._search = new FormControl('');
    this._selectForm = formBuilder.group({
      items: this.formBuilder.array([ ])
    })
  }

  ngOnInit(): void {
    this.getAttributes(this._tab);
    this.subscribeToSearch();
  }

  private getAttributes(tab?: string, search?: string, selected?: string[]) {
    this.attributeService.getAttributes(tab, search, selected)
      .subscribe( val => {
        if (val && val.assetCharacteristics) {
          this._attributes = val.assetCharacteristics;
        }else {
          console.error('failed');
        }
      }, error => {
        console.error(error);
      });
  }

  private subscribeToSearch() {
    this._search
      .valueChanges
      .pipe(
        debounceTime(1000),
        distinctUntilChanged()
      )
      .subscribe( val => {
        this._searchStr = val;
        this.getAttributes(this._tab, this._searchStr, this._selected);
      });
  }

  get search(): FormControl {
    return this._search;
  }

  get attributes(): Attribute[] {
    return this._attributes;
  }

  get selectForm(): FormGroup {
    return this._selectForm;
  }

  createItem(attribute: Attribute) {
    return this.formBuilder.group({
      assetCharacteristicId: attribute.assetCharacteristicId,
      assetCharacteristicTypeId: attribute.assetCharacteristicTypeId,
      name: attribute.name,
      required: false,
      preFilled: false,
      description: '',
    });
  }

  addItem(attribute: Attribute): void {
    this._items = this._selectForm.get('items') as FormArray;
    this._items.push(this.createItem(attribute));
  }

  trackByFn(index: number, item: Attribute | SelectedAttribute) {
    return item.assetCharacteristicId;
  }

  removeSelectedAttr(assetCharacteristicId: string, i: number) {
    this._selected = this._selected.filter(x => x !== assetCharacteristicId);
    this._items.removeAt(i);
    this.getAttributes(this._tab, this._searchStr, this._selected);
  }

  attributeSelect(attribute: Attribute) {
    this._selected.push(attribute.assetCharacteristicId);
    this.addItem(attribute);
    this.getAttributes(this._tab, this._searchStr, this._selected);
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
        this.getAttributes(this._tab, this._searchStr, this._selected);
      }
    });
  }

  getIcon(assetCharacteristicTypeId: string) {
    return attributeFont(assetCharacteristicTypeId);
  }

  closeModal() {
    this.dialogRef.close(this._selectedAttribute);
  }

  tabChange(event: MatTabChangeEvent) {
    this._tab = event.tab.textLabel;
    this.getAttributes(this._tab, this._searchStr, this._selected);
  }

  // char-box
  charBox(assetCharacteristicId: string) {
    return this._charBox && this._selectedId === assetCharacteristicId;
  }

  editChar(event: MouseEvent, assetCharacteristicId: string) {
    this._charBox = false;
    if (!this._selectedId) {
      this._selectedId = assetCharacteristicId;
      this.offsetLeft = event.pageX;
      this.offsetTop = event.pageY + 21;
      this._charBox = true;
    } else if (this._selectedId !== assetCharacteristicId) {
      this._selectedId = assetCharacteristicId;
      this.offsetLeft = event.pageX;
      this.offsetTop = event.pageY + 21;
      this._charBox = true
      // setTimeout( () => {
      //   this._charBox = true
      // }, 300);
    } else {
      this._selectedId = '';
    }
  }

  onSelect() {
    this.dialogRef.close();
  }
}
