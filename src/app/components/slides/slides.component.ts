import { Component, Input, OnInit } from '@angular/core';
import { Bhajan } from '../../interface/bhajan';

@Component({
    selector: 'app-slides',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {
    @Input()
    bhajan: Bhajan;

    constructor() {
    }

    ngOnInit() {
    }

}
