import { Component } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ThemesListComponent } from '../theme/themes-list/themes-list.component';
import { UserService } from '../user/user.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [HomeComponent,ThemesListComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  constructor(private userService: UserService){}
  get isLogged(){
    return this.userService.isLogged
  }
  

}
