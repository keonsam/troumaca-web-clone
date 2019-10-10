import {Component} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AttributeType} from '../attribute.type';
import {ATTRIBUTE_TYPES} from '../attribute.types';
import {
  faChevronDown, faChevronUp, faExclamationTriangle, faSearch,
  faCalendar,
  faCheck,
  faCheckDouble,
  faCheckSquare,
  faFont,
  faHashtag,
  faLink,
  faMapMarkerAlt,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import {Attribute} from '../attribute';
import {AttributeService} from '../attribute.service';
import {Icon} from '@fortawesome/fontawesome-svg-core';
import {attributeFont} from '../attribute.font';

@Component({
  selector: 'app-attribute-create',
  templateUrl: './attribute.create.modal.component.html',
  styleUrls: ['./attribute.create.modal.component.css']
})
export class AttributeCreateModalComponent {
  types: AttributeType[] = ATTRIBUTE_TYPES;
  selected: string;
  label: FormControl;
  preFilled: FormControl;
  required: FormControl;
  preFilledValue: FormControl;
  additionalInfo: FormControl;
  list: FormControl;
  select: FormControl;
  faExclamationTriangle = faExclamationTriangle;
  faChevronDown = faChevronDown;
  faChevronUp = faChevronUp;
  faSearch = faSearch;
  panelActive: boolean;
  attribute: Attribute;
  attributeForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AttributeCreateModalComponent>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private attributeService: AttributeService
  ) {
    this.panelActive = false;
    this.attribute = new Attribute();
    // form
    this.label = new FormControl('', [Validators.required]);
    this.preFilled = new FormControl(false);
    this.required = new FormControl(false);
    this.preFilledValue = new FormControl('');
    this.select = new FormControl('');
    this.additionalInfo = new FormControl('');
    this.list = new FormControl('');
    this.attributeForm = formBuilder.group({
      'label': this.label,
      'list': this.list,
      'preFilled': this.preFilled,
      'required': this.required,
      'preFilledValue': this.preFilledValue,
      'additionalInfo': this.additionalInfo
    });

    this.attributeForm
      .valueChanges
      .subscribe( value => {
        // attribute
        this.attribute.name = value.label;
        this.attribute.list = value.list.split(',');
        this.attribute.preFilled = value.preFilled;
        this.attribute.required = value.required;
        this.attribute.defaultValue = value.preFilledValue;
        this.attribute.description = value.additionalInfo;
      });
  }

  onSelect(type: AttributeType) {
    this.selected = type.name;
    this.attribute.assetCharacteristicTypeId = type.assetCharacteristicTypeId;
  }

  expandPanel() {
    this.panelActive = !this.panelActive;
  }

  getIcon(assetCharacteristicTypeId: string) {
    return attributeFont(assetCharacteristicTypeId);
  }

  onSubmit() {
    this.attributeService
      .saveAttribute(this.attribute)
      .subscribe( value => {
        if (value && value.assetCharacteristicId) {
          this.dialogRef.close(true);
        } else {
          console.log('error');
        }
      }, error => {
        console.log(error);
      })
  }
}
