import { CartItem } from "../models/cart-item.model";
import { Cart } from "../models/cart.model";

const PETSHOP_CART = "petshop.cart";

export class CartUtil {
  public static get(): Cart {
    const data = localStorage.getItem(PETSHOP_CART);

    if (!data) {
      return new Cart();
    }

    return JSON.parse(data);
  }

  public static add(id: string, product: string, quantity: number, price: number, images: string[]) {
    const cart = this.get();
    const item = new CartItem(id, product, quantity, price, images);
    cart.items.push(item);
    localStorage.setItem(PETSHOP_CART, JSON.stringify(cart));
  }

  public static update(cart: Cart) {
    localStorage.setItem(PETSHOP_CART, JSON.stringify(cart));
  }

  public static clear(){
    localStorage.removeItem(PETSHOP_CART);
  }
}
