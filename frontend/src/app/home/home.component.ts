// import { Component, OnInit } from '@angular/core';
// import { ProductService, Product } from 'src/app/services/product.service';
// import {HttpClient} from "@angular/common/http";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-home',
//   templateUrl: './home.component.html',
//   styleUrls: ['./home.component.css']
// })
// export class HomeComponent implements OnInit {
//   products: Product[] = [];
//   userRole: string | null = '';
//   isSeller : boolean = false;
//
//   // Pagination & Sorting
//   currentPage: number = 0;
//   pageSize: number = 5;
//   totalPages: number = 1;
//   sortBy: string = 'name';
//   sortDirection: string = 'asc';
//
//
//   constructor(private productService: ProductService, private http: HttpClient, private router: Router) { }
//
//   ngOnInit() {
//     //fetch products
//     this.fetchProducts();
//     // this.productService.getAll()
//     //   .subscribe((products: Product[]) => {
//     //     this.products = products;
//     //   });
//
//
//
//     this.userRole = localStorage.getItem('userRole'); // Get role from localStorage
//     console.log("userRole yhi ho hai: ", this.userRole);
//     // Check if user is a seller
//     this.isSeller = this.userRole === 'Seller'; // Ensure role comparison is case-sensitive
//   }
//   fetchProducts() {
//     this.productService.getAll(this.currentPage, this.pageSize, this.sortBy, this.sortDirection)
//       .subscribe(response => {
//         this.products = response.content;
//         this.totalPages = response.totalPages;
//       });
//   }
//
//   changePage(page: number) {
//     if (page >= 0 && page < this.totalPages) {
//       this.currentPage = page;
//       this.fetchProducts();
//     }
//   }
//
//   changeSorting(sortBy: string) {
//     this.sortBy = sortBy;
//     this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
//     this.fetchProducts();
//   }
//
//
//   navigateToAddProduct() {
//     this.router.navigate(['/add-product']); // Navigate to Add Product page
//   }
// }




import { Component, OnInit } from '@angular/core';
import { ProductService, Product } from 'src/app/services/product.service';
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  userRole: string | null = '';
  isSeller: boolean = false;

  // Pagination & Sorting
  currentPage: number = 0;
  pageSize: number = 8;
  totalPages: number = 1;
  sortBy: string = 'name';
  sortDirection: string = 'asc';

  constructor(private productService: ProductService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.fetchProducts();
      console.log("Product Images: ", this.products.map(p => p.imgUrl));
    this.userRole = localStorage.getItem('userRole');
    this.isSeller = this.userRole === 'Seller';
  }

  fetchProducts() {
    this.productService.getAll(this.currentPage, this.pageSize, this.sortBy, this.sortDirection)
      .subscribe(response => {
        console.log("API Response:", response); // Check if API is returning data
        this.products = response.content;
        this.totalPages = response.totalPages;
        // Debugging: Log product images
        console.log("Product Images:", this.products.map(p => p.imgUrl));
      },error => {
          console.error("Error fetching products:", error);
        }
        );
  }

  changePage(page: number) {
    if (page >= 0 && page < this.totalPages) {
      this.currentPage = page;
      this.fetchProducts();
    }
  }

  changeSorting(sortBy: string) {
    this.sortBy = sortBy;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.fetchProducts();
  }

  navigateToProduct(productId: number) {
    this.router.navigate(['/product', productId]);
  }

  navigateToAddProduct() {
    this.router.navigate(['/add-product']);
  }
}
