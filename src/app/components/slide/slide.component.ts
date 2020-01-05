import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-slide',
    templateUrl: './slide.component.html',
    styleUrls: ['./slide.component.css']
})
export class SlideComponent implements OnInit {
    @Input()
    stanza: string[];
    @Input()
    definitions: string[];
    @Input()
    imageLocation: string;

    imageMaxHeight: number;

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
