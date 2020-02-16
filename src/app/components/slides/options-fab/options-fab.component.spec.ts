import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionsFabComponent } from './options-fab.component';

describe('OptionsComponent', () => {
  let component: OptionsFabComponent;
  let fixture: ComponentFixture<OptionsFabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionsFabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
