import { ProductModel } from './../../../models/product,model';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html'
})
export class ProductCartComponent {
  @Input()
  product: ProductModel;

  get currentImage(): string {
    return this.product.images[0];
  }
}
