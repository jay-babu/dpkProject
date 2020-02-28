import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Slider } from '../../../../interfaces/slider';
import { SliderService } from './slider.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: [ './slider.component.scss' ]
})
export class SliderComponent implements OnInit, OnDestroy {
    dpkFolder: Observable<Map<string, Slider[]>>;

    dpk: Map<string, Slider[]>;

    constructor(private sliderService: SliderService) {
    }

    ngOnInit(): void {
        this.dpkFolder = this.sliderService.dpkFolder$.pipe(take(1));
        this.dpkFolder.subscribe(dpkFolderItems => this.dpk = dpkFolderItems);
    }

    ngOnDestroy(): void {
    }
}
