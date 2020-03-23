import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideConfigI } from '../interfaces/slide-config-i';
import { DpkParseService } from '../components/dpk/slides/dpk-parse.service';
import { Bhajan, FirebaseBhajan } from '../interfaces/bhajan';
import { DriveAPIService } from './drive-api.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, take } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SlideService {

    constructor(private dpkParseService: DpkParseService,
                private driveAPIService: DriveAPIService,
                private router: Router,
                private activatedRoute: ActivatedRoute,) {
        this.bhajan = { altStanza: [], audioTimings: [], definitions: [], stanzaVisible: [] };

        this._path = new BehaviorSubject<string[]>([ 'test', 'test' ]);
        this.path$ = this._path.asObservable();

        this._bhajan = new BehaviorSubject<Bhajan>(this.bhajan);
        this.bhajan$ = this._bhajan.asObservable();

        this._slideConfig = new BehaviorSubject<any>({
            fontStyle: 'Avenir',
            definitionShown: true,
        });
        this.slideConfig$ = this._slideConfig.asObservable();

        this.router.events.pipe(
            filter(event => event instanceof NavigationEnd),
            map(() => this.activatedRoute),
            map(route => {
                while (route.firstChild) {
                    route = route.firstChild;
                }
                return route;
            }),
            map(route => route.snapshot)
        ).subscribe(activeRouter => {
            const params = activeRouter.params;
            if (params.dpk && params.name) {
                this.updatePath(params.dpk, params.name);
            }
        });
    }

    get swapLanguagePossible() {
        return this.bhajan.altStanza.length > 1;
    }

    private _slideConfig: BehaviorSubject<any>;
    slideConfig$: Observable<any>;

    dpk: string;
    name: string;
    private _path: BehaviorSubject<string[]>;
    path$: Observable<string[]>;

    private readonly bhajan: Bhajan;

    private _bhajan: BehaviorSubject<Bhajan>;
    bhajan$: Observable<Bhajan>;

    private static audioToDriveLink(audioLink: string) {
        if (audioLink) {
            const audioURL = `https://www.googleapis.com/drive/v3/files`;
            const id = new URL(audioLink).searchParams.get('id');
            const url = new URL(`${ audioURL }/${ id }`);
            url.searchParams.set('key', environment.firebaseConfig.apiKey);
            url.searchParams.set('alt', 'media');
            return url;
        } else return null;
    }

    private updatePath(dpk: string, name: string) {
        if (dpk !== this.dpk || name !== this.name) {
            this.dpk = dpk;
            this.name = name;
            this._path.next([ dpk, name ]);
            this.requestSlideData(this._path.value);
        }
    }

    private updateBhajan(bhajan: Bhajan) {
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
        firebaseBhajan.pipe(take(1)).subscribe(bhajan => {
            this.bhajan.stanzaVisible = this.dpkParseService.parseSlideText(bhajan.lyrics);
            this.bhajan.definitions = this.dpkParseService.parseSlideText(bhajan.definitions);
            this.bhajan.altStanza = this.dpkParseService.parseSlideText(bhajan.gujarati || []);
            this.bhajan.audioTimings = bhajan.audioTimings;
            this.bhajan.audioLink = SlideService.audioToDriveLink(bhajan.audioLink);
            this.updateBhajan(this.bhajan);
        });
    }

    updateSlideConfig(slideConfigForm: SlideConfigI) {
        this._slideConfig.next(slideConfigForm);
    }

    edgeCheck(slideIndex: number, stanzaLength: number): number {
        if (slideIndex < 0) {
            slideIndex = 0;
        }
        if (slideIndex > stanzaLength - 1) {
            slideIndex = stanzaLength - 1;
        }
        return slideIndex;
    }

    swapLanguages() {
        if (this.swapLanguagePossible) {
            [ this.bhajan.altStanza, this.bhajan.stanzaVisible ] = [ this.bhajan.stanzaVisible, this.bhajan.altStanza ];
            this.updateBhajan(this.bhajan);
        }
    }
}
