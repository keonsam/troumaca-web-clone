import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import {Brand} from './brand';
import {BrandService} from './brand.service';
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';

export function brandResolveProviderFactory (brandService: BrandService): BrandResolve {
  return new BrandResolve(brandService);
}
@Injectable({
  providedIn: 'root',
  useFactory: brandResolveProviderFactory,
  deps: [BrandService]
})
export class BrandResolve implements Resolve<Brand> {
  constructor(private brandService: BrandService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Brand> {
    return this.brandService.getBrand(route.paramMap.get('brandId'));
  }
}
