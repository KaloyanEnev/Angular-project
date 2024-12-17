import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
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
this.userService.register(username,email,tel,password,rePassword).subscribe(()=>{

  this.router.navigate(['/themes'])
});

 }
}
