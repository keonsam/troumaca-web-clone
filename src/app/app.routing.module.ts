import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
// import {PageNotFoundComponent} from './page-not-found/page.not.found.component';
import { AuthGuard } from '../auth-guard/auth.guard';
import {
  AUTHENTICATION,
  DASHBOARD,
} from './routes';

const appRoutes: Routes = [
  { path: '', redirectTo: AUTHENTICATION, pathMatch: 'full'},
  { path: AUTHENTICATION,
    loadChildren: () => import('../authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [AuthGuard]
  },
  { path: DASHBOARD, loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
