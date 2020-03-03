import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DpkEditComponent } from './dpk-edit.component';

describe('DpkEditComponent', () => {
    let component: DpkEditComponent;
    let fixture: ComponentFixture<DpkEditComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ DpkEditComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(DpkEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
