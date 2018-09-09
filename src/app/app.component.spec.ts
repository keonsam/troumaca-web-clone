import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import {MobileMenuComponent} from '../menu/mobile/mobile.menu.component';
import {SideMenuComponent } from '../menu/side/side.menu.component';
import { eventServiceProvider } from '../event/event.service.provider';
import { sessionServiceProvider } from '../session/session.service.provider';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        MobileMenuComponent,
        SideMenuComponent
      ],
      providers: [eventServiceProvider, sessionServiceProvider]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});

