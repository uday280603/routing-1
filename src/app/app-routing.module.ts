import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/component/home/home.component';
import { UsersComponent } from './shared/component/users/users.component';
import { ProductsComponent } from './shared/component/products/products.component';
import { FairsComponent } from './shared/component/fairs/fairs.component';
import { SProductComponent } from './shared/component/products/s-product/s-product.component';
import { ProductFormComponent } from './shared/component/products/product-form/product-form.component';
import { FormComponent } from './shared/component/users/form/form.component';
import { SUserComponent } from './shared/component/users/s-user/s-user.component';
import { AuthComponent } from './shared/component/auth/auth.component';
import { AuthGuard } from './shared/service/auth.guard';

const routs: Routes = [

  {
    path :'',
    component : AuthComponent
  }
  ,
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate :[AuthGuard],
    children: [
      {
        path: 'addUser',
        component: FormComponent,
      },
      {
        path: ':userId',
        component: SUserComponent,
      },

      {
        path: ':userId/edit',
        component: FormComponent,
      },
    ],
  },
  {
    path: 'products',
    component: ProductsComponent,
    canActivateChild :[AuthGuard],
    children: [
      {
        path: 'addProduct',
        component: ProductFormComponent,
      },
      {
        path: ':id',
        component: SProductComponent,
      },
      {
        path: ':id/edit',
        component: ProductFormComponent,
      },
    ],
  },
  {
    path: 'fairs',
    component: FairsComponent,
    canActivate :[AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routs)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
