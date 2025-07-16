import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionEventosComponent } from './edicion-eventos.component';

describe('EdicionEventosComponent', () => {
  let component: EdicionEventosComponent;
  let fixture: ComponentFixture<EdicionEventosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EdicionEventosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EdicionEventosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
