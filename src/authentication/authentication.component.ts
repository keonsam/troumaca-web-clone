import {Component} from '@angular/core';
import {HOME} from '../app/routes';

@Component({
  selector: 'authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent {
  homeLink = `/${HOME}`;
}
