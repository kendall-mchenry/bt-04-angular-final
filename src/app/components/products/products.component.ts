import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ItemDurability, Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  productList: Product[] = [];

  searchTerm: string = '';

  sortOptions: string[] = ['Sort by Name (Ascending)', 'Sort by Name (Descending)', 'Sort by Price (Low to High)', 'Sort by Price (High to Low)'];

  selectedDurability: ItemDurability = '';

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

  // Advanced JSON --------------------------------------------

  onSearchSubmit() {
    this.productService.searchByString(this.searchTerm).subscribe(searchResults => {
      this.productList = searchResults
    });
  }

  // In a future iteration, I'd like to make these sort functionalities like turn off/on when clicked.

  // SORTING
  clickSortByNameAsc() {
    this.productService.sortByNameAsc().subscribe(sortedList => {
      this.productList = sortedList});
    console.log(this.productList);
  }

  clickSortByNameDesc() {
    this.productService.sortByNameDesc().subscribe(sortedList => {this.productList = sortedList});
    console.log(this.productList);
  }

  clickSortByPriceAsc() {
    this.productService.sortByPriceAsc().subscribe(sortedList => {
      this.productList = sortedList
    });
  }

  clickSortByPriceDesc() {
    this.productService.sortByPriceDesc().subscribe(sortedList => {
      this.productList = sortedList
    });
  }

  // FILTER
  showInStock() {
    this.productService.filterInStock().subscribe(filteredList => {
      this.productList = filteredList
    });
  }

  showNotInStock() {
    this.productService.filterNotInStock().subscribe(filteredList => {
      this.productList = filteredList
    });
  }

  filterDurability(itemDurability: ItemDurability) {
    this.productService.filterDurability(itemDurability).subscribe(response => {
      this.productList = response
    });
  }

}
