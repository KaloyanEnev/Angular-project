import { Component, OnInit } from '@angular/core';
import { ProfileDetails } from '../../types/user';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { emailValidator } from '../../utils/email.validator';
import { DOMAINS } from '../../constant';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
  constructor(private userService : UserService){}
  isEditMode = false;

  toggleEditMode(){
    this.isEditMode =!this.isEditMode;
  }
  profileDetails: ProfileDetails = {
    username: '',
    email: '',
    tel: '',
  };
  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    email: new FormControl('', [Validators.required, emailValidator(DOMAINS)]),
    tel: new FormControl(''),
  });

  ngOnInit(): void {
    const { username, email, tel } = this.userService.user!;
    
    this.userService.getProfile().subscribe({
      next: (user) => {
        this.profileDetails = {
          username: user.username,
          email: user.email,
          tel: user.tel!,
        };
        
        this.form.setValue({
          username: user.username,
          email: user.email,
          tel: user.tel!,
        });
      },
      error: (err) => {
        console.error('Error fetching profile:', err);
      }
    });
  
  }
  handleSaveProfile() {
    if (this.form.invalid) {
      return;
    }

    this.profileDetails = this.form.value as ProfileDetails;

    const { username, email, tel } = this.profileDetails;

    this.userService.updateProfile(username, email, tel).subscribe(() => {
      this.toggleEditMode();
    });
  }

  onCancel(event: Event) {
    event.preventDefault();
    this.toggleEditMode();
  }
}
