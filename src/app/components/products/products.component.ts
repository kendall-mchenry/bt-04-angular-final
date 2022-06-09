import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService
      .getAllProducts()
      .subscribe((productsAvailable) => (this.productList = productsAvailable));
  }

  onItemDelete(productId: number) {
    let deleteProduct = new Product;
    this.productService.getProductByID(productId).subscribe(findProduct => {
      deleteProduct = findProduct;
    })

    this.productService.deleteProductById(productId).subscribe(deletedProduct => {
      console.log(deletedProduct);
      this.router.navigateByUrl('/products');

      // Add name of which item was deleted (subscribe to service again to get item info by id?)
      alert(`${deleteProduct.itemName} has been deleted.`);
      this.loadProducts();
    })
  }
}
