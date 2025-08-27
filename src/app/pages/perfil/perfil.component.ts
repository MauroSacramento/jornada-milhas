import { FormGroup } from '@angular/forms';
import { TokenService } from './../../core/services/token.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { Cadastro } from 'src/app/core/types/type';
import { UserService } from 'src/app/core/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit{

  token: string= ''
  nome: string = ''
  user!: Cadastro;
  form!: FormGroup | null;

  constructor(
    private tokenService: TokenService,
    private cadastroService: CadastroService,
    private router: Router,
    private formService: FormularioService,
    private userService: UserService
  ){}


  ngOnInit(): void {
    this.token = this.tokenService.retornarToken()
    this.cadastroService.buscarUser(this.token).subscribe(user => {
      this.user = user;
      this.nome = user.nome;
      this.carregarForm()
    })
  }

  carregarForm(){
    this.form = this.formService.getCadastro()
    this.form?.patchValue({
      nome: this.user.nome,
      nascimento: this.user.nascimento,
      cpf: this.user.cpf,
      telefone: this.user.telefone,
      email: this.user.email,
      senha: this.user.senha,
      genero: this.user.genero,
      cidade: this.user.cidade,
      estado: this.user.estado
    })
  }

  deslogar(){
    this.userService.logout()
    this.router.navigate(['login'])
  }

  atualizar(){
    const dadosAtualizados = {
      nome: this.form?.value.nome,
      nascimento: this.form?.value.nascimento,
      cpf: this.form?.value.cpf,
      telefone: this.form?.value.telefone,
      email: this.form?.value.email,
      senha: this.form?.value.senha,
      genero: this.form?.value.genero,
      cidade: this.form?.value.cidade,
      estado: this.form?.value.estado
    }

    this.cadastroService.editarUser(dadosAtualizados, this.token).subscribe({
      next: ()=>{
        alert("Os dados foram atualizados com sucesso");
        this.router.navigate(['main'])
      }
    })
  }
}
