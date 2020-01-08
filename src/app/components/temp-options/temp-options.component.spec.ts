import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempOptionsComponent } from './temp-options.component';

describe('TempOptionsComponent', () => {
  let component: TempOptionsComponent;
  let fixture: ComponentFixture<TempOptionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempOptionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
