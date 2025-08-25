import { UnidadeFederativa } from 'src/app/core/types/type';
import { UnidadeFederativaService } from '../../core/services/unidade-federativa.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-dropdown-uf',
  templateUrl: './dropdown-uf.component.html',
  styleUrls: ['./dropdown-uf.component.scss']
})
export class DropdownUfComponent implements OnInit {

  @Input() label: string = ''
  @Input() iconePrefix: string = ''
  @Input() control!: FormControl;

  ufList: UnidadeFederativa[] = [];
  options: string[] = []
  filteredOptions: Observable<string[]> = new Observable();

  constructor(private ufService :UnidadeFederativaService){}

  ngOnInit(): void {
     this.ufService.listar().subscribe(
      (response) => {
        this.ufList = response;

        this.ufList.map(estado => {
          this.options.push(estado.nome);
        })
      }
     );

     this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
