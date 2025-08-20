import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Promocao } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class PromocaoService {

  private endPoint = environment.apiUrl;

  constructor(private http: HttpClient) { }

  listar(): Observable<Promocao[]> {
    return this.http.get<Promocao[]>(`${this.endPoint}/promocoes`);
  }
}
