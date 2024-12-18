import { Component, OnInit } from '@angular/core';
import { UserService } from '../user/user.service';
import { LoaderComponent } from "../shared/loader/loader.component";

@Component({
  selector: 'app-authenticate',
  standalone: true,
  imports: [LoaderComponent],
  templateUrl: './authenticate.component.html',
  styleUrl: './authenticate.component.css'
})
export class AuthenticateComponent implements OnInit {
  isAuthentinating = true;

  constructor(private userService: UserService){

  }
  ngOnInit(): void {
      this.userService.getProfile().subscribe({
        next: ()=>{
          this.isAuthentinating= false;
        },
        error : () =>{
          this.isAuthentinating = false;
        },
        complete : () =>{
          this.isAuthentinating = false;
        }
      })
  }

}