import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CadastroService } from 'src/app/core/services/cadastro.service';
import { FormularioService } from 'src/app/core/services/formulario.service';
import { Cadastro } from 'src/app/core/types/type';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent {

  constructor(
    private formService: FormularioService,
    private cadastroService: CadastroService,
    private router: Router
  ){}

  cadastrar(){
    const formCadastro = this.formService.getCadastro();
    if(formCadastro?.valid){
      const novoCadastro = formCadastro.getRawValue() as Cadastro;
      this.cadastroService.cadastrar(novoCadastro).subscribe({
        next: (res) => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log("Erro ao tentar executar a requisição", err);
        }
      })
    }

  }
}
