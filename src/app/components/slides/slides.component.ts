import { Component, HostListener, OnInit } from '@angular/core';
import { Bhajan } from '../../interface/bhajan';

@Component({
    selector: 'app-slides',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {
    slideIndex = 0;
    bhajan: Bhajan;

    constructor() {
    }

    ngOnInit() {
        this.bhajan = {
            lyrics: [['First', 'Second', 'Third'], ['Fourth', 'Fifth', 'Sixth']],
            definitions: [['First', 'Second', 'Third'], ['Fourth', 'Fifth', 'Sixth']],
            imagePaths: ['../assets/Sacha Sadhu Re - Akshar Patel.jpg', '../assets/Sacha Sadhu Re - Akshar Patel.jpg']
        };
    }

    @HostListener('window:keyup', ['$event'])
    slideMovement(event: KeyboardEvent) {
        if (event.key === 'ArrowRight' && this.slideIndex < this.bhajan.lyrics.length - 1) {
            ++this.slideIndex;
        }
        if (event.key === 'ArrowLeft' && this.slideIndex > 0) {
            --this.slideIndex;
        }
    }

}
