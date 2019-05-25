import { ProductModel } from './../../../models/product,model';
import { Component, Input, OnInit } from '@angular/core';
import { CartUtil } from 'src/app/utils/cart.util';
import { ToastrService } from 'ngx-toastr';

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

  constructor(
    private toastr: ToastrService
  ) {
  }

  addToCart() {
    CartUtil.add(
      this.product._id,
      this.product.title,
      1,
      this.product.price,
      this.product.images[0]
    );

    this.toastr.success(`${this.product.title} adicionado ao carrinho`, 'Produto Adicionado');
  }
}
