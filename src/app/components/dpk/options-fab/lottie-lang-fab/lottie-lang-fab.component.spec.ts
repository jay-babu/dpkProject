import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LottieLangFabComponent } from './lottie-lang-fab.component'

describe('LottieLangFabComponent', () => {
    let component: LottieLangFabComponent
    let fixture: ComponentFixture<LottieLangFabComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LottieLangFabComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LottieLangFabComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
