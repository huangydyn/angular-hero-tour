import { HeroesComponent } from './heroes-component/heroes.component';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component/dashboard.component';
import { HeroDetailComponent } from './hero-detail-component/hero-detail.component';
import { NgModule } from '@angular/core';


export const ROOT_CONFIGS: Routes = [
  {
    path: 'heroes',
    component: HeroesComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'detail/:id',
    component: HeroDetailComponent
  },
];

@NgModule({
  imports: [ RouterModule.forRoot(ROOT_CONFIGS) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
