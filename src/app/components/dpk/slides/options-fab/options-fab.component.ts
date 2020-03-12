import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-options-fab',
    templateUrl: './options-fab.component.html',
    styleUrls: [ './options-fab.component.css' ]
})
export class OptionsFabComponent implements OnInit {
    toggleButton: boolean;
    timer: any;

    @HostListener('document:mousemove', [ '$event' ])
    onMouseMove() {
        this.toggleButton = true;
        this.timeClear();
        this.timer = setTimeout(() => this.toggleButton = false, 1300);
    }

    constructor() {
    }

    ngOnInit(): void {
        this.toggleButton = false;
    }

    timeClear() {
        clearTimeout(this.timer);
    }
}
