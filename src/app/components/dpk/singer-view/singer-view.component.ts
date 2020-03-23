import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Bhajan } from '../../../interfaces/bhajan';
import { SlideService } from '../../../services/slide.service';

@Component({
    selector: 'app-singer-view',
    templateUrl: './singer-view.component.html',
    styleUrls: [ './singer-view.component.css' ]
})
export class SingerViewComponent implements OnInit, OnDestroy {
    firebaseBhajan$: Observable<Bhajan>;

    constructor(public slideService: SlideService,) {
    }

    ngOnInit(): void {
        this.firebaseBhajan$ = this.slideService.bhajan$;
    }

    ngOnDestroy(): void {
    }
}
