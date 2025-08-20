import { Component, OnInit } from '@angular/core';
import { DepoimentoService } from 'src/app/core/services/depoimento.service';
import { PromocaoService } from 'src/app/core/services/promocao.service';
import { Depoimento, Promocao } from 'src/app/core/types/type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  listaPromocoes: Promocao[] = [];
  listaDepoimentos: Depoimento[] = [];

  constructor(private promocaoService: PromocaoService, private depoimentoService: DepoimentoService){}

  ngOnInit(): void {
      this.promocaoService.listar().subscribe({
        next: resposta => {
          this.listaPromocoes = resposta;
        }
      });

      this.depoimentoService.listarDepoimentos().subscribe({
        next: resposta => {
          this.listaDepoimentos = resposta;
        }
      })
  }
}
