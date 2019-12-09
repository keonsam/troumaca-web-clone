import {Component, OnInit} from '@angular/core';
import {DialogPosition, MatDialog, MatDialogRef} from '@angular/material';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {AttributeCreateModalComponent} from '../attributes-create-modal-component/attribute.create.modal.component';
import {attributeFont} from '../attribute.font';
import {AttributeService} from '../attribute.service';
import {Attribute} from '../attribute';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {MatTabChangeEvent} from '@angular/material/tabs';
import {User} from '../../../authentication/user';
import {Site} from '../site';

@Component({
  selector: 'app-attribute-select',
  templateUrl: './attribute.select.modal.component.html',
  styleUrls: ['./attribute.select.modal.component.css']
})
export class AttributeSelectModalComponent implements OnInit {
  private _search: FormControl;
  private _attributes: Attribute[];
  private _selected: string[] = [];
  private _selectForm: FormGroup;
  private _tab: string;
  private _searchStr: string;
  private _charBox: boolean;
  private _selectedId: string;
  offsetLeft: number;
  offsetTop: number;
  private _items: FormArray;
  people: User[];
  sites: Site[];

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
      items: formBuilder.array([ ])
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
      format: attribute.format,
      type: attribute.type,
      required: false,
      preFilled: false,
      description: '',
      preFilledValue: new FormControl({value: '', disabled: true}),
      partyId: '',
      list: [attribute.list]
    });
  }

  addItem(attribute: Attribute): void {
    this._items = this._selectForm.get('items') as FormArray;
    this._items.push(this.createItem(attribute));
  }

  trackByFn(index: number, item: Attribute) {
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
    this.dialogRef.close();
  }

  tabChange(event: MatTabChangeEvent) {
    this._tab = event.tab.textLabel;
    this.getAttributes(this._tab, this._searchStr, this._selected);
  }

  // char-box

  charBoxOverlay() {
    this._selectedId = '';
    this._charBox = false;
  }

  charBox(assetCharacteristicId: string) {
    return this._charBox && this._selectedId === assetCharacteristicId;
  }

  editChar(event: MouseEvent, assetCharacteristicId: string) {
    this._selectedId = assetCharacteristicId;
    this.offsetLeft = event.pageX;
    this.offsetTop = event.pageY + 21;
    this._charBox = true;
  }

  private findPeople(searchStr: string) {
    this.attributeService.findPeople(searchStr)
      .subscribe( val => {
        if (val && val.persons) {
          this.people = val.persons;
        }else {
          console.error('failed');
        }
      }, error => {
        console.error(error);
      });
  }

  private findSites(searchStr: string) {
    this.attributeService.findSites(searchStr)
      .subscribe( val => {
        console.log()
        if (val && val.sites) {
          this.sites = val.sites;
        }else {
          console.error('failed');
        }
      }, error => {
        console.error(error);
      });
  }

  preFilledChange(event: any, control: FormControl, id: string) {
    if (id === '3') {
      control.setValue(event.currentTarget.checked);
    }else {
      if(event.currentTarget.checked) {
        control.enable();
      }else {
        control.setValue('');
        control.disable();
      }
      if (id === '7') {
        control.valueChanges
          .pipe(
            debounceTime(1000),
            distinctUntilChanged()
          )
          .subscribe( val => {
          this.findPeople(val);
        });
      }
      if (id === '9') {
        control.valueChanges
          .pipe(
            debounceTime(1000),
            distinctUntilChanged()
          )
          .subscribe( val => {
            this.findSites(val);
          });
      }
    }
  }

  setPersonValue(preFilled: FormControl, id: FormControl, person: User) {
    preFilled.setValue(person.firstName);
    id.setValue(person.partyId);
  }

  setSiteValue(preFilled: FormControl, id: FormControl, site: Site) {
    preFilled.setValue(site.name);
    id.setValue(site.siteId);
  }

  onSelect() {
    console.log(this._selectForm.get('items').value);
    this.dialogRef.close(this._selectForm.get('items').value);
  }
}
