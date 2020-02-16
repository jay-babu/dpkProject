import { Component, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'app-options-fab',
    templateUrl: './options.component.html',
    styleUrls: ['./options.component.css']
})
export class OptionsComponent implements OnInit {
    toggleButton: boolean;
    timer: number;

    @HostListener('document:mousemove', ['$event'])
    onMouseMove(e: MouseEvent) {
        if (window.innerHeight - e.clientY > 100 && window.innerWidth - e.clientX > 100) {
            this.timeClear();
            this.toggleButton = true;
            setTimeout(() => this.toggleButton = false, 1300);
        } else {
            this.timeClear();
            this.toggleButton = true;
        }
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
