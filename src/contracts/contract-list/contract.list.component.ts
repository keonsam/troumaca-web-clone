import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ContractService} from "../contract.service";

@Component({
  selector: 'contract-list',
  templateUrl:'./contract.list.component.html',
  styleUrls: ['./contract.list.component.css']
})
export class ContractListComponent implements OnInit {

  constructor(private contractService: ContractService,
              private router:Router) {
  }

  ngOnInit(): void {
  }

}