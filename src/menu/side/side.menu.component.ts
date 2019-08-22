import {Component, OnInit} from '@angular/core';
import {ASSET, LOBBY, MANAGE} from '../../app/routes';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons/faEllipsisH';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side.menu.component.html',
  styleUrls: ['side.menu.component.css']
})

export class SideMenuComponent {
  link = `/${LOBBY}`;
  faBox = faBox;
  faList = faList;
  faEllipsisH = faEllipsisH;
  assetsLink = `/${LOBBY}/${ASSET}`;
  manageLink = `/${LOBBY}/${MANAGE}`;
}
