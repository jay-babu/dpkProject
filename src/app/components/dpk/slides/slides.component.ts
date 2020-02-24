import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseBhajan } from '../../../interfaces/bhajan';
import { DpkParseService } from './dpk-parse.service';

@Component({
    selector: 'app-slides',
    templateUrl: './slides.component.html',
    styleUrls: ['./slides.component.css']
})
export class SlidesComponent implements OnInit {
    firebaseBhajan$: Observable<FirebaseBhajan>;

    slideName: string;
    slideDPK: string;

    constructor(private activeRouter: ActivatedRoute, private dpkParseService: DpkParseService) {
        this.activeRouter.params.subscribe(params => {
            this.slideName = (params.name === undefined) ? '' : params.name;
            this.slideDPK = params.dpk;
        });
    }

    ngOnInit(): void {
        this.firebaseBhajan$ = this.dpkParseService.getDPK(this.slideDPK, this.slideName);
    }
}
