import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { SlideConfigI } from '../interfaces/slide-config-i';
import { DpkParseService } from '../components/dpk/slides/dpk-parse.service';
import { Bhajan, FirebaseBhajan } from '../interfaces/bhajan';
import { DriveAPIService } from './drive-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SlideService {
    private _slideConfig: BehaviorSubject<any>;
    slideConfig$: Observable<any>;

    private _prevLocation: BehaviorSubject<string[]>;
    prevLocation$: Observable<string[]>;

    dpk: string;
    name: string;
    private _path: BehaviorSubject<string[]>;
    path$: Observable<string[]>;

    dpkDriveFolder: Set<string>;
    private readonly bhajan: Bhajan;

    private _bhajan: Subject<Bhajan>;
    bhajan$: Observable<Bhajan>;

    constructor(private dpkParseService: DpkParseService,
                private driveAPIService: DriveAPIService,
                private router: Router,
                private activatedRoute: ActivatedRoute,) {
        this.bhajan = {audioTimings: [], definitions: [], stanza: []};
        this.dpkDriveFolder = new Set<string>().add('Dhun').add('Prathana').add('Kirtan');

        this._path = new BehaviorSubject<string[]>([ 'test', 'test' ]);
        this.path$ = this._path.asObservable();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            map(route => route.url)
        ).subscribe(activeRouter => activeRouter.subscribe(urlSegments => {
            if (urlSegments.length === 2) this.updatePath(urlSegments[0].path, urlSegments[1].path)
        }));

        this._slideConfig = new BehaviorSubject<any>({
            fontStyle: 'Avenir',
            definitionShown: true,
            playback: false,
        });
        this.slideConfig$ = this._slideConfig.asObservable();

        this._prevLocation = new BehaviorSubject<string[]>([ '/dpk', 'slides' ]);
        this.prevLocation$ = this._prevLocation.asObservable();

        this._bhajan = new Subject<Bhajan>();
        this.bhajan$ = this._bhajan.asObservable();
    }

    updatePath(dpk: string, name: string) {
        if (dpk !== this.dpk || name !== this.name) {
            this.dpk = dpk;
            this.name = name;
            this._path.next([ dpk, name ]);
            this.requestSlideData(this._path.value);
        }
    }

    updateBhajan(bhajan: Bhajan) {
        this._bhajan.next(bhajan);
    }

    private requestSlideData(path: string[]) {
        let dpk: string;
        let name: string;
        [ dpk, name ] = path;
        const firebaseBhajan$ = this.dpkParseService.getDPK(dpk, name);
        this.organizeSlideData(firebaseBhajan$);
    }

    private organizeSlideData(firebaseBhajan: Observable<FirebaseBhajan>) {
        firebaseBhajan.subscribe(bhajan => {
            this.driveAPIService.bhajanID = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.bhajan.stanza = this.dpkParseService.parseSlideText(bhajan.lyrics);
            this.bhajan.definitions = this.dpkParseService.parseSlideText(bhajan.definitions);
            this.bhajan.audioTimings = bhajan.audioTimings;
            this.updateBhajan(this.bhajan);
        });
    }

    updateSlideConfig(slideConfigForm: SlideConfigI) {
        this._slideConfig.next(slideConfigForm);
    }

    edgeCheck(slideIndex, stanzaLength): number {
        if (slideIndex < 0) {
            slideIndex = 0;
        }
        if (slideIndex > stanzaLength - 1) {
            slideIndex = stanzaLength - 1;
        }
        return slideIndex;
    }
}
