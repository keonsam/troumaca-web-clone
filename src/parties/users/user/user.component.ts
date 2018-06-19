import {Component, OnInit} from '@angular/core';
import {PartyEventService} from '../../party.event.service';

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private partyEventService: PartyEventService) {
  }

  ngOnInit(): void {

  }

}
