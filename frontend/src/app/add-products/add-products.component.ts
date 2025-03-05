// import { Component } from '@angular/core';
// import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
// import {Product, ProductService} from "../services/product.service";
// import {Router} from "@angular/router";
//
// @Component({
//   selector: 'app-add-products',
//   standalone: true,
//   imports: [
//     ReactiveFormsModule
//   ],
//   templateUrl: './add-products.component.html',
//   styleUrl: './add-products.component.css'
// })
// export class AddProductsComponent {
//   productForm: FormGroup;
//
//
//   constructor(private fb: FormBuilder, private productService: ProductService, private router: Router){
//     this.productForm = this.fb.group({
//       name: ['', Validators.required],
//       description: ['', Validators.required],
//       price: [null, [Validators.required, Validators.min(0)]],
//       imgUrl: [''],
//     });
//   }
//
//   onSubmit(): void {
//     console.log("Submit button is clicked");
//     if (this.productForm.valid) {
//       const product: Product = this.productForm.value;
//       console.log("Product Data:", product);  // Log product data
//       this.productService.addProduct(product).subscribe(
//         (response) => {
//           console.log("API Response:", response);  // Log API response
//           alert('Product added successfully!');
//           this.productForm.reset();
//           this.router.navigate(['']); //Navigating to home, after successfully adding the product
//         },
//         (error) => {
//           console.error('Error adding product:', error);
//           alert('Failed to add product.');
//         }
//       );
//     }
//     else {
//       console.log("Form is invalid");  // Check if form validation fails
//     }
//   }
// }



import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Product, ProductService } from "../services/product.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-add-products',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './add-products.component.html',
  styleUrl: './add-products.component.css'
})
export class AddProductsComponent {
  productForm: FormGroup;
  previewImgUrl: string = '';

  constructor(private fb: FormBuilder, private productService: ProductService, private router: Router){
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [null, [Validators.required, Validators.min(0)]],
      imgUrl: [''],
    });
  }

  previewImage(): void {
    this.previewImgUrl = this.productForm.get('imgUrl')?.value || '';
  }

  onSubmit(): void {
    console.log("Submit button is clicked");
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      console.log("Product Data:", product);
      this.productService.addProduct(product).subscribe(
        (response) => {
          console.log("API Response:", response);
          alert('🎉 Product added successfully!');
          this.productForm.reset();
          this.previewImgUrl = ''; // Reset preview
          this.router.navigate(['']); // Navigate to home
        },
        (error) => {
          console.error('Error adding product:', error);
          alert('❌ Failed to add product.');
        }
      );
    }
    else {
      console.log("Form is invalid");
    }
  }
}

