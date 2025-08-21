import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatChipSelectionChange } from '@angular/material/chips';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from 'src/app/shared/modal/modal.component';

@Injectable({
  providedIn: 'root'
})
export class FormBuscaService {

  formBusca: FormGroup;

  constructor(private dialog: MatDialog) {
    this.formBusca = new FormGroup({
      somenteIda: new FormControl(false),
      origem: new FormControl(null),
      destino: new FormControl(null),
      tipo: new FormControl('Econômica'),
      adulto: new FormControl(1),
      crianca: new FormControl(0),
      baby: new FormControl(0)
    })
  }


    getDescricaoPassageiros(): string {
      let description = ''

      const adultos = this.formBusca.get('adulto')?.value;
      if(adultos && adultos > 0){
        description += `${adultos} adulto${adultos > 1 ? 's' : ''}`
      }

      const children = this.formBusca.get('crianca')?.value;
      if(children && children > 0){
        description += `${description ? ', ' : ''}${children} criança${children > 1 ? 's' : ''}`
      }

      const babies = this.formBusca.get('baby')?.value;
      if(babies && babies > 0){
        description += `${description ? ', ' : ''}${babies} bebé${babies > 1 ? 's' : ''}`
      }

      return description
    }

    obterControle(nome:string): FormControl {
    const control = this.formBusca.get(nome);
    if (!control) {
      throw new Error(`FormControl com nome "${nome}" não existe.`);
    }
    return control as FormControl;
  }

  alterarTipo(event: MatChipSelectionChange, type: string){
    if(event.selected){
      this.formBusca.patchValue({
        tipo: type,
      })

      console.log("Tipo de passagem alterado para ", this.formBusca.get('tipo')?.value);

    }
  }

  trocarOrigemDestino(){
    const origin = this.formBusca.get('origem')?.value;
    const destination = this.formBusca.get('destino')?.value;

    this.formBusca.patchValue({origem: destination, destino: origin})
  }

  openDialog() {
    this.dialog.open(ModalComponent, {
      width: '50%'
    })
  }
}
