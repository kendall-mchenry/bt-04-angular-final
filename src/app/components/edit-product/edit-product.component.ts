import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { timeStamp } from 'console';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
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
        this.router.navigateByUrl(`/products/${this.editId}`);
      });
  }
}
