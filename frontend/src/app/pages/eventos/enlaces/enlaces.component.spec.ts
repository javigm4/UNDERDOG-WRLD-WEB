import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnlacesComponent } from './enlaces.component';

describe('EnlacesComponent', () => {
  let component: EnlacesComponent;
  let fixture: ComponentFixture<EnlacesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnlacesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnlacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
