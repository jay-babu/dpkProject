import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { SlideConfigI } from '../interfaces/slide-config-i';
import { ActivatedRoute, NavigationEnd, Router, UrlSegment } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { DpkParseService } from '../components/dpk/slides/dpk-parse.service';
import { Bhajan, FirebaseBhajan } from '../interfaces/bhajan';
import { DriveImageList } from '../interfaces/drive';
import { DriveAPIService } from './drive-api.service';

@Injectable({
    providedIn: 'root'
})
export class SlideService {
    private _slideConfig: BehaviorSubject<any>;
    slideConfig$: Observable<any>;

    private _prevLocation: BehaviorSubject<string[]>;
    prevLocation$: Observable<string[]>;

    dpkDriveFolder: Set<string>;
    firebaseBhajan$: Observable<FirebaseBhajan>;
    bhajan: Bhajan;

    constructor(private activatedRoute: ActivatedRoute,
                private router: Router,
                private dpkParseService: DpkParseService,
                private driveAPIService: DriveAPIService,) {
        this.bhajan = {driveBhajanImages$: undefined, audioTimings: [], definitions: [], imagePaths: [], images: [], stanza: []};
        this.dpkDriveFolder = new Set<string>().add('Dhun').add('Prathana').add('Kirtan');

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
        ).subscribe(activeRouter => activeRouter.subscribe(urlSegments => this.requestSlideData(urlSegments)));

        this._slideConfig = new BehaviorSubject<any>({
            fontStyle: 'Avenir',
            definitionShown: true,
            playback: false,
        });
        this.slideConfig$ = this._slideConfig.asObservable();

        this._prevLocation = new BehaviorSubject<string[]>([ '/dpk', 'slides' ]);
        this.prevLocation$ = this._prevLocation.asObservable();
    }

    private requestSlideData(urlSegments: UrlSegment[]) {
        if (this.dpkDriveFolder.has(urlSegments[0].path)) {
            this.firebaseBhajan$ = this.dpkParseService.getDPK(urlSegments[0].path, urlSegments[1].path);
            this.organizeSlideData(this.firebaseBhajan$);
        }
    }

    private organizeSlideData(firebaseBhajan: Observable<FirebaseBhajan>) {
        firebaseBhajan.subscribe(bhajan => {
            const imagesURL = new URL(bhajan.imagesURL).pathname.split('/')[3];
            this.bhajan.driveBhajanImages$ = this.driveAPIService.getListOfFiles(`'${imagesURL}' in parents`);
            this.bhajan.stanza = this.dpkParseService.parseSlideText(bhajan.lyrics);
            this.bhajan.definitions = this.dpkParseService.parseSlideText(bhajan.definitions);
            this.bhajan.audioTimings = bhajan.audioTimings;
            this.bhajanImages(this.bhajan.driveBhajanImages$);
        });
    }

    private bhajanImages(driveBhajanImages$: Observable<DriveImageList>) {
        if (this.bhajan.images.length < this.bhajan.stanza.length) {
            driveBhajanImages$.subscribe(driveFiles => {
                for (const item of driveFiles.files) {
                    const mimeType = item.mimeType.split('/')[0];
                    if (mimeType === 'audio') {
                        this.bhajan.bhajanSource = this.driveAPIService.exportImageDriveURL(item.id);
                    } else if (mimeType === 'image') {
                        this.bhajan.imagePaths.push(this.driveAPIService.exportImageDriveURL(item.id));
                    }
                }
                this.imageDownload(this.bhajan.imagePaths);
            });
        }
    }

    imageDownload(files: URL[]) {
        this.bhajan.images = [];
        for (const [ index, driveFile ] of files.entries()) {
            this.bhajan.images[index] = this.driveAPIService.preloadImage(driveFile);
        }
    }

    updateSlideConfig(slideConfigForm: SlideConfigI) {
        this._slideConfig.next(slideConfigForm);
    }

    updatePrevLocation(routerLink: string[]) {
        this._prevLocation.next(routerLink);
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
