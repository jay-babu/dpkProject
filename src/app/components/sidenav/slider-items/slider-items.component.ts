import { Component, OnInit } from '@angular/core';
import { SideNavToggleService } from '../../../services/side-nav-toggle.service';

@Component({
    selector: 'app-slider-items',
    templateUrl: './slider-items.component.html',
    styleUrls: [ './slider-items.component.css' ]
})
export class SliderItemsComponent implements OnInit {
    constructor(public sideNavToggleService: SideNavToggleService,) {
    }

    ngOnInit() {
    }
}
