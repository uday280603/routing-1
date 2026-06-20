import { Injectable } from '@angular/core';
import { Iproduct } from '../model/Iproduct';
import { Observable, of } from 'rxjs';
import { Ires } from '../model/Ires';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  productsArr: Iproduct[] = [
    { pname: 'Laptop', pid: '1001', pstatus: 'Delivered', canReturn: 1 },
    { pname: 'Headphones', pid: '1002', pstatus: 'Shipped', canReturn: 0 },
    { pname: 'Keyboard', pid: '1003', pstatus: 'Pending', canReturn: 1 },
  ];

  constructor() {}

  fetchAll(): Observable<Iproduct[]> {
    return of(this.productsArr);
  }

  fetchProductById(id: string): Observable<Iproduct> {
    let PRODUCT_OBJ = this.productsArr.find((p) => p.pid === id)!;
    return of(PRODUCT_OBJ);
  }

  createProduct(productObj : Iproduct) : Observable<Ires<Iproduct>>{
    this.productsArr.unshift(productObj)
    return of({
      msg : `New product with id ${productObj.pid} is added successfully....!`,
      data : productObj
    })
    
  }

  onUpdateProduct(productObj : Iproduct) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArr.findIndex(p => p.pid === productObj.pid);
    this.productsArr[GETINDEX] = productObj;
    return of({
      msg : `Product with id ${productObj.pid} is updated successfully...!`,
      data : productObj
    })
  }

  onRemoveProduct(id : string) : Observable<Ires<Iproduct>>{
    let GETINDEX = this.productsArr.findIndex(p => p.pid === id);
    let arr  = this.productsArr.splice(GETINDEX,1);
    return of({
      msg : `The product with id ${id} is removed successfully..!`,
      data : arr[0]
    })
  }


  
}
