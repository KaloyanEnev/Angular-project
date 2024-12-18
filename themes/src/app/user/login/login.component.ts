import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../user.service';
import { Router, RouterLink } from '@angular/router';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constant';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink,EmailDirective],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  domains = DOMAINS
  errorMessage: string = ''
  constructor(private userService: UserService, private router: Router) {}

  login(form:NgForm) {
    if(form.invalid){
      return;
    }
    const {email, password} = form.value;
    
    this.userService.login(email, password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        // Extract and display the server error message
        this.errorMessage = error.error?.message || 'Invalid credentials. Please try again.';
        form.reset()
      },
    });
  }
  resetError() {
    // Clear the error message when the user starts typing
    this.errorMessage = '';
  }
}
