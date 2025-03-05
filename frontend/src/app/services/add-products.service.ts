import { Injectable } from '@angular/core';
import {Product} from "./product.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AddProductsService {
  private apiUrl = 'https://your-api-endpoint.com/products'; // Replace with actual API URL

  constructor(private http: HttpClient) {}

  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}
