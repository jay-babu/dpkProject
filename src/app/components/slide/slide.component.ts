import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { fadeAnimation } from '../../animations/fade.animation';
import { Bhajan } from '../../interfaces/bhajan';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css'],
    animations: [fadeAnimation]
})
export class SlideComponent implements OnInit {
    @Input()
    bhajan: Bhajan;

    stanza: string[][];
    definitions: string[][];
    imageLocation: string[];

    slideIndex: number;
    imageMaxHeight: number;
    hidden = true;

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
        this.stanza = this.bhajan.lyrics;
        this.definitions = this.bhajan.definitions;
        this.imageLocation = this.bhajan.imagePaths;
        this.imageMaxHeightDecrement();

        this.edgeCheck();
        this.hidden = false;
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

    edgeCheck(): number {
        if (this.slideIndex < 0) {
            this.slideIndex = 0;
            this.router.navigate(['/dpk', this.slideIndex]).then(_ => _, err => console.log(err));
        }
        if (this.slideIndex > this.stanza.length - 1) {
            this.slideIndex = this.stanza.length - 1;
            this.router.navigate(['/dpk', this.slideIndex]).then(_ => _, err => console.log(err));
        }
        this.imageMaxHeightDecrement();
        return this.slideIndex;
    }

    async upOrDown(bool: boolean) {
        this.hidden = true;
        await new Promise(done => setTimeout(() => done(), 500));
        if (bool) {
            ++this.slideIndex;
        } else {
            --this.slideIndex;
        }
        this.hidden = false;
        this.router.navigate(['/dpk', this.slideIndex]).then(_ => _, err => console.log(err));
    }

    @HostListener('window:keyup', ['$event'])
    async slideMovement(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && this.slideIndex < this.stanza.length - 1) {
            this.upOrDown(true);
        } else if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            this.upOrDown(false);
        }
    }
}
