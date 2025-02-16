import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/product.service';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  isSeller: boolean = false;
  showModal: boolean = false;

  newProduct: Product = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    imgUrl: ''
  };

  constructor(private productService: ProductService, private http: HttpClient) { }

  ngOnInit() {
    this.productService.getAll()
      .subscribe((products: Product[]) => {
        this.products = products;
      });

    // Simulating user role check (Replace with actual auth logic)
    this.isSeller = localStorage.getItem('userRole') === 'Seller';
  }
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  addProduct() {
    this.http.post('/api/v1/products/add', this.newProduct).subscribe(
      (response) => {
        console.log('Product added:', response);
        this.products.push(this.newProduct);
        this.closeModal();
      },
      (error) => console.error('Error adding product:', error)
    );
  }
}
