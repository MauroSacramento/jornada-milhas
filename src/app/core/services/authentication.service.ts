import { UserService } from './user.service';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe, tap } from 'rxjs';
import { environment } from 'src/environments/environment.development';

interface AuthResponse {
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private userService:UserService) { }

  autenticar(email: string, senha: string): Observable<HttpResponse<AuthResponse>>{
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth/login`, {email, senha}, {observe: 'response'})
    .pipe(
      tap((res) => {
        const authToken = res.body?.access_token || '';
        this.userService.salvarToken(authToken)
      })
    )
  }
}
