import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceulComponent } from './acceul.component';

describe('AcceulComponent', () => {
  let component: AcceulComponent;
  let fixture: ComponentFixture<AcceulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AcceulComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AcceulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
