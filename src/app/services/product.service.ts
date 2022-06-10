import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  dataSource: string = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  // GET: Return all products
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.dataSource);
  }

  // GET: Return product by ID
  getProductByID(searchId: number): Observable<Product> {
    return this.http.get<Product>(`${this.dataSource}/${searchId}`);
  }

  // POST: Create new product
  createNewProduct(newProduct: Product): Observable<Product> {
    return this.http.post<Product>(this.dataSource, newProduct);
  }

  // PUT: Edit product by ID
  editProductById(editId: number, editProduct: Product): Observable<Product> {
    return this.http.put<Product>(`${this.dataSource}/${editId}`, editProduct);
  }

  // DELETE: Delete product by ID
  deleteProductById(deleteId: number): Observable<any> {
    return this.http.delete<any>(`${this.dataSource}/${deleteId}`);
  }

  // ADVANCED JSON METHODS----------------------------

  // SEARCH by string
  searchByString(searchTerm: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?q=${searchTerm}`);
  }

  // SORT by name (ascending)
  sortByNameAsc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?_sort=itemName&_order=asc`)
  }

  // SORT by name (descending)
  sortByNameDesc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?_sort=itemName&_order=desc`)
  }

  // SORT by price (ascending, low to high)
  sortByPriceAsc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?_sort=price&_order=asc`)
  }

  // SORT by price (descending, high to low)
  sortByPriceDesc(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?_sort=price&_order=desc`)
  }

  // FILTER by durability
  filterLight(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?itemDurability=Light`);
  }

  filterMedium(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?itemDurability=Medium`);
  }

  filterTough(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?itemDurability=Tough`);
  }
  
// Would there be a way to combo filter these? (Like, have a check box that returns the value selected by the checkbox and fills in the appropriate filtering data for the URL?)

  // FILTER by in stock/out of stock
  filterInStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?inStock=true`);
  }

  filterNotInStock(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?inStock=false`);
  }

  // FILTER by price ranges
  filterPrice1(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?price_gte=0&price_lte=5`);
  }

  filterPrice2(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?price_gte=5.01&price_lte=15`);
  }

  filterPrice3(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.dataSource}/?price_gte=15.01&price_lte=30`);
  }

}
