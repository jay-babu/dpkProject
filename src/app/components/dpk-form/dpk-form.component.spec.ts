import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpkFormComponent } from './dpk-form.component';

describe('DpkFormComponent', () => {
  let component: DpkFormComponent;
  let fixture: ComponentFixture<DpkFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DpkFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DpkFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
