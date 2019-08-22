import {Component, OnInit, Renderer2} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import { authRoutes } from './auth.routes';
import {SessionService} from '../session/session.service';
import {faBox} from '@fortawesome/free-solid-svg-icons/faBox';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  isAuthPath: string;
  sub: any;
  icon = faBox;

  constructor(private router: Router,
              private renderer: Renderer2,
              private sessionService: SessionService
              ) {
  }

  ngOnInit(): void {
  }
}
