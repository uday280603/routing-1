import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Iproduct } from 'src/app/shared/model/Iproduct';
import { ProductService } from 'src/app/shared/service/product.service';
import { SanckbarService } from 'src/app/shared/service/snackbar.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productsForm!: FormGroup;
  isInEditMode: boolean = false;
  productId!: string;
  productObj!: Iproduct;
  disableSubmitBtn : boolean = false

  constructor(
    private _productService: ProductService,
    private _snackbar: SanckbarService,
    private _router: Router,
    private _routes: ActivatedRoute,
  ) {}
  ngOnInit(): void {
    this.onPatchDataInForm();
    this._routes.queryParams.subscribe((res) => {
      console.log(res);
      if (res['cr'] == 0) {
        this.productsForm.disable();
        this.disableSubmitBtn= true
      } else {
        this.productsForm.enable();
        this.disableSubmitBtn= false
      }
    });
  }

  onPatchDataInForm() {
    this.createProductForm();
    this.productId = this._routes.snapshot.paramMap.get('id')!;
    if (this.productId) {
      this.isInEditMode = true;
      this._productService.fetchProductById(this.productId).subscribe({
        next: (data) => {
          this.productsForm.patchValue(data);
        },
      });
    }
  }
  createProductForm() {
    this.productsForm = new FormGroup({
      pname: new FormControl(null, [Validators.required]),
      pstatus: new FormControl('Pending'),
      canReturn: new FormControl(0),
    });
  }

  get getControls() {
    return this.productsForm.controls;
  }

  onAddProduct() {
    if (this.productsForm.invalid) {
      this.productsForm.markAllAsTouched();
      return;
    } else {
      let NEW_OBJ: Iproduct = {
        ...this.productsForm.value,
        pid: Date.now.toString(),
      };

      this._productService.createProduct(NEW_OBJ).subscribe({
        next: (res) => {
          this._snackbar.openSnackbar(res.msg);
          this.productsForm.reset();
          this._router.navigate(['products']);
        },
        error: (err) => {
          this._snackbar.openSnackbar(err);
        },
      });
    }
  }

  onUpdateProduct() {
    if (this.productsForm.invalid) {
      this.productsForm.markAllAsTouched();
      return;
    } else {
      let UPDATED_OBJ: Iproduct = {
        ...this.productsForm.value,
        pid: this.productId,
      };

      this._productService.onUpdateProduct(UPDATED_OBJ).subscribe({
        next: (res) => {
          this._snackbar.openSnackbar(res.msg);
          this.productsForm.reset();
          this.isInEditMode = false;
          this._router.navigate(['products']);
        },
        error: (err) => {
          this._snackbar.openSnackbar(err);
        },
      });
    }
  }
}
