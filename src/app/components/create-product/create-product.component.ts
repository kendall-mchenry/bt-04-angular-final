import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css'],
})
export class CreateProductComponent implements OnInit {
  newProduct: Product = new Product();

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {}

  // Add some error handling so the form can't be submitted without all details filled out
  onCreateSubmit() {
    console.log('submitted');
    this.productService
      .createNewProduct(this.newProduct)
      .subscribe((response) => {
        console.log(response);
        this.router.navigateByUrl('/products');
        alert(
          `${this.newProduct.itemName} has been added to the product list.`
        );
      });
  }

  increaseInventoryCount(): number {
    let currentCount: number = this.newProduct.inventoryCount++;

    if (this.newProduct.inventoryCount > 0) {
      this.newProduct.inStock = true;
      console.log(this.newProduct.inventoryCount);
      console.log(this.newProduct.inStock);
    }
    return currentCount;
  }

  decreaseInventoryCount(): number {
    // gotta figure out how to make the number reflect accurately when adding a new product
    let currentCount: number = this.newProduct.inventoryCount--;

    if (this.newProduct.inventoryCount <= 0) {
      alert('Inventory count cannot be less than 0.');
      this.newProduct.inStock = false;
      console.log(this.newProduct.inStock);
      return this.newProduct.inventoryCount;
    } else {
      this.newProduct.inStock = true;
      console.log(this.newProduct.inStock);
      return this.newProduct.inventoryCount--;
    }
  }
}
