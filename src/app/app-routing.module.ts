import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from "./core/guards/auth-guard.service";
import { PageNotFoundComponent } from './core/components/page-not-found/page-not-found.component';

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: './featureModules/auth/auth.module#AuthModule',
    canLoad: [AuthGuardService],
    canActivate: [AuthGuardService]
  },
  {
    path: "home",
    loadChildren: "./featureModules/client/home/home.module#HomeModule",
    canLoad: [AuthGuardService]
  },
  { path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash : true})],
  providers: [AuthGuardService],
  exports: [RouterModule]
})
export class AppRoutingModule { }
