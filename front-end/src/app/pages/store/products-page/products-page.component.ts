import { DataService } from './../../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductModel } from 'src/app/models/product,model';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html'
})
export class ProductsPageComponent implements OnInit {

  products$: Observable<ProductModel[]>;

  constructor(private data: DataService) { }

  ngOnInit() {
    this.products$ = this.data.getProducts();
  }
}
