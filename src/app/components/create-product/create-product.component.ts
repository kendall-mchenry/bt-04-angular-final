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

  createOptions: string[] = ['Light', 'Medium', 'Tough'];

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

  // Not sure if this is the right way to do it, will revisit later if possible. But it works for now?
  increaseInventoryCount(): number {
    this.newProduct.inventoryCount++;

    if (this.newProduct.inventoryCount > 0) {
      this.newProduct.inStock = true;
      console.log(this.newProduct.inventoryCount);
      console.log(this.newProduct.inStock);
    }
    return this.newProduct.inventoryCount;
  }

  decreaseInventoryCount(): number {
    this.newProduct.inventoryCount--;

    if (this.newProduct.inventoryCount > 0) {
      this.newProduct.inStock = true;
      console.log(this.newProduct.inventoryCount);
      console.log(this.newProduct.inStock);
      return this.newProduct.inventoryCount;
    } else if (this.newProduct.inventoryCount == 0) {
      this.newProduct.inStock = false;
      console.log(this.newProduct.inventoryCount);
      console.log(this.newProduct.inStock);
      return this.newProduct.inventoryCount;
    } else if (this.newProduct.inventoryCount < 0) {
      alert('Inventory count cannot be less than 0.');
      this.newProduct.inStock = false;
      console.log(this.newProduct.inStock);
      return this.newProduct.inventoryCount++;
    } else {
      return this.newProduct.inventoryCount;
    }
  }
}
