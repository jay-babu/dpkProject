import { Component, OnInit } from '@angular/core';
import { fadeAnimation } from './animations/fade.animation';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    animations: [fadeAnimation]
})
export class AppComponent implements OnInit {
    title = 'dpkProject';

    public getRouterOutletState(outlet) {
        return outlet.isActivated ? outlet.activatedRoute : '';
    }

    ngOnInit(): void {
    }
}
