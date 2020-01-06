import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Bhajan } from '../../interface/bhajan';

@Component({
    selector: 'app-slides',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.css']
})
export class SlidesComponent {
    bhajan: Bhajan = {
        lyrics: [['First', 'Second', 'Third'], ['Fourth', 'Fifth', 'Sixth']],
        definitions: [['First', 'Second', 'Third'], ['Fourth', 'Fifth', 'Sixth']],
        imagePaths: ['../assets/Sacha Sadhu Re - Akshar Patel.jpg', '../assets/Sacha Sadhu Re - Akshar Patel.jpg']
    };

    constructor(private router: Router, private activateRoute: ActivatedRoute) {
        // this.activateRoute.params.subscribe(params => {
        // console.log(params);
    }
}
