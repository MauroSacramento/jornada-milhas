import { Cadastro } from './../types/type';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  buscarUser(token: string){

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.get<Cadastro>(`${this.apiUrl}/auth/perfil`, { headers })
  }

  editarUser(user: Cadastro, token: string){

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.patch<Cadastro>(`${this.apiUrl}/auth/perfil`, user, { headers })
  }
}
