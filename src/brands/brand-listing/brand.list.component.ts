import {Component, OnInit} from '@angular/core';
import {Page} from '../../page/page';
import {Sort} from '../../sort/sort';
import {PageEvent} from '@angular/material';
import {Brands} from '../brands';
import {BrandService} from '../brand.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand.list.component.html',
  styleUrls: ['./brand.list.component.css']
})
export class BrandListComponent implements OnInit {


  brandId: string;
  brands: Brands;
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  brandName: string;

  constructor(private brandService: BrandService,
              private route: ActivatedRoute) {
    const brands = new Brands();
    brands.page = new Page(0, 0, 0);
    brands.sort = new Sort();
    this.brands = brands;
  }


  ngOnInit(): void {
    if (this.route.snapshot && this.route.snapshot.data['brands']) {
      this.brands = this.route.snapshot.data['brands'];
    }
  }

  private getBrands() {
    this.brandService.getBrands(this.defaultPage, this.defaultPageSize, this.defaultSortOrder)
      .subscribe(next => {
        this.brands = next;
      }, error => {
        console.log(error);
      }, () => {
        console.log('complete');
      });
  }


  onOpenModal(brandId: string, brandName: string) {
    this.brandId = brandId;
    this.brandName = brandName;
  }

  onDelete(deleted: boolean) {
    if (deleted) {
      this.brandService
        .deleteBrand(this.brandId)
        .subscribe(value => {
          if (value) {
            this.getBrands();
          }
        }, error => {
          console.log(error);
        }, () => {
          console.log('complete');
        });
    }
  }


  onRequestPage(pageEvent: PageEvent) {
    this.defaultPage = pageEvent.pageIndex + 1;
    this.defaultPageSize = pageEvent.pageSize;
    this.getBrands();
  }
}
