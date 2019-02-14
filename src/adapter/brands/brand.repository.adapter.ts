import {BrandRepository} from '../../brands/brand.repository';
import {BrandClient} from '../../client/brands/brand.client';
import {Observable} from 'rxjs';
import {Brands} from '../../brands/brands';
import {Brand} from '../../brands/brand';

export class BrandRepositoryAdapter extends  BrandRepository {

  constructor(private brandClient: BrandClient) {
    super();
  }

  getBrands(pageNumber: number, pageSize: number, sortOrder: string): Observable<Brands> {
    return this.brandClient.getBrands(pageNumber, pageSize, sortOrder);
  }

  getBrand(brandId: string): Observable<Brand> {
    return this.brandClient.getBrand(brandId);
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.brandClient.addBrand(brand);
  }

  updateBrand(brand: Brand): Observable<number> {
    return this.brandClient.updateBrand(brand);
  }

  deleteBrand(brandId: string): Observable<number> {
    return this.brandClient.deleteBrand(brandId);
  }

}
