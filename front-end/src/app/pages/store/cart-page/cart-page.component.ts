import { Component, OnInit } from "@angular/core";
import { ToastrService } from 'ngx-toastr';
import { Cart } from 'src/app/models/cart.model';
import { CartUtil } from 'src/app/utils/cart.util';

@Component({
  selector: "app-cart-page",
  templateUrl: "./cart-page.component.html"
})
export class CartPageComponent implements OnInit {
  public cart: Cart = new Cart();

  constructor(
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadCart();
  }

  get total(): number {
      let total = 0;
      this.cart.items.forEach((item) => {
        total += (item.price * item.quantity);
      });
      return total;
  }

  public hasItems(): boolean {
    return this.cart.items.length > 0;
  }

  public loadCart() {
    this.cart = CartUtil.get();
  }

  public remove(item) {
    const index = this.cart.items.indexOf(item);
    this.cart.items.splice(index, 1);
    CartUtil.update(this.cart);
  }

  public clear() {
    CartUtil.clear();
    this.loadCart();
  }
}
