import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  email = '';
  role = '';
  password = '';
  confirmPassword = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    if (this.password != this.confirmPassword) {
      alert("Passwords does not match");
    }
    const requestBody = {
      email: this.email,
      role: this.role,
      password: this.password
    }
    console.log(requestBody);

    this.authService.register(this.email, this.role, this.password).subscribe({
      next: (response) => {
        alert("Registration successful!");
        console.log("Response is", response);
        // Store user role in localStorage
        localStorage.setItem('userRole', this.role);
        this.router.navigate(['/login']);
      },
      error: (error) => {
        alert("Registration failed!");
        console.error(error);
      }
    });
  }
}


