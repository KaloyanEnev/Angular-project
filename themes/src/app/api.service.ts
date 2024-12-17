import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Theme } from './types/theme';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


  getThemes(){
    const {apiUrl} =environment ;
    return this.http.get<Theme[]>(`${apiUrl}/themes`)

  }
  getSingleTheme(id:string){
    const {apiUrl} =environment ;
   return this.http.get<Theme>(`${apiUrl}/themes/${id}`)

  }
}
