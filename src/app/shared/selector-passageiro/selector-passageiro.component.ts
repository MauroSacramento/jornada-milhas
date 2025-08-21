import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-selector-passageiro',
  templateUrl: './selector-passageiro.component.html',
  styleUrls: ['./selector-passageiro.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(()=> SelectorPassageiroComponent),
      multi: true
    }
  ]
})
export class SelectorPassageiroComponent implements ControlValueAccessor {

  @Input() titulo: string = ''
  @Input() subtitulo: string = ''

  value: number = 0;
  onChange = (val: number) => {};
  onTouch = () => {}

  writeValue(obj: any): void {
    this.value = obj;
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  // setDisabledState?(isDisabled: boolean): void {
  //   throw new Error('Method not implemented.');
  // }

  incrementar(){
    this.value += 1;
    this.onChange(this.value);
    this.onTouch()
  }

  decrementar(){
    if(this.value > 0){
      this.value -= 1;
      this.onChange(this.value);
      this.onTouch()
    }
  }
}
