import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DpkParseService } from '../slides/dpk-parse.service';
import { Observable } from 'rxjs';
import { FirebaseBhajan } from '../../interfaces/bhajan';

@Component({
    selector: 'app-singer-view',
    templateUrl: './singer-view.component.html',
    styleUrls: [ './singer-view.component.css' ]
})
export class SingerViewComponent implements OnInit {
    firebaseBhajan$: Observable<FirebaseBhajan>;
    stanza: string[][];
    definitions: string[][];

    constructor(private router: Router,
                private activeRouter: ActivatedRoute,
                private slidesService: DpkParseService,
                private dpkParseService: DpkParseService,) {
    }

    ngOnInit(): void {
        let slideName;
        let slideDPK;
        this.activeRouter.params.subscribe(params => {
            slideName = (params.name === undefined) ? '' : params.name;
            slideDPK = params.dpk;
        });

        this.firebaseBhajan$ = this.slidesService.getDPK(slideDPK, slideName);

        this.firebaseBhajan$.subscribe(bhajan => {
            this.stanza = this.dpkParseService.parseSlideText(bhajan.lyrics);
        });
    }

}
