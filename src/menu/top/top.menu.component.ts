import {Component, Input} from '@angular/core';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons/faEllipsisH';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';

@Component({
  selector: 'app-top-menu',
  templateUrl: 'top.menu.component.html',
  styleUrls: ['top.menu.component.css']
})
export class TopMenuComponent {
  @Input() name: string;
  faBox= faBox;
  faList = faList;
  faEllipsisH = faEllipsisH;
}
