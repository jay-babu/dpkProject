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
    onMouseMove() {
        clearTimeout(this.timer);
        this.toggleButton = true;
        setTimeout(() => this.toggleButton = false, 1300);
    }

    constructor() {
    }

    ngOnInit(): void {
        this.toggleButton = false;
    }

}
