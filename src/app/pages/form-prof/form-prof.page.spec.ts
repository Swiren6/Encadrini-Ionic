import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormProfPage } from './form-prof.page';

describe('FormProfPage', () => {
  let component: FormProfPage;
  let fixture: ComponentFixture<FormProfPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormProfPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
