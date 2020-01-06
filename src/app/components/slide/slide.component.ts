import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css'],
    animations: [
        // the fade-in/fade-out animation.
        trigger('simpleFadeAnimation', [

            // the "in" style determines the "resting" state of the element when it is visible.
            state('in', style({opacity: 1})),

            transition(
                ':enter',
                [
                    style({transform: 'translateX(100vw)'}),
                    animate('1s ease-in',
                        style({transform: 'translateX(0vw)'}))
                ]
            ),
            transition(
                ':leave',
                [
                    style({transform: 'translateX(0vw)'}),
                    animate('1s ease-out',
                        style({transform: 'translateX(-100vw)'}))
                ]
            )
        ])
    ]
})
export class SlideComponent implements OnInit {
    @Input()
    stanza: string[];
    @Input()
    definitions: string[];
    @Input()
    imageLocation: string;

    imageMaxHeight: number;
    @Input()
    slideIndex: number;
    @Input()
    i: number;

    constructor() {
    }

    ngOnInit() {
        this.imageMaxHeight = 100;
        this.imageMaxHeightDecrement();
    }

    imageMaxHeightDecrement() {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        for (const index of this.stanza) {
            this.imageMaxHeight -= 6;
        }
        for (const index of this.definitions) {
            this.imageMaxHeight -= 6;
        }
    }
}
