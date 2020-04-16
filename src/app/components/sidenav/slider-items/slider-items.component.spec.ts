import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SliderItemsComponent } from './slider-items.component'

describe('SliderItemsComponent', () => {
    let component: SliderItemsComponent
    let fixture: ComponentFixture<SliderItemsComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SliderItemsComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SliderItemsComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
