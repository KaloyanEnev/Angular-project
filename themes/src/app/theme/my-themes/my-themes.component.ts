import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';
import { UserService } from '../../user/user.service';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '../../pipes/slice.pipe';

@Component({
  selector: 'app-my-themes',
  standalone: true,
  imports: [RouterLink,DatePipe,SlicePipe],
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
