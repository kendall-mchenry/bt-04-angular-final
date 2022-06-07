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
}
