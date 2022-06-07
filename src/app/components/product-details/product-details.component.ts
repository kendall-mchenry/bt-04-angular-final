import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit {
  selectedId: number = 0;
  viewProduct: Product = new Product();

  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.selectedId = this.actRoute.snapshot.params['id'];
    this.productService
      .getProductByID(this.selectedId)
      .subscribe((selectedProduct) => (this.viewProduct = selectedProduct));
  }
}
