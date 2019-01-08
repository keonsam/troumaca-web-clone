import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { App } from './app';
import {LobbyService} from './lobby.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lobby-home',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})

export class LobbyComponent implements OnInit {

  apps: App[];
  @ViewChild('showModal') showModal: ElementRef;
  @ViewChild('closeButton') closeButton: ElementRef;
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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.apps, event.previousIndex, event.currentIndex);
  }

}

