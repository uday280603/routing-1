import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { UsersComponent } from './shared/component/users/users.component';
import { ProductsComponent } from './shared/component/products/products.component';
import { FairsComponent } from './shared/component/fairs/fairs.component';

const routs: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
  },
  {
    path :'products',
    component : ProductsComponent
  },
  {
    path : 'fairs',
    component : FairsComponent
  }
];

@NgModule({
    imports : [RouterModule.forRoot(routs)],
    exports :[RouterModule]
})
export class AppRoutingModule {}
