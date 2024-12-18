import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';
import { EmailDirective } from '../../directives/email.directive';
import { DOMAINS } from '../../constant';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink,EmailDirective],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  domains = DOMAINS;
  errorMessage : string = ''
  constructor(private userService : UserService,private router: Router){}
 register(form:NgForm){
console.log(form.invalid);
const {
  username,
  email,
  tel,
 password,
  rePassword  ,
} = form.value;
if (password !== rePassword) {
  this.errorMessage = 'Passwords do not match.';
  form.reset()
  return;
}

this.userService.register(username!,email!,tel!,password!,rePassword!).subscribe({
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
resetErrors() {
  // Clear error messages when typing
  this.errorMessage = '';

}
 
 }
