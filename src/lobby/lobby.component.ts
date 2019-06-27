import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {LobbyService} from './lobby.service';

@Component({
  selector: 'app-lobby-home',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  apps: any[];
  @ViewChild('showModal', { static: false }) showModal: ElementRef;
  @ViewChild('closeButton', { static: false }) closeButton: ElementRef;
  doNotDisplayFailureMessage = true;



  constructor(private lobbyService: LobbyService) {
    this.apps = [];
  }

  ngOnInit(): void {
    this.getApps();
  }

  private getApps() {
    this.lobbyService.getApps()
      .subscribe( apps => {
        if (apps) {
          this.apps = apps;
        }
      });
  }

}

