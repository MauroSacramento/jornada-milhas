import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { Cadastro } from '../types/type';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Cadastro | null>(null)

  constructor(private tokenService: TokenService) {
    if(this.tokenService.pussuiToken()){
      this.decodificarJWT()
    }
   }

   decodificarJWT(){
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as Cadastro;
    this.userSubject.next(user)
   }

   retornarUser(){
    return this.userSubject.asObservable();
   }

   salvarToken(token: string){
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
   }

   logout(){
    this.tokenService.excluirToken();
    this.userSubject.next(null);
   }

   isLogged(){
    return this.tokenService.pussuiToken();
   }

}
