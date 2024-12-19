import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';
import { DatePipe } from '@angular/common';
import { SlicePipe } from '../../pipes/slice.pipe';

@Component({
  selector: 'app-themes-list',
  standalone: true,
  imports: [RouterLink,DatePipe,SlicePipe],
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
