// import {NgModule} from '@angular/core';
// import {CommonModule} from '@angular/common';
// import {PageNotFoundComponent} from './page.not.found.component';
// import {PageNotFoundService} from './page.not.found.service';
// import {PageNotFoundRepository} from './page.not.found.repository';
// import {RouterModule} from '@angular/router';
//
// @NgModule({
//   imports: [
//     CommonModule,
//     RouterModule,
//   ],
//   declarations: [
//     PageNotFoundComponent
//   ],
//   providers: [{
//     provide: PageNotFoundService,
//     useFactory(pageNotFoundRepository: PageNotFoundRepository) {
//       let pageNotFoundService: PageNotFoundService;
//       if (!pageNotFoundService) {
//         pageNotFoundService = new PageNotFoundService(pageNotFoundRepository);
//       }
//       return pageNotFoundService;
//     },
//     deps: [PageNotFoundRepository]
//   }],
//   exports: [
//     PageNotFoundComponent
//   ]
// })
// export class PageNotFoundModule {}
