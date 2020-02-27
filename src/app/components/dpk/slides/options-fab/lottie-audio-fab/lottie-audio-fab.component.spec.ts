import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LottieAudioFabComponent } from './lottie-audio-fab.component';

describe('LottieAudioFabComponent', () => {
    let component: LottieAudioFabComponent;
    let fixture: ComponentFixture<LottieAudioFabComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ LottieAudioFabComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LottieAudioFabComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
