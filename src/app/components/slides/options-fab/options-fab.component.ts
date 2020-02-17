import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OptionsComponent } from '../options/options.component';

@Component({
    selector: 'app-options-fab',
    templateUrl: './options-fab.component.html',
    styleUrls: ['./options-fab.component.css']
})
export class OptionsFabComponent implements OnInit {
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

    constructor(public dialog: MatDialog) {
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
}
