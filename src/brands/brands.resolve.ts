import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {BrandService} from './brand.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {Brands} from './brands';

export function brandsResolveProviderFactory (brandService: BrandService): BrandsResolve {
  return new BrandsResolve(brandService);
}
@Injectable({
  providedIn: 'root',
  useFactory: brandsResolveProviderFactory,
  deps: [BrandService]
})
export class BrandsResolve implements Resolve<Brands> {
  private defaultPage = 1;
  private defaultPageSize = 10;
  private defaultSortOrder = 'asc';
  constructor(private brandsService: BrandService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Brands> {
    return this.brandsService.getBrands(this.defaultPage, this.defaultPageSize, this.defaultSortOrder);
  }
}
