import { Component } from '@angular/core';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css',
})
export class CurrentThemeComponent {
  theme = {} as Theme;
  constructor(
    private userService: UserService,
    private apiService: ApiService,
    private router: ActivatedRoute,
    private navRouter: Router
  ) {}

  userId: any = '';
  ngOnInit(): void {
    const id = this.router.snapshot.params['themeId'];
    this.apiService.getSingleTheme(id).subscribe((t) => {
      this.theme = t;
     
      
      this.userId = this.userService.user?._id
      console.log('userid',this.userId);
      
      
    });
  }
  onDelete(themeId: string, postId: string): void {
    this.apiService.deletePost(themeId, postId).subscribe({
      next: (data) => {
        // Remove the post from the local array
        this.theme.posts = this.theme.posts.filter((post: any) => post._id !== postId);
  
        // Optionally, navigate to the same page to reflect changes in the URL
        this.navRouter.navigate([`/themes/${themeId}`]);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
    
    
  }

