import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { ProductService } from 'src/app/shared/service/product.service';
import { SanckbarService } from 'src/app/shared/service/snackbar.service';
import { GetConfirmationComponent } from '../../get-confirmation/get-confirmation.component';

@Component({
  selector: 'app-s-product',
  templateUrl: './s-product.component.html',
  styleUrls: ['./s-product.component.scss'],
})
export class SProductComponent implements OnInit {
  productId!: string;
  productObj!: Iproduct;

  constructor(
    private _routes: ActivatedRoute,
    private _productService: ProductService,
    private _snackbar: SanckbarService,
    private _router: Router,
    private _matDialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.getProducts();
    
  }
  getProducts() {
    this.productId = this._routes.snapshot.params['id'];
    this.productId = this._routes.snapshot.paramMap.get('id')!;
    console.log(this.productId);
    if (this.productId) {
      this._productService.fetchProductById(this.productId).subscribe({
        next: (data) => {
          this.productObj = data;
        },
      });
    }
    // this._routes.params.subscribe((param) => {
    //   this.productId = param['id'];
    //   if (this.productId) {
    //     this._productService.fetchProductById(this.productId).subscribe({
    //       next: (data) => {
    //         this.productObj = data;
    //       },
    //     });
    //   }
    // });
  }

  onRemove() {
    let config = new MatDialogConfig();
    ((config.width = '400px'), (config.disableClose = true));
    config.data = `Are you sure to remove the product with id ${this.productId}..?`;
    let _matDialogRef = this._matDialog.open(GetConfirmationComponent, config);
    _matDialogRef.afterClosed().subscribe((getConfirm) => {
      if (getConfirm === true) {
        this._productService.onRemoveProduct(this.productId).subscribe({
          next: (res) => {
            this._snackbar.openSnackbar(res.msg);
            this._router.navigate(['products']);
          },
        });
      }
    });
  }

  redirectToEdit() {
    //   this._router.navigate(['/products',this.productId,'edit'],
    //     {queryParamsHandling :'preserve'}
    //   )
    this._router.navigate(['edit'], {
      queryParamsHandling: 'preserve',
      relativeTo: this._routes,
    });
  }
}
