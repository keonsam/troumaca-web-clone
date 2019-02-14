import {Brand} from './brand';
import {Observable} from 'rxjs';
import {Brands} from './brands';
import {BrandRepository} from './brand.repository';

export class BrandService {

  constructor(private brandRepository: BrandRepository) {}

  getBrands(pageNumber: number, pageSize: number, sortOrder: string): Observable<Brands> {
    return this.brandRepository.getBrands(pageNumber, pageSize, sortOrder);
  }

  getBrand(brandId: string): Observable<Brand> {
    return this.brandRepository.getBrand(brandId);
  }

  addBrand(brand: Brand): Observable<Brand> {
    return this.brandRepository.addBrand(brand);
  }

  updateBrand(brand: Brand): Observable<number> {
    return this.brandRepository.updateBrand(brand);
  }

  deleteBrand(brandId: string): Observable<number> {
    return this.brandRepository.deleteBrand(brandId);
  }

}
