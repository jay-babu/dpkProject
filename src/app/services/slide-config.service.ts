import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideConfigI } from '../interfaces/slide-config-i';

@Injectable({
    providedIn: 'root'
})
export class SlideConfigService {
    private _slideConfig: BehaviorSubject<any>;
    slideConfig$: Observable<any>;

    constructor() {
        this._slideConfig = new BehaviorSubject<any>({
            bgColor: '#141414',
            fontStyle: 'Avenir',
            definitionShown: true,
        });
        this.slideConfig$ = this._slideConfig.asObservable();
    }

    updateSlideConfig(slideConfigForm: SlideConfigI) {
        this._slideConfig.next(slideConfigForm);
    }
}
