import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SliderService } from './slider.service';

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    styleUrls: [ './slider.component.scss' ]
})
export class SliderComponent implements OnInit, OnDestroy {
    dpkFolder: Observable<Map<string, string[]>>;

    dpk: Map<string, string[]>;

    gitHubFiles: Set<string>;

    constructor(private sliderService: SliderService) {
    }

    ngOnInit(): void {
        this.dpkFolder = this.sliderService.dpkFolder$;
        this.dpkFolder.subscribe(dpkFolderItems => this.dpk = dpkFolderItems);

        this.gitHubFiles = this.sliderService.gitHubImages;
    }

    ngOnDestroy(): void {
    }

    getGitHubURL(category: string, title: string) {
        if (this.gitHubFiles.has(`${ title }.webp`)) {
            return this.sliderService.getGitHubURL(category, title).href;
        }
        return '';
    }

    imageToURLL(url: string) {
        if (url) return `url(${ url })`;
        else return '';
    }
}
