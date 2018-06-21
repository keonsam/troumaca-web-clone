import {Component, OnInit} from '@angular/core';
import {GoodsService} from './goods.service';

@Component({
  selector: 'goods',
  templateUrl: './goods.component.html',
  styleUrls: ['./goods.component.css']
})
export class GoodsComponent implements OnInit {

  constructor(private goodsService: GoodsService) {
  }

  ngOnInit(): void {
  }

}
