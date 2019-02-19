import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {AuthGuard} from '../auth-guard/auth.guard';
import {AssetSettingComponent} from './asset.setting.component';
import {ASSET_IDENTIFIER_TYPE, ASSET_NAME_TYPE, ASSET_ROLE_TYPE, ASSET_SETTING, BRANDS, UNIT_OF_MEASURE} from '../app/routes';
import {BrandListComponent} from '../brands/brand-listing/brand.list.component';
import {BrandsResolve} from '../brands/brands.resolve';
import {BrandFormComponent} from '../brands/brand-form/brand.form.component';
import {BrandResolve} from '../brands/brand.resolve';
import {AssetIdentifierTypeListComponent} from '../asset-identifier-types/asset-identifier-type-listing/asset.identifier.type.list.component';
import {AssetIdentifierTypesResolve} from '../asset-identifier-types/asset.identifier.types.resolve';
import {AssetIdentifierTypeFormComponent} from '../asset-identifier-types/asset-identifier-type-form/asset.identifier.type.form.component';
import {AssetIdentifierTypeResolve} from '../asset-identifier-types/asset.identifier.type.resolve';
import {AssetNameTypeListComponent} from '../asset-name-types/asset-name-type-listing/asset.name.type.list.component';
import {AssetNameTypesResolve} from '../asset-name-types/asset.name.types.resolve';
import {AssetNameTypeFormComponent} from '../asset-name-types/asset-name-type-form/asset.name.type.form.component';
import {AssetNameTypeResolve} from '../asset-name-types/asset.name.type.resolve';
import {AssetRoleTypeListComponent} from '../asset-role-types/asset-role-type-listing/asset.role.type.list.component';
import {AssetRoleTypesResolve} from '../asset-role-types/asset.role.types.resolve';
import {AssetRoleTypeFormComponent} from '../asset-role-types/asset-role-type-form/asset.role.type.form.component';
import {AssetRoleTypeResolve} from '../asset-role-types/asset.role.type.resolve';
import {UnitOfMeasureListComponent} from '../unit-of-measure/unit-of-measure-listing/unit.of.measure.list.component';
import {UnitOfMeasuresResolve} from '../unit-of-measure/unit.of.measures.resolve';
import {UnitOfMeasureFormComponent} from '../unit-of-measure/unit-of-measure-form/unit.of.measure.form.component';
import {UnitOfMeasureResolve} from '../unit-of-measure/unit.of.measure.resolve';

export const routes: Routes = [
  {
    path: '', component: AssetSettingComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard], children: [
      {path: '', redirectTo: `${BRANDS}/listing`, pathMatch: 'full'},
      {path: BRANDS, redirectTo: `${BRANDS}/listing`, pathMatch: 'full'},
      {path: ASSET_IDENTIFIER_TYPE, redirectTo: `${ASSET_IDENTIFIER_TYPE}/listing`, pathMatch: 'full'},
      {path: ASSET_NAME_TYPE, redirectTo: `${ASSET_NAME_TYPE}/listing`, pathMatch: 'full'},
      {path: ASSET_ROLE_TYPE, redirectTo: `${ASSET_ROLE_TYPE}/listing`, pathMatch: 'full'},
      {path: UNIT_OF_MEASURE, redirectTo: `${UNIT_OF_MEASURE}/listing`, pathMatch: 'full'},
      {path: `${BRANDS}/listing`, component: BrandListComponent, resolve: {brands: BrandsResolve}},
      {path: `${BRANDS}/create`, component: BrandFormComponent},
      {path: `${BRANDS}/:brandId/edit`, component: BrandFormComponent, resolve: {brand: BrandResolve}},
      {
        path: `${ASSET_IDENTIFIER_TYPE}/listing`,
        component: AssetIdentifierTypeListComponent, resolve: {assetIdentifierTypes: AssetIdentifierTypesResolve}
      },
      {path: `${ASSET_IDENTIFIER_TYPE}/create`, component: AssetIdentifierTypeFormComponent},
      {
        path: `${ASSET_IDENTIFIER_TYPE}/:assetIdentifierTypeId/edit`,
        component: AssetIdentifierTypeFormComponent, resolve: {assetIdentifierType: AssetIdentifierTypeResolve}
      },
      {
        path: `${ASSET_NAME_TYPE}/listing`,
        component: AssetNameTypeListComponent, resolve: {assetNameTypes: AssetNameTypesResolve}
      },
      {path: `${ASSET_NAME_TYPE}/create`, component: AssetNameTypeFormComponent},
      {
        path: `${ASSET_NAME_TYPE}/:assetNameTypeId/edit`,
        component: AssetNameTypeFormComponent, resolve: {assetNameType: AssetNameTypeResolve}
      },
      {
        path: `${ASSET_ROLE_TYPE}/listing`,
        component: AssetRoleTypeListComponent, resolve: {assetRoleTypes: AssetRoleTypesResolve}
      },
      {path: `${ASSET_ROLE_TYPE}/create`, component: AssetRoleTypeFormComponent},
      {
        path: `${ASSET_ROLE_TYPE}/:assetRoleTypeId/edit`,
        component: AssetRoleTypeFormComponent, resolve: {assetRoleType: AssetRoleTypeResolve}
      },
      {
        path: `${UNIT_OF_MEASURE}/listing`,
        component: UnitOfMeasureListComponent, resolve: {unitOfMeasures: UnitOfMeasuresResolve}
      },
      {path: `${UNIT_OF_MEASURE}/create`, component: UnitOfMeasureFormComponent},
      {
        path: `${UNIT_OF_MEASURE}/:unitOfMeasureId/edit`,
        component: UnitOfMeasureFormComponent, resolve: {unitOfMeasure: UnitOfMeasureResolve}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AssetSettingRoutingModule { }
