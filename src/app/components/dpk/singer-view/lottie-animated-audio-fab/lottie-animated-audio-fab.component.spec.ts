import { async, ComponentFixture, TestBed } from '@angular/core/testing'

import { LottieAnimatedAudioFabComponent } from './lottie-animated-audio-fab.component'

describe('LottieAnimatedAudioFabComponent', () => {
    let component: LottieAnimatedAudioFabComponent
    let fixture: ComponentFixture<LottieAnimatedAudioFabComponent>

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LottieAnimatedAudioFabComponent],
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LottieAnimatedAudioFabComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
