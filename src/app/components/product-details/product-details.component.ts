import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
    private actRoute: ActivatedRoute, private router: Router
  ) {}

  ngOnInit(): void {
    this.selectedId = this.actRoute.snapshot.params['id'];
    this.productService
      .getProductByID(this.selectedId)
      .subscribe((selectedProduct) => (this.viewProduct = selectedProduct));
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
    })
  }

  
}
