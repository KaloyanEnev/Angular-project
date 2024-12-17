import { Component } from '@angular/core';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css'
})
export class CurrentThemeComponent {

theme = {} as Theme
constructor(private apiService : ApiService,private router : ActivatedRoute,private navRouter : Router){


}
ngOnInit(): void {
  const id = this.router.snapshot.params['themeId'];
  this.apiService.getSingleTheme(id).subscribe((t) => {
    this.theme = t;
   
  });
}
}
