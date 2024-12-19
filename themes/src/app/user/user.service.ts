import { Injectable } from '@angular/core';
import { UserForAuth } from '../types/user';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user$$ = new BehaviorSubject<UserForAuth | null>(null);

  private user$ = this.user$$.asObservable();
  USER_KEY = '[user]';
  user: UserForAuth | null = null;
  get isLogged(): boolean {
    return !!this.user;
  }
  constructor(private http: HttpClient) {
    // Check if the user is saved in localStorage
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      this.user$$.next(JSON.parse(storedUser));
    }

    // Subscribe to user$ to update the user in memory
    this.user$.subscribe((user) => {
      this.user = user;
    });
  }

  login(email: string, password: string) {
    return this.http.post<UserForAuth>(`/api/login`, { email, password }).pipe(
      tap((user) => {
        this.user$$.next(user);
        localStorage.setItem(this.USER_KEY, JSON.stringify(user)); // Store user in localStorage
      })
    );
  }

  logout() {
    return this.http.post('/api/logout', {}).pipe(
      tap(() => {
        this.user$$.next(null);
        localStorage.removeItem(this.USER_KEY); // Remove user from localStorage
      })
    );
  }

  register(
    username: string,
    email: string,
    tel: string,
    password: string,
    rePassword: string
  ) {
    return this.http
      .post<UserForAuth>('/api/register', {
        username,
        email,
        tel,
        password,
        rePassword,
      })
      .pipe(
        tap((user) => {
          this.user$$.next(user);
          localStorage.setItem(this.USER_KEY, JSON.stringify(user));

        })
      );
  }
  getProfile(){
   return this.http.get<UserForAuth>('/api/users/profile').pipe(
      tap((user) => {
        this.user$$.next(user);
      })
    );
  }
  updateProfile(username: string, email: string, tel?: string) {
    return this.http
      .put<UserForAuth>(`/api/users/profile`, {
        username,
        email,
        tel,
      })
      .pipe(tap((user) => this.user$$.next(user)));
  }
  
}
