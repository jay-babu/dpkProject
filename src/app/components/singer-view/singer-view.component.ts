import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DpkParseService } from '../slides/dpk-parse.service';
import { Observable } from 'rxjs';
import { FirebaseBhajan } from '../../interfaces/bhajan';
import { AudioControlService } from '../audio-component/audio-control.service';

@Component({
    selector: 'app-singer-view',
    templateUrl: './singer-view.component.html',
    styleUrls: [ './singer-view.component.css' ]
})
export class SingerViewComponent implements OnInit {
    firebaseBhajan$: Observable<FirebaseBhajan>;
    bhajan: string[][];
    definitions: string[][];

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private slidesService: DpkParseService,
                private audioControlService: AudioControlService) {
    }

    listTimes = [ 31, 83, 153, 217, 286, 351 ];

    ngOnInit(): void {
        let slideName;
        let slideDPK;
        this.activeRouter.params.subscribe(params => {
            slideName = (params.name === undefined) ? '' : params.name;
            slideDPK = params.dpk;
        });

        this.firebaseBhajan$ = this.slidesService.getDPK(slideDPK, slideName);

        this.firebaseBhajan$.subscribe(bhajan => {
            this.bhajan = this.slidesService.parseSlideText(bhajan.lyrics);
        });
    }

    seekPosition(time: number) {
        this.audioControlService.seekTime(time);
    }
}
