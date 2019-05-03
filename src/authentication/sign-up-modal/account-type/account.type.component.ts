import {Component} from '@angular/core';

@Component({
  selector: 'app-account-type',
  templateUrl: './account.type.component.html',
  styleUrls: ['./account.type.component.css']
})
export class AccountTypeComponent {

  selectedType: string;
  constructor() {}

  onSelect(type: string) {
    this.selectedType = type;
  }
}
