import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {

        // Assuming response contains user role
        const userRole = response.role;
        console.log("userRole:",userRole);
        // Store role in localStorage
        localStorage.setItem('userRole', userRole)
        this.router.navigate(['']);
      },
      error: (error) => {
        alert("Login failed!");
        console.error(error);
      }
    });
  }
}
