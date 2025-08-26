import { Cadastro } from './../types/type';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CadastroService {

  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  cadastrar(user: Cadastro): Observable<Cadastro>{
    return this.http.post<Cadastro>(`${this.apiUrl}/auth/cadastro`, user);
  }
}
