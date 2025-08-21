import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorPassageiroComponent } from './selector-passageiro.component';

describe('SelectorPassageiroComponent', () => {
  let component: SelectorPassageiroComponent;
  let fixture: ComponentFixture<SelectorPassageiroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectorPassageiroComponent]
    });
    fixture = TestBed.createComponent(SelectorPassageiroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
