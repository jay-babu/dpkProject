import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsComponent } from '../options/options.component';
import { AnimationOptions } from 'ngx-lottie';
import { AnimationDirection, AnimationItem } from 'lottie-web';

@Component({
    selector: 'app-options-fab',
    templateUrl: './options-fab.component.html',
    styleUrls: [ './options-fab.component.css' ]
})
export class OptionsFabComponent implements OnInit {
    toggleButton: boolean;
    timer: any;

    options: AnimationOptions = {
        path: './assets/animation.json',
        autoplay: false,
        loop: false,
    };

    direction: AnimationDirection = -1;

    animation: AnimationItem;

    @HostListener('document:mousemove', [ '$event' ])
    onMouseMove() {
        this.toggleButton = true;
        this.timeClear();
        this.timer = setTimeout(() => this.toggleButton = false, 1300);
    }

    constructor(public dialog: MatDialog,) {
    }

    ngOnInit(): void {
        this.toggleButton = false;
    }

    timeClear() {
        clearTimeout(this.timer);
    }

    openDialog(): void {
        this.dialog.open(OptionsComponent, {
            width: '250px',
            position: { right: '1%' },
        });
    }

    animationCreated(animationItem: AnimationItem) {
        this.animation = animationItem;
    }

    play() {
        if (this.direction === 1) {
            this.direction = -1;
        } else {
            this.direction = 1;
        }
        this.animation.setDirection(this.direction);
        this.animation.play();
    }
}
