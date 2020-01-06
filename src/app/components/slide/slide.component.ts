import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bhajan } from '../../interface/bhajan';

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
    bhajan: Bhajan;

    stanza: string[][];
    definitions: string[][];
    imageLocation: string[];

    slideIndex: number;
    imageMaxHeight: number;

    constructor(private router: Router, private activeRouter: ActivatedRoute) {
    }

    ngOnInit() {
        this.activeRouter.params.subscribe(params => {
            if (params.id !== undefined) {
                this.slideIndex = params.id;
            } else {
                this.slideIndex = 0;
            }
        });
        // this.slideIndex = 0;
        this.stanza = this.bhajan.lyrics;
        this.definitions = this.bhajan.definitions;
        this.imageLocation = this.bhajan.imagePaths;
        this.imageMaxHeightDecrement();
    }

    imageMaxHeightDecrement() {
        /*
        Changes the Max Height of Img in CSS.
        4.5 was found to be a good number that worked for everything.
         */
        this.imageMaxHeight = 100;
        for (const index of this.stanza[this.slideIndex]) {
            this.imageMaxHeight -= 6;
        }
        for (const index of this.definitions[this.slideIndex]) {
            this.imageMaxHeight -= 6;
        }
    }

    @HostListener('window:keyup', ['$event'])
    slideMovement(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && this.slideIndex < this.stanza.length - 1) {
            ++this.slideIndex;
            this.imageMaxHeightDecrement();
            this.router.navigate(['/dpk', this.slideIndex]).then(_ => _, err => console.log(err));
        } else if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            --this.slideIndex;
            this.imageMaxHeightDecrement();
            this.router.navigate(['/dpk', this.slideIndex]).then(_ => _, err => console.log(err));
        }
    }
}
