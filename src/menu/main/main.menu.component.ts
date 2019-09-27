import {Component, OnInit} from '@angular/core';
import {ASSET, DASHBOARD, MANAGE} from '../../app/routes';
import { faBox } from '@fortawesome/free-solid-svg-icons/faBox';
import {faList} from '@fortawesome/free-solid-svg-icons/faList';
import {faEllipsisH} from '@fortawesome/free-solid-svg-icons/faEllipsisH';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main.menu.component.html',
  styleUrls: ['main.menu.component.css']
})

export class MainMenuComponent {
  link = `/${DASHBOARD}`;
  faBox = faBox;
  faList = faList;
  faEllipsisH = faEllipsisH;
  assetsLink = `/${DASHBOARD}/${ASSET}`;
  manageLink = `/${DASHBOARD}/${MANAGE}`;
}
