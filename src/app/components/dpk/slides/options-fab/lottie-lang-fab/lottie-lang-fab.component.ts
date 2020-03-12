import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationDirection, AnimationItem } from 'lottie-web';
import { SlideService } from '../../../../../services/slide.service';

@Component({
    selector: 'app-lottie-lang-fab',
    templateUrl: './lottie-lang-fab.component.html',
    styleUrls: [ './lottie-lang-fab.component.css' ]
})
export class LottieLangFabComponent implements OnInit {
    options: AnimationOptions = {
        path: './assets/globe.json',
        autoplay: false,
        loop: false,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid meet',
            viewBoxSize: '-25 0 100 100',
        },
    };

    direction: AnimationDirection = -1;

    animation: AnimationItem;

    constructor(private slideService: SlideService) {
    }

    ngOnInit(): void {
    }

    animationCreated(animationItem: AnimationItem) {
        this.animation = animationItem;
    }

    get swapPossible() {
        return this.slideService.swapLanguagePossible;
    }

    toggle() {
        if (this.direction === 1) this.direction = -1;
        else this.direction = 1;
        this.animation.setDirection(this.direction);
        this.animation.play();

        this.slideService.swapLanguages();
    }
}
