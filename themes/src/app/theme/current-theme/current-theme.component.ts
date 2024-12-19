import { Component } from '@angular/core';
import { Theme } from '../../types/theme';
import { ApiService } from '../../api.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UserService } from '../../user/user.service';
import { User } from '../../types/user';
import { FormsModule, NgForm } from '@angular/forms';
import { Post } from '../../types/post';
import { ElapsedTimePipe } from '../../pipes/elapsed-time.pipe';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-current-theme',
  standalone: true,
  imports: [RouterLink,FormsModule,ElapsedTimePipe,DatePipe],
  templateUrl: './current-theme.component.html',
  styleUrl: './current-theme.component.css',
})
export class CurrentThemeComponent {
  get isLoggedIn(): boolean {
    return this.userService.isLogged
  } 
  hasLiked = false;
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
      this.userId= this.userService.user?._id
        this.updateLikesWithHasLiked(this.theme, this.userId)
        this.hasSubscribed = this.checkIfHasSubscribed(this.theme, this.userId);

        console.log(this.theme);
        console.log("userid",this.userId);
        
        
      
      
    });
  }
  onDelete(themeId: string, postId: string): void {
    this.apiService.deletePost(themeId, postId).subscribe({
      next: (data) => {
        this.theme.posts = this.theme.posts.filter((post: any) => post._id !== postId);
  
        this.navRouter.navigate([`/themes/${themeId}`]);
      },
      error: (err) => {
        console.error('Error deleting post:', err);
      }
    });
  }
  addComment(form: NgForm) {
    const idTheme = this.router.snapshot.params['themeId'];
    console.log(idTheme);
  
    if (form.invalid) {
      return;
    }
  
    const { postText } = form.value;
  
    // Make API call to add the post
    this.apiService.addPost(idTheme, postText).subscribe({
      next: (data) => {
       this.loadThemeData();

       this.navRouter.navigate([`/themes/${idTheme}`])
       
  
        // Reset the form after the post is added
        form.reset();
      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    });
  }
  likePost(postId: string){
    this.apiService.likePost(postId).subscribe({
      next: (data) => {
       this.loadThemeData();
       this.navRouter.navigate([`/themes/${this.theme._id}`])

      },
      error: (err) => {
        console.error('Error adding comment:', err);
      }
    })
  }
  updateLikesWithHasLiked(theme: any, userId: string): void {
    theme.posts.forEach((post: any) => {
      // Check if the likes array contains the userId
      const hasLiked = post.likes && post.likes.includes(userId);
  
      // Add the hasLiked property to the post
      post.hasLiked = hasLiked;
    });
  }

  checkIfHasSubscribed(theme: Theme, userId: string): boolean {
    return theme.subscribers.some((sub) => userId === sub);
  }

  hasSubscribed = false;;

  subscribeToTheme(themeId: string){
    return this.apiService.subscribeToTheme(themeId).subscribe({
      next : (data) => {
        this.loadThemeData()
      }
    })

  }
  private loadThemeData(): void {
    const id = this.router.snapshot.params['themeId'];
    this.apiService.getSingleTheme(id).subscribe((theme) => {
      this.userId = this.userService.user?._id;
      this.theme = theme;
      this.updateLikesWithHasLiked(this.theme, this.userId);
      this.hasSubscribed = this.checkIfHasSubscribed(this.theme, this.userId);
    });
  }

    
  }

