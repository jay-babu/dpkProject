import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfSlideComponent } from './pdf-slide.component';

describe('PdfSlideComponent', () => {
  let component: PdfSlideComponent;
  let fixture: ComponentFixture<PdfSlideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PdfSlideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
