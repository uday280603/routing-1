// import { NgModule } from '@angular/core';
// import { BrowserModule } from '@angular/platform-browser';
// import {MatDialogModule} from '@angular/material/dialog';
// import {MatSnackBarModule} from '@angular/material/snack-bar';
// import { AppComponent } from './app.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HomeComponent } from './shared/component/home/home.component';
// import { UsersComponent } from './shared/component/users/users.component';
// import { FairsComponent } from './shared/component/fairs/fairs.component';
// import { ProductsComponent } from './shared/component/products/products.component';
// import { AppRoutingModule } from './app-routing.module';
// import { SProductComponent } from './shared/component/products/s-product/s-product.component';
// import { ProductFormComponent } from './shared/component/products/product-form/product-form.component';
// import { ReactiveFormsModule } from '@angular/forms';
// import {MatButtonModule} from '@angular/material/button';
// import { GetConfirmationComponent } from './shared/component/get-confirmation/get-confirmation.component';
// import { FormComponent } from './shared/component/users/form/form.component';
// import { SUserComponent } from './shared/component/users/s-user/s-user.component';


// @NgModule({
//   declarations: [
//     AppComponent,
//     HomeComponent,
//     UsersComponent,
//     FairsComponent,
//     ProductsComponent,
//     SProductComponent,
//     ProductFormComponent,
//     GetConfirmationComponent,
//     FormComponent,
//     SUserComponent,
//   ],
//   imports: [
//     BrowserModule,
//     BrowserAnimationsModule,
//     AppRoutingModule,
//     ReactiveFormsModule,
//     MatSnackBarModule,
//     MatDialogModule,
//     MatButtonModule
//   ],
//   providers: [],
//   bootstrap: [AppComponent]
// })
// export class AppModule { }

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Angular Material Modules
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';

// Components
import { HomeComponent } from './shared/component/home/home.component';
import { UsersComponent } from './shared/component/users/users.component';
import { FairsComponent } from './shared/component/fairs/fairs.component';
import { ProductsComponent } from './shared/component/products/products.component';
import { SProductComponent } from './shared/component/products/s-product/s-product.component';
import { ProductFormComponent } from './shared/component/products/product-form/product-form.component';
import { GetConfirmationComponent } from './shared/component/get-confirmation/get-confirmation.component';
import { FormComponent } from './shared/component/users/form/form.component';
import { SUserComponent } from './shared/component/users/s-user/s-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UsersComponent,
    FairsComponent,
    ProductsComponent,
    SProductComponent,
    ProductFormComponent,
    GetConfirmationComponent,
    FormComponent,
    SUserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,

    // Material
    MatButtonModule,
    MatDialogModule,
    MatSnackBarModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
