import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { SingerViewComponent } from './singer-view.component'

describe('SingerViewComponent', () => {
    let component: SingerViewComponent
    let fixture: ComponentFixture<SingerViewComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SingerViewComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(SingerViewComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
