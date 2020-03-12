import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderItemTutComponent } from './slider-item-tut.component';

describe('SliderItemTutComponent', () => {
    let component: SliderItemTutComponent;
    let fixture: ComponentFixture<SliderItemTutComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SliderItemTutComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderItemTutComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
