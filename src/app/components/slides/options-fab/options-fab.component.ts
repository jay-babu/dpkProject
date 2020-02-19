import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SlideService } from '../../../services/slide.service';
import { OptionsComponent } from '../options/options.component';

@Component({
    selector: 'app-options-fab',
    templateUrl: './options-fab.component.html',
    styleUrls: ['./options-fab.component.css']
})
export class OptionsFabComponent implements OnInit {
    toggleButton: boolean;
    timer: number;

    prevLocation: string[];

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

    constructor(public dialog: MatDialog, private slideService: SlideService) {
    }

    ngOnInit(): void {
        this.toggleButton = false;
        this.slideService.prevLocation$.subscribe(prevLocation => this.prevLocation = prevLocation);
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
