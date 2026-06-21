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

const routs: Routes = [
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch :'full'
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
    path :'products/addProduct',
    component : ProductFormComponent

  },
  {
    path : 'products/:id',
    component : SProductComponent
  }
  ,
  {
    path : 'products/:id/edit',
    component : ProductFormComponent
  }
  ,
    
  {
    path : 'users/addUser',
    component : FormComponent
  }
  ,
  {
    path : 'users/:userId',
    component : SUserComponent
  }
   ,
    
  {
    path : 'users/:userId/edit',
    component : FormComponent
  }
 
  ,
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
