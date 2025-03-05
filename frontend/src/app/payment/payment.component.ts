/*
// import { Component, OnInit } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/app/payment/environment';
// import {ActivatedRoute} from "@angular/router";
//
// @Component({
//   selector: 'app-payment',
//   templateUrl: './payment.component.html',
//   styleUrls: ['./payment.component.css']
// })
// export class PaymentComponent implements OnInit {
//   amount!: number; // user must input
//   isLoading = false;
//   paymentStatus: 'success' | 'failed' | '' = '';
//
//   constructor(private http: HttpClient, private route: ActivatedRoute) {}
//
//   ngOnInit(): void {
//     // Get amount from URL parameters
//     this.route.queryParams.subscribe(params => {
//       this.amount = params['amount'] ? Number(params['amount']) : 0;
//       console.log('Amount received:', this.amount);
//     });
//   }
//
//   initiatePayment() {
//     this.isLoading = true;
//     this.paymentStatus = '';
//     if (!this.amount || this.amount <= 0) {
//       alert('Please enter a valid amount.');
//       return;
//     }
//
//     const token = localStorage.getItem('access_token');
//     const userId = localStorage.getItem('user_id');
//
//     if (!token || !userId) {
//       alert('User not authenticated. Please log in.');
//       return;
//     }
//
//     const headers = new HttpHeaders({
//       'Authorization': `Bearer ${token}`,
//       'Content-Type': 'application/json'
//     });
//
//     const paymentRequest = {
//       amount: this.amount * 100 // Convert INR to paise
//     };
//
//     console.log("Initiating payment with:", paymentRequest);
//
//     this.http.post<any>(`${environment.apiUrl}/${userId}/checkout`, paymentRequest, { headers })
//       .subscribe(
//         order => {
//           console.log("Order created successfully:", order);
//           this.openRazorpay(order);
//         },
//         error => {
//           console.error('Order creation failed:', error);
//           alert('Payment initiation failed. Please try again.');
//         }
//       );
//   }
//
//   openRazorpay(order: any) {
//     if (!(window as any).Razorpay) {
//       alert("Razorpay SDK not loaded. Please check your internet connection.");
//       return;
//     }
//
//     const options = {
//       key: environment.razorpayKey,
//       amount: order.amount * 100,
//       currency: order.currency,
//       name: 'Sharma Quick Ecommerce',
//       description: 'Payment for Order',
//       order_id: order.id,
//       handler: (response: any) => {
//         console.log("Payment successful, verifying...", response);
//         this.verifyPayment(response);
//       },
//       prefill: {
//         name: 'Customer Name',
//         email: 'customer@example.com',
//         contact: '9999999999'
//       },
//       theme: {
//         color: '#3399cc'
//       }
//     };
//
//     try {
//       const rzp = new (window as any).Razorpay(options);
//       rzp.open();
//     } catch (error) {
//       console.error("Error initializing Razorpay:", error);
//       alert("Something went wrong while opening Razorpay.");
//     }
//   }
//
//   verifyPayment(response: any) {
//     console.log("Verifying payment...", response);
//
//     this.http.post<any>(`${environment.apiUrl}/payments/verify`, response)
//       .subscribe(
//         res => {
//           console.log("Payment verified successfully:", res);
//           alert('Payment Successful!');
//         },
//         err => {
//           console.error("Payment verification failed:", err);
//           alert('Payment Verification Failed');
//         }
//       );
//   }
// }
*/

import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/app/payment/environment';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  amount!: number;
  isLoading = false;
  paymentStatus: 'success' | 'failed' | '' = '';
  message: string = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.amount = params['amount'] ? Number(params['amount']) : 0;
      console.log('Amount received:', this.amount);
    });
  }

  initiatePayment() {
    this.isLoading = true;
    this.paymentStatus = '';
    this.message = '';

    if (!this.amount || this.amount <= 0) {
      this.showMessage('Please enter a valid amount.', 'failed');
      return;
    }

    const token = localStorage.getItem('access_token');
    const userId = localStorage.getItem('user_id');

    if (!token || !userId) {
      this.showMessage('User not authenticated. Please log in.', 'failed');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const paymentRequest = { amount: this.amount * 100 };

    console.log("Initiating payment with:", paymentRequest);

    this.http.post<any>(`${environment.apiUrl}/${userId}/checkout`, paymentRequest, { headers })
      .subscribe(
        order => {
          console.log("Order created successfully:", order);
          this.openRazorpay(order);
        },
        error => {
          console.error('Order creation failed:', error);
          this.showMessage('Payment initiation failed. Please try again.', 'failed');
        }
      );
  }

  openRazorpay(order: any) {
    if (!(window as any).Razorpay) {
      this.showMessage('Razorpay SDK not loaded. Please check your internet connection.', 'failed');
      return;
    }

    const options = {
      key: environment.razorpayKey,
      amount: order.amount,
      currency: order.currency,
      name: 'Sharma Quick Ecommerce',
      description: 'Payment for Order',
      order_id: order.id,
      handler: (response: any) => {
        console.log("Payment successful, verifying...", response);
        this.verifyPayment(response);
      },
      prefill: {
        name: 'Customer Name',
        email: 'customer@example.com',
        contact: '9999999999'
      },
      theme: {
        color: '#3399cc'
      }
    };

    try {
      const rzp = new (window as any).Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
      this.showMessage("Something went wrong while opening Razorpay.", 'failed');
    }
  }

  verifyPayment(response: any) {
    console.log("Verifying payment...", response);

    this.http.post<any>(`${environment.apiUrl}/payments/verify`, response)
      .subscribe(
        res => {
          console.log("Payment verified successfully:", res);
          this.showMessage('Payment Successful!', 'success');
        },
        err => {
          console.error("Payment verification failed:", err);
          this.showMessage('Payment Verification Failed', 'failed');
        }
      );
  }

  showMessage(msg: string, status: 'success' | 'failed') {
    this.message = msg;
    this.paymentStatus = status;
    this.isLoading = false;

    // Auto-dismiss message after 3 seconds
    setTimeout(() => {
      this.paymentStatus = '';
      this.message = '';
    }, 3000);
  }
}
