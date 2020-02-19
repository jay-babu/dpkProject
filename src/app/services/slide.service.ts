import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideConfigI } from '../interfaces/slide-config-i';

@Injectable({
    providedIn: 'root'
})
export class SlideService {
    private _slideConfig: BehaviorSubject<any>;
    slideConfig$: Observable<any>;

    private _prevLocation: BehaviorSubject<string[]>;
    prevLocation$: Observable<string[]>;

    constructor() {
        this._slideConfig = new BehaviorSubject<any>({
            bgColor: '#141414',
            fontStyle: 'Avenir',
            definitionShown: true,
        });
        this.slideConfig$ = this._slideConfig.asObservable();

        this._prevLocation = new BehaviorSubject<string[]>(['/dpk', 'slides']);
        this.prevLocation$ = this._prevLocation.asObservable();
    }

    updateSlideConfig(slideConfigForm: SlideConfigI) {
        this._slideConfig.next(slideConfigForm);
    }

    updatePrevLocation(routerLink: string[]) {
        this._prevLocation.next(routerLink);
    }

    edgeCheck(slideIndex, stanzaLength): number {
        if (slideIndex < 0) {
            slideIndex = 0;
        }
        if (slideIndex > stanzaLength - 1) {
            slideIndex = stanzaLength - 1;
        }
        return slideIndex;
    }
}
