import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './themes-list.component.html',
  styleUrl: './themes-list.component.css'
})
export class ThemesListComponent {

  themes : Theme[] = [];
  constructor(private apiService: ApiService){

  }
  ngOnInit(){
    this.apiService.getThemes().subscribe(t =>{

       this.themes= t;
      //  this.themes = this.themes.filter(theme => theme.subscribers.length > 4);
       
       
    });
  }


}
