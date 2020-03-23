import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YoutubeBlurComponent } from './youtube-blur.component';

describe('YoutubeBlurComponent', () => {
    let component: YoutubeBlurComponent;
    let fixture: ComponentFixture<YoutubeBlurComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ YoutubeBlurComponent ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(YoutubeBlurComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
