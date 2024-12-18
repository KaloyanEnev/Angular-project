import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-my-themes',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './my-themes.component.html',
  styleUrl: './my-themes.component.css'
})
export class MyThemesComponent {
  userId: any = '';

themes : Theme[] = [];
  constructor(private apiService: ApiService, private userService:UserService){

  }
  ngOnInit(){
    this.userId = this.userService.user?._id;
    this.apiService.getThemes().subscribe(t =>{

       this.themes= t;
       console.log(this.userId);
       
        this.themes = this.themes.filter(theme => theme.userId._id === this.userId);
       
       
    });
  }

}
