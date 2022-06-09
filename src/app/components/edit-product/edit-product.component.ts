import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {

  editOptions: string[] = ['Light', 'Medium', 'Tough'];

  editProduct: Product = new Product();

  editId: number = 0;

  constructor(
    private productService: ProductService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.editId = this.actRoute.snapshot.params['id'];
    this.productService
      .getProductByID(this.editId)
      .subscribe((editingProduct) => {
        this.editProduct = editingProduct;
      });
  }

  onEditSubmit() {
    this.productService
      .editProductById(this.editId, this.editProduct)
      .subscribe((editedProduct) => {
        console.log(editedProduct);
        // alert(`${editedProduct.itemName} has been updated!`);
        this.router.navigateByUrl(`/products`);
      });
  }

  // Not sure if this is the right way to do it, will revisit later if possible. But it works for now?
  increaseInventoryCount(): number {
    this.editProduct.inventoryCount++;

    if (this.editProduct.inventoryCount > 0) {
      this.editProduct.inStock = true;
      console.log(this.editProduct.inventoryCount);
      console.log(this.editProduct.inStock);
    }
    return this.editProduct.inventoryCount;
  }

  decreaseInventoryCount(): number {
    this.editProduct.inventoryCount--;

    if (this.editProduct.inventoryCount > 0) {
      this.editProduct.inStock = true;
      console.log(this.editProduct.inventoryCount);
      console.log(this.editProduct.inStock);
      return this.editProduct.inventoryCount;
    } else if (this.editProduct.inventoryCount == 0) {
      this.editProduct.inStock = false;
      console.log(this.editProduct.inventoryCount);
      console.log(this.editProduct.inStock);
      return this.editProduct.inventoryCount;
    } else if (this.editProduct.inventoryCount < 0) {
      alert('Inventory count cannot be less than 0.');
      this.editProduct.inStock = false;
      console.log(this.editProduct.inStock);
      return this.editProduct.inventoryCount++;
    } else {
      return this.editProduct.inventoryCount;
    }
  }
}
