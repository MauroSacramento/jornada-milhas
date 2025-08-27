import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { BehaviorSubject } from 'rxjs';
import { Cadastro } from '../types/type';
import {jwtDecode} from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject = new BehaviorSubject<Cadastro | null>(null);

  constructor(private tokenService: TokenService){
    if(tokenService.possuiToken()){
      this.decodeJWT()
    }
  }

  decodeJWT(){
    const token = this.tokenService.retornarToken()
    const user = jwtDecode(token) as Cadastro;
    this.userSubject.next(user)
  }

  retornarUser(){
    this.userSubject.asObservable();
  }

  salvarToken(token: string){
    this.tokenService.salvarToken(token)
    this.decodeJWT()
  }

  logout(){
    this.tokenService.excluirToken()
    this.userSubject.next(null)
  }

  isLogged(){
    return this.tokenService.possuiToken()
  }
}
